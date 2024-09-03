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
    <div className="px-7 py-4 rounded-xl shadow-xl bg-white">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Comments", href: "/dashboard/comments", active: true },
        ]}
      />
      <div className="rounded-xl border pb-3">
        <Suspense fallback={"Loading comments"}>
          <TableComments page={page} limit={limit} />
        </Suspense>
      </div>
    </div>
  );
}
