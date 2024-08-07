import { auth } from "@/auth/auth";
import { cache } from "react";
const getAuthCache = cache(auth);
export default getAuthCache;
