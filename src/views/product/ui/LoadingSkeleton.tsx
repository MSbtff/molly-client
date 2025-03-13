'use client';

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 gap-2 mt-1 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col items-left mt-10">
          <div className="w-40 h-40 bg-gray-300 rounded-md" />
          <div className="w-32 h-4 bg-gray-300 rounded mt-2" />
          <div className="w-28 h-4 bg-gray-200 rounded mt-1" />
          <div className="w-24 h-4 bg-gray-200 rounded mt-1" />
        </div>
      ))}
    </div>
  );
}