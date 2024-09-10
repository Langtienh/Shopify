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
import { useAuth } from "@/contexts/auth.context";
import useAction from "@/hooks/useAction";
import {
  createPaymentMethod,
  updatePaymentMethod,
} from "@/services/payment-method";
import { message } from "antd";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function PaymentMethodForm({
  paymentMethod,
}: {
  paymentMethod?: PaymentMethod;
}) {
  const [isShow, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [reponseCreate, creating, _createPaymentMethod] =
    useAction(createPaymentMethod);
  const [reponseUpdate, updating, _updatePaymentMethod] =
    useAction(updatePaymentMethod);

  useEffect(() => {
    if (paymentMethod) {
      setName(paymentMethod.name);
      setDescription(paymentMethod.description);
      setImage(paymentMethod.image);
    }
  }, [paymentMethod]);
  const auth = useAuth();
  const isDemo = !!auth.user?.roles.includes("demo");
  const handleSubmit = async () => {
    try {
      if (isDemo) message.warning("Chỉ được phép xem");
      else if (name && description && image) {
        const data = { name, description, image };
        if (paymentMethod) await _updatePaymentMethod(data, paymentMethod.id);
        else await _createPaymentMethod(data);
      }
    } finally {
      setShow(false);
    }
  };
  return (
    <>
      <Dialog open={isShow} onOpenChange={setShow}>
        <DialogTrigger asChild>
          {paymentMethod ? (
            <Button variant="ghost" size="icon">
              <CiEdit size={20} />
            </Button>
          ) : (
            <Button className="w-3/4 mx-auto" variant="outline">
              Add paymentMethod
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {paymentMethod ? "Edit paymentMethod" : "Create paymentMethod"}
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
                id="name"
                defaultValue={paymentMethod?.name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                defaultValue={paymentMethod?.description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                defaultValue={paymentMethod?.image}
                onChange={(e) => setImage(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={!(name && description && image) || creating || updating}
              onClick={handleSubmit}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
