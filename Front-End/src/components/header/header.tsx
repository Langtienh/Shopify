import Header2 from "@/components/header/header2";
import Header1 from "@/components/header/header1";

export default function Header() {
  return (
    <div className="fixed top-0 w-full max-w-[1280px] mx-auto z-10 text-white">
      <Header1 />
      <Header2 />
    </div>
  );
}
