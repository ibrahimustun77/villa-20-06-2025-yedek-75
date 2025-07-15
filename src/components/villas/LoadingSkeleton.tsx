
import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="relative pt-20">
        <div className="h-[60vh] relative overflow-hidden">
          <Skeleton className="absolute inset-0" />
        </div>
      </div>
      <div className="container-custom py-20">
        <div className="flex justify-center mb-12">
          <Skeleton className="h-12 w-[400px]" />
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="h-[500px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoadingSkeleton;
