"use client";

import { useAuth } from "@/contexts/auth.context";
import useAction from "@/hooks/useAction";
import { deleteComment } from "@/services/comment";
import { Button, message } from "antd";
import { MdDelete } from "react-icons/md";

export const DeleteCommentButton = ({ commentId }: { commentId: number }) => {
  const [response, isPending, _deleteComment] = useAction(deleteComment);
  const auth = useAuth();
  const isDemo = !!auth.user?.roles.includes("demo");
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
