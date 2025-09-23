'use client';

import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../app/(home)/navbar';
import { useRouter } from 'next/navigation';
import SplashCursor from '@/components/SplashCursor';
import { Button } from '@/components/ui/button';
import Lightning from '@/components/Lighting';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden">
  
  <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-black/20 backdrop-blur-md p-4">
    <Navbar />
  </div>

  <div className="absolute inset-0 -z-10">
    <Lightning
      hue={220}
      speed={1.5}
      intensity={1}
      size={2}
    />
  </div>

  <SplashCursor />

  <div className="flex min-h-screen flex-col items-center justify-center p-4">
    <div className="max-w-xl space-y-6 text-center bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
      
      <FileQuestion className="mx-auto size-20 text-blue-500" />

      <h1 className="text-4xl font-bold text-gray-400">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600">
        Oops! It looks like the page you&#39;re looking for doesn&#39;t exist. Maybe it was moved or renamed?
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
          <ArrowLeft className="size-4" />
          Go Back
        </Button>

        <Button asChild className="w-full sm:w-auto">
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
