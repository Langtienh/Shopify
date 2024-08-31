"use client";

import useAction from "@/hooks/useAction";
import { deleteComment } from "@/services/comment";
import { Button } from "antd";
import { MdDelete } from "react-icons/md";

export const DeleteCommentButton = ({ commentId }: { commentId: number }) => {
  const [response, isPending, _deleteComment] = useAction(deleteComment);
  const handleDeleteComment = async () => {
    await _deleteComment(commentId);
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
