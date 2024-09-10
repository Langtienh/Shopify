import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// hard coding
const loginPage = ["/login", "/register"];
const firstLoginPage = "/first-login";
const restorePasswordPage = ["/restore-password-method", "/restore-password"];

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
  // const newUrl = new URL(callbackUrl || "/", request.nextUrl.origin);

  const _user = request.cookies.get("USER")?.value;
  let user: User | undefined;
  if (_user) user = JSON.parse(_user);

  const isFirstLogin = request.cookies.has("isFirstLogin");
  const isUserPage = path.startsWith("/cart") || path.startsWith("/smember");
  const isAdminPage = path.startsWith("/dashboard");
  const isLoginPage = loginPage.includes(path);
  const isFirstLoginPage = path === firstLoginPage;
  const isRestorePasswordPage = restorePasswordPage.includes(path);

  // logic
  // Trang đăng nhập bằng provider lần đầu
  if (isFirstLoginPage) {
    // + chưa đăng nhập => đăng nhập
    //  đã đăng nhập, không phải đăng nhập lần đầu => không cho vào
    if (user) {
      const newUrl = new URL(`/smember`, request.nextUrl.origin);
      return Response.redirect(newUrl);
    } else if (!isFirstLogin) {
      let newUrl = "/login";
      if (callbackUrl) newUrl += `?callbackUrl=${callbackUrl}`;
      return Response.redirect(new URL(newUrl, request.nextUrl.origin));
    }
  }
  // Trang đăng nhập đăng kí
  else if (isLoginPage) {
    // + đã đăng nhập => đá về trang smember
    if (user)
      return Response.redirect(new URL(`/smember`, request.nextUrl.origin));
    if (isFirstLogin)
      return Response.redirect(new URL(`/first-login`, request.nextUrl.origin));
  }
  // Trang user, trang dashboard (cần đăng nhập)
  else if (isUserPage) {
    // + Đã đăng nhập bằng google, đăng nhập lần đầu => thêm số đt
    if (isFirstLogin) {
      const newUrl = new URL(
        `/first-login?callbackUrl=${path}`,
        request.nextUrl.origin
      );
      return Response.redirect(newUrl);
    }
    // + Chưa đăng nhập => bắt đăng nhập
    else if (!user) {
      let newUrl = "/login";
      if (callbackUrl) newUrl += `?callbackUrl=${callbackUrl}`;
      return Response.redirect(new URL(newUrl, request.nextUrl.origin));
    }
  } else if (isAdminPage) {
    if (!user) {
      const newUrl = new URL(
        `/login?callbackUrl=${path}`,
        request.nextUrl.origin
      );
      return Response.redirect(newUrl);
    }
    const isAdmin = user.roles.includes("admin");
    if (!isAdmin) return Response.redirect("/");
  } else if (isRestorePasswordPage) {
    if (user) {
      const newUrl = new URL(`/smember`, request.nextUrl.origin);
      if (user) return Response.redirect(newUrl);
    }
    const otpToken = cookies().get("otpToken")?.value;
    if (!otpToken && path === "/restore-password") {
      const newUrl = new URL(`/login`, request.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/smember/:path*",
    "/cart/:path*",
    "/login",
    "/register",
    "/first-login",
    "/restore-password",
    "/restore-password-method",
    // bảo vệ ảnh ??
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
