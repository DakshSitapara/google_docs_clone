"use client";

import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = (
    { error, reset }: { error: Error & { digest?: string }; reset: () => void }
) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <div className="p-3 bg-rose-100 rounded-full">
                    <AlertTriangleIcon className="size-10 text-rose-500" />
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                    Something went wrong!
                </h2>
                <p className="text-sm text-gray-600">
                    {error.message}
                </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
                <Button
                    onClick={() => reset()}
                    className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600"
                >
                    Try again
                </Button>
                <Button
                    asChild
                    variant="link"
                    className="px-4 py-2 text-sm font-medium text-gray-700"
                >
                    <Link href="/">Go back home</Link>
                </Button>
            </div>
        </div>
    </div>
  );
};

export default ErrorPage;