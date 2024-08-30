"use client";

import { deleteComment } from "@/services/comment";
import { Button, message } from "antd";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

export const DeleteCommentButton = ({ commentId }: { commentId: number }) => {
  const [isPending, setPending] = useState<boolean>(false);
  const handleDeleteComment = async () => {
    setPending(true);
    const res = await deleteComment(commentId);
    if (res.isError) message.error(res.message);
    else message.success(res.message);
    setPending(false);
  };
  return (
    <Button
      onClick={handleDeleteComment}
      loading={isPending}
      type="text"
      size="small"
      danger
      icon={<MdDelete size={18} />}
    />
  );
};
