import { getAllCommentsByProductId } from "@/services/comment";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Progress, Rate } from "antd";
import Image from "next/image";
import CommentModal from "./comment.modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PropsType = {
  productId: number;
  name: string;
  // comments: CommentType[];
};
export default async function Comments({
  productId,
  // comments,
  name,
}: PropsType) {
  const comments = await getAllCommentsByProductId(productId);
  const total =
    Math.floor(
      (comments.reduce((accumulator, item) => accumulator + item.rate, 0) *
        10) /
        comments.length
    ) / 10 || 0;
  const sum = comments.length;
  const counter: number[] = [];
  counter.push(comments.filter((item) => item.rate === 1).length);
  counter.push(comments.filter((item) => item.rate === 2).length);
  counter.push(comments.filter((item) => item.rate === 3).length);
  counter.push(comments.filter((item) => item.rate === 4).length);
  counter.push(comments.filter((item) => item.rate === 5).length);
  return (
    <div className="border shadow-lg rounded-lg p-[10px] mb-5 max-w-[800px]">
      <h2 className="text-lg font-bold">Đánh giá & nhận xét{" " + name}</h2>
      <div className="pb-5 mb-5 flex flex-col sm:flex-row gap-5 border-b">
        <div className="sm:w-2/5 sm:basis-2/5 flex flex-col items-center justify-center text-center pt-4">
          <span className="font-bold text-xl">{`${total}/5`}</span>
          <Rate disabled allowHalf defaultValue={4.5} />
          <span>{`${comments.length} đánh giá`}</span>
        </div>
        <ul className="sm:w-3/5 sm:basis-3/5 text-[12px]">
          {Array.from({ length: 5 }, (_, i) => (
            <li key={`start-${i}`} className="flex gap-1 items-center">
              <span>{i + 1}</span>
              <StarFilledIcon className="text-yellow-500" />
              <Progress
                percent={Math.floor((counter[i] * 100) / sum)}
                status="normal"
                strokeColor="#d70018"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5 mb-5 flex flex-col items-center justify-center text-center gap-4 border-b">
        <p>Bạn đánh giá sao về sản phẩm này?</p>
        <CommentModal title={name} productId={productId} />
      </div>
      <ul className="flex flex-col gap-2">
        {comments.map((item) => (
          <li key={item.id} className="flex flex-col pb-5 mb-5 border-b">
            <div className="flex gap-3 items-center">
              <Avatar className="mr-3 size-8">
                <AvatarImage
                  className="size-10"
                  alt={item.user.fullName}
                  src={item.user.avatar}
                />
                <AvatarFallback>
                  <Image
                    src="/images/default/avatar.jpg"
                    alt={`${item.user.fullName}'s profile picture`}
                    className="rounded-full"
                    width={24}
                    height={24}
                  />
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-bold">
                  {item.user.fullName}
                  <span className="text-gray-300 text-sm ps-2 font-medium">
                    <span>18/7/2024 20:35</span>
                  </span>
                </p>
                <div className="flex gap-2 text-green-600 text-sm">
                  <Image
                    width={16}
                    height={16}
                    src="/images/detail/check-sucsess.svg"
                    alt="checked-icon"
                  />
                  <span>Đã mua tại Shopify</span>
                </div>
              </div>
            </div>
            <div className="ms-10">
              <Rate allowHalf disabled defaultValue={item.rate} />
              <p>{item.content}</p>
            </div>
            <div className="flex gap-5">
              {item.images.map((image, index) => (
                <div key={`${image}${index}`} className="h-15 mt-3">
                  <Image
                    alt={`${image}${index}`}
                    width={60}
                    height={60}
                    src={image}
                    className="h-15 object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
