export async function GET(request: Request) {
  try {
    const res = await fetch("http://localhost:8080/api/v1/products");
    const data = await res.json();
    const message = data.message;
    return Response.json({ message });
  } catch {
    return Response.json("call api error");
  }
}
