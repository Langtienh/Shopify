import { RegesterForm } from "@/components/app/auth/register";
import { Breadcrumbs } from "@/components/app/dashboard";
import { getUserById } from "@/services/user/query";
import { notFound } from "next/navigation";
export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);
  if (!user) notFound();
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "User", href: "/dashboard/users" },
          {
            label: "Edit User",
            href: `/dashboard/users/edit`,
            active: true,
          },
        ]}
      />
      <RegesterForm isCreateByAdmin user={user} />
    </>
  );
}
