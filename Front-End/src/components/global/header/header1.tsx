import Image from "next/image";
const banner_url = [
  "/images/topBanner/top banner (1).svg",
  "/images/topBanner/top banner (2).svg",
  "/images/topBanner/top banner (3).svg",
];
export default async function Header1() {
  return (
    <>
      <div className="bg-[#e9efff] ">
        <div className="py-[5px] max-w-[1200px] mx-auto px-1 flex justify-between ">
          {banner_url.map((item) => (
            <Image
              key={item}
              width={300}
              height={30}
              alt="top banner"
              src={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}
