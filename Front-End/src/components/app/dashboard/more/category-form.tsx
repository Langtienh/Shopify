"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAction from "@/hooks/useAction";
import { useAppSelector } from "@/redux/store";
import { createCategory, updateCategory } from "@/services/category";
import { message } from "antd";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function CategoryForm({
  category,
}: {
  category?: CategoryType;
}) {
  const [isShow, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [reponseCreate, creating, _createCategory] = useAction(createCategory);
  const [reponseUpdate, updating, _updateCategory] = useAction(updateCategory);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setLabel(category.label);
    }
  }, [category]);
  const isDemo = !!useAppSelector(
    (state) => state.userInfo.user
  )?.roles.includes("demo");
  const handleSubmit = async () => {
    try {
      if (isDemo) message.warning("Chỉ được phép xem");
      else if (name && label) {
        const data = { name, label };
        if (category) await _updateCategory(data, category.id);
        else await _createCategory(data);
      }
    } finally {
      setShow(false);
    }
  };
  return (
    <>
      <Dialog open={isShow} onOpenChange={setShow}>
        <DialogTrigger asChild>
          {category ? (
            <Button variant="ghost" size="icon">
              <CiEdit size={20} />
            </Button>
          ) : (
            <Button className="w-3/4 mx-auto" variant="outline">
              Add category
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {category ? "Edit category" : "Create category"}
            </DialogTitle>
            <DialogDescription>
              Cẩn thận khi thêm có thể làm xấu ui
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                defaultValue={category?.name}
                className="col-span-3"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Label
              </Label>
              <Input
                defaultValue={category?.label}
                className="col-span-3"
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={updating || creating || !(name && label)}
              onClick={handleSubmit}
            >
              {category ? "Update" : "Create category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
