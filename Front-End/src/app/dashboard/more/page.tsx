import { Breadcrumbs } from "@/components/app/dashboard";
import BrandForm from "@/components/app/dashboard/more/brand-form";
import {
  DelBrandButton,
  DelCategoryButton,
  UpdateMethodStatusButton,
} from "@/components/app/dashboard/more/button";
import CategoryForm from "@/components/app/dashboard/more/category-form";
import PaymentMethodForm from "@/components/app/dashboard/more/payment-method-form";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getMore } from "@/services/dashboard/query";
import Image from "next/image";

export default async function Page() {
  const { brands, categories, paymentMethods } = await getMore();
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "More", href: "/dashboard/more", active: true },
        ]}
      />
      <div className="grid md:grid-cols-12 gap-5 relative">
        <div className="col-span-5 bg-white pt-2 pb-5 rounded-lg shadow-lg sticky top-0 h-max">
          <Table>
            <TableCaption className="font-bold">
              A list of your recent brands.
            </TableCaption>
            <TableHeader>
              <TableRow className="*:text-center">
                <TableHead>Id</TableHead>
                <TableHead className="!text-start">Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="*:text-center">
              {brands.map((brand) => (
                <TableRow key={brand.name}>
                  <TableCell>{`B0${brand.id}`}</TableCell>
                  <TableCell className="text-start">{brand.name}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-3">
                      <DelBrandButton brandId={brand.id} />
                      <BrandForm brand={brand} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="pt-3 flex justify-center">
            <BrandForm />
          </div>
        </div>
        <div className="col-span-7 sticky top-0 h-max">
          <div className="bg-white pt-2 pb-5 rounded-lg shadow-lg">
            <Table>
              <TableCaption className="font-bold">
                A list of your recent categories.
              </TableCaption>
              <TableHeader>
                <TableRow className="*:text-center">
                  <TableHead>Id</TableHead>
                  <TableHead className="!text-start">Name</TableHead>
                  <TableHead className="!text-start">Label</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="*:text-center">
                {categories.map((category) => (
                  <TableRow key={category.name}>
                    <TableCell>{`C0${category.id}`}</TableCell>
                    <TableCell className="text-start">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-start">
                      {category.label}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <DelCategoryButton categoryId={category.id} />
                        <CategoryForm category={category} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="pt-3 flex justify-center">
              <CategoryForm />
            </div>
          </div>
          <div className="bg-white pt-2 pb-5 rounded-lg shadow-lg mt-5">
            <Table>
              <TableCaption className="font-bold">
                A list of your recent payment-methods.
              </TableCaption>
              <TableHeader>
                <TableRow className="*:text-center">
                  <TableHead>Id</TableHead>
                  <TableHead className="!text-start">Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="*:text-center">
                {paymentMethods.map((paymentMethod) => (
                  <TableRow key={paymentMethod.name}>
                    <TableCell>{`PA0${paymentMethod.id}`}</TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        <div className="size-24">
                          <Image
                            src={paymentMethod.image}
                            alt={paymentMethod.name}
                            width={96}
                            height={96}
                            className="size-24 object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold pb-3">{paymentMethod.name}</p>
                          <p>{paymentMethod.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {paymentMethod.status ? "Hoạt động" : "Thử nghiệm"}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-3">
                        <PaymentMethodForm paymentMethod={paymentMethod} />
                        <UpdateMethodStatusButton
                          paymenMethodId={paymentMethod.id}
                          status={paymentMethod.status}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="pt-3 flex justify-center">
              <PaymentMethodForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
