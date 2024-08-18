import { RegesterForm } from "@/components/app/auth/register";
import { Breadcrumbs } from "@/components/app/dashboard";

export default async function Page() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "User", href: "/dashboard/users" },
          {
            label: "Create User",
            href: `/dashboard/users/create`,
            active: true,
          },
        ]}
      />
      <RegesterForm isCreateByAdmin />
    </>
  );
}
