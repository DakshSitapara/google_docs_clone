'use client';

import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Lightning from '@/components/Lighting';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Lightning 
          hue={220}
          speed={1.5}
          intensity={1}
          size={2}
        />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-xl space-y-6 text-center bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <FileQuestion className="mx-auto size-20 text-blue-500" />

          <h1 className="text-4xl font-bold text-gray-400">404 - Page Not Found</h1>
          <p className="text-lg text-gray-600">
            Oops! It looks like the page you&apos;re looking for doesn&apos;t exist. Maybe it was moved or renamed?
          </p>

          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="size-4" />
              Go Back
            </Button>

            <Button asChild>
              <Link href="/">
                <Home className="size-4" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
