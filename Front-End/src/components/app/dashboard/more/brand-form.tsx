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
import { createBrand, updateBrand } from "@/services/brand";
import { message } from "antd";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function BrandForm({ brand }: { brand?: BrandType }) {
  const [isShow, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [reponseCreate, creating, _createBrand] = useAction(createBrand);
  const [reponseUpdate, updating, _updateBrand] = useAction(updateBrand);

  useEffect(() => {
    if (brand) {
      setName(brand.name);
    }
  }, [brand]);
  const isDemo = !!useAppSelector(
    (state) => state.userInfo.user
  )?.roles.includes("demo");
  const handleSubmit = async () => {
    try {
      if (isDemo) message.warning("Chỉ được phép xem");
      else if (name) {
        if (brand) await _updateBrand(name, brand.id);
        else await _createBrand(name);
      }
    } finally {
      setShow(false);
    }
  };
  return (
    <>
      <Dialog open={isShow} onOpenChange={setShow}>
        <DialogTrigger asChild>
          {brand ? (
            <Button variant="ghost" size="icon">
              <CiEdit size={20} />
            </Button>
          ) : (
            <Button className="w-3/4 mx-auto" variant="outline">
              Add brand
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{brand ? "Edit brand" : "Create brand"}</DialogTitle>
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
                onChange={(e) => setName(e.target.value)}
                defaultValue={brand?.name}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={updating || creating || !name}
              onClick={handleSubmit}
            >
              {brand ? "Update brand" : "Create brand"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
