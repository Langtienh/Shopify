export default function CartSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      <div className="mb-[10px] py-[6px]">
        <div className="w-[112px] h-6 rounded-sm bg-gray-300" />
      </div>
      <ul className=" flex flex-col gap-[20px] mb-[100px]">
        {Array.from({ length: count }, (_, i) => (
          <Skeleton key={`productSkeleton-${i}`} />
        ))}
      </ul>
    </>
  );
}
const Skeleton = () => {
  return (
    <div className="bg-white rounded-xl p-[10px] flex flex-col gap-7 shadow-lg border animate-pulse">
      <div role="status" className="flex justify-between gap-4">
        <div className="flex flex-shrink-0 items-center justify-center size-24 bg-gray-300 rounded  dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-full h-24 flex-1 flex flex-col">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mt-3 w-1/2"></div>
          <div className="flex justify-between mt-auto">
            <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-32"></div>
            <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-20"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-24 flex-1 flex flex-col gap-2 justify-between">
        <div className="ml-5 h-3 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="ml-10 h-2 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="ml-10 h-2 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="ml-10 h-2 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="ml-10 h-2 w-3/4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
