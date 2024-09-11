import { PrefixUpload } from "@/constans/enum";
import {
  createComment,
  uploadAvatar,
  uploadProductImage,
} from "@/services/upload";

export async function POST(
  req: Request,
  { params }: { params: { prefix: PrefixUpload } }
) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const productId = searchParams.get("productId");
  const prefix = params.prefix;
  const formData = await req.formData();
  let res: any;
  if (prefix === "avatar") {
    res = await uploadAvatar(formData);
  }
  if (prefix === "product" && productId) {
    res = await uploadProductImage(formData, +productId);
  }
  if (prefix === "comment") {
    res = await createComment(formData);
  }
  return Response.json(res);
}
