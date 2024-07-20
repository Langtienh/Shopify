import { cookies } from "next/headers";

const getToken = () => {
  const token = cookies().get("TOKEN")?.value;
  const userId = cookies().get("USER_ID")?.value;
  const refreshToken = cookies().get("REFRESH_TOKEN")?.value;
  return { token, userId, refreshToken };
};
export default getToken;
