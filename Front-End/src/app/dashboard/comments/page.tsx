import { Breadcrumbs } from "@/components/app/dashboard";
import TableComments from "@/components/app/dashboard/comments/table";
import { Suspense } from "react";

type Props = {
  searchParams: {
    page?: number;
    limit?: number;
  };
};

export default function Page({ searchParams: { limit, page } }: Props) {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Comments", href: "/dashboard/comments", active: true },
        ]}
      />
      <Suspense fallback={"Loading comments"}>
        <TableComments page={page} limit={limit} />
      </Suspense>
    </>
  );
}
