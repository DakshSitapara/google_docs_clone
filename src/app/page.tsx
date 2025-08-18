import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Button className="px-8 py-3 text-2xl font-bold rounded-lg">
        <Link href="/documents/123">Click Me</Link>
      </Button>
    </div>
  );
};

export default Page;