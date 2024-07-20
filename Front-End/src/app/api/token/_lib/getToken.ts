import { cookies } from "next/headers";

const getToken = () => {
  const token = cookies().get("TOKEN")?.value;
  const userId = cookies().get("USER_ID")?.value;
  return { token, userId };
};
export default getToken;
