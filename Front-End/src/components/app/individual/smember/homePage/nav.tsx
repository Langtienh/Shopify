import Image from "next/image";
import { NavSmemverData } from "@/hard-coding/data";

export default function Nav() {
  return (
    <div className="p-[10px] flex flex-wrap justify-between gap-4 bg-white rounded-xl border">
      {NavSmemverData.map(
        (item) =>
          item.isNew && (
            <div
              className="flex-auto flex-shrink-0 flex flex-col gap-1 items-center justify-center"
              key={item.label}
            >
              <div className="size-10 rounded-full bg-[#e7f1fe] flex items-center justify-center">
                <Image
                  src={item.icon}
                  width={24}
                  height={24}
                  alt={item.label}
                />
              </div>
              <div className="w-full text-sm text-center">{item.label}</div>
            </div>
          )
      )}
    </div>
  );
}
