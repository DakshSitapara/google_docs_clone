import { Skeleton } from "@/components/ui/skeleton";

const lines = [
  "h-3 w-2/5 bg-[#e8eaed]",
  "h-3 w-0",
  "h-2 w-full bg-[#f1f3f4]",
  "h-2 w-full bg-[#f1f3f4]",
  "h-2 w-4/5 bg-[#f1f3f4]",
  "h-2 w-full bg-[#f1f3f4]",
  "h-2 w-3/4 bg-[#f1f3f4]",
  "h-3 w-0",
  "h-2 w-full bg-[#f1f3f4]",
  "h-2 w-5/6 bg-[#f1f3f4]",
  "h-2 w-full bg-[#f1f3f4]",
  "h-2 w-2/3 bg-[#f1f3f4]",
  "h-3 w-0",
  "h-2 w-full bg-[#f1f3f4]",
  "h-2 w-3/4 bg-[#f1f3f4]",
  "h-2 w-full bg-[#f1f3f4]",
];

export const DocumentPreviewSkeleton = () => {
  return (
    <div className="absolute inset-0 bg-white px-6 pt-7 pb-4 overflow-hidden flex flex-col gap-2">
      {lines.map((className, index) => (
        <Skeleton key={index} className={className} />
      ))}
    </div>
  );
};
