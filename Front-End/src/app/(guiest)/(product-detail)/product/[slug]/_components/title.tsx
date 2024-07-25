import { view } from "@/lib/ultils";
import { Rate } from "antd";
type PropsType = {
  name: string;
  viewCount: number;
};
export default function Title({ name, viewCount }: PropsType) {
  return (
    <>
      {/* header */}
      <h1 className="w-full text-[18px] text-[#0a263c] font-bold text-ellipsis">
        <span className="pe-3"> {name}</span>
        <span className="pe-3">
          <Rate
            className="flex gap-0 items-center *:mr-0 text-[rgb(245,158,11)] *:text-[14px] *:m-0 *:p-0"
            allowHalf
            defaultValue={4.5}
          />
        </span>
        <span className="text-sm text-nowrap font-normal">
          {view(viewCount)} Đánh giá
        </span>
      </h1>
    </>
  );
}
