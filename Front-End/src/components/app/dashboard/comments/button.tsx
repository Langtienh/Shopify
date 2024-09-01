"use client";

import useAction from "@/hooks/useAction";
import { useAppSelector } from "@/redux/store";
import { deleteComment } from "@/services/comment";
import { Button, message } from "antd";
import { MdDelete } from "react-icons/md";

export const DeleteCommentButton = ({ commentId }: { commentId: number }) => {
  const [response, isPending, _deleteComment] = useAction(deleteComment);
  const isDemo = !!useAppSelector(
    (state) => state.userInfo.user
  )?.roles.includes("demo");
  const handleDeleteComment = async () => {
    if (isDemo) message.warning("Chỉ được phép xem");
    else await _deleteComment(commentId);
  };
  return (
    <Button
      onClick={handleDeleteComment}
      loading={isPending}
      type="text"
      size="small"
      danger
      icon={<MdDelete size={20} />}
    />
  );
};
