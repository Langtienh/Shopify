import { Header2, Header3 } from "@/components/global/header";
import Breadcrumb from "./breadcrumb";

export default async function GuiestHeader() {
  return (
    <div className="fixed top-0 w-full z-30">
      <Header2 />
      <Header3 />
      <Breadcrumb />
    </div>
  );
}
