import Header1 from "@/components/header/header1";
import Header2 from "@/components/header/header2";
import Header3 from "@/components/header/header3";
import Breadcrumb from "@/app/(guiest)/_components/header/breadcrumb";

export default async function Header() {
  return (
    <div className="fixed top-0 w-full max-w-[1400px] mx-auto z-30">
      {/* <Header1 /> */}
      <Header2 />
      <Header3 />
      <Breadcrumb />
    </div>
  );
}
