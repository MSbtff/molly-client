'use client';

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 gap-2 mt-1 animate-pulse">
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className="flex flex-col items-left mt-10 animate-pulse">
          <div className="w-full aspect-[5/6] bg-gray-300 animate-pulse" />
          <div className="w-32 h-4 bg-gray-300 mt-2" />
          <div className="w-28 h-4 bg-gray-200 mt-1" />
          <div className="w-24 h-4 bg-gray-200 mt-1" />
        </div>
      ))}
    </div>
  );
}