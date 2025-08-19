import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="pt-16">
        <Button className="px-8 py-3 text-2xl font-bold rounded-lg">
        <Link href="/documents/123">Click Me</Link>
      </Button>
      </div>
    </div>
  );
};

export default Home;