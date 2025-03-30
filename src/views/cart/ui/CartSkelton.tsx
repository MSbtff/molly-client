"use client";

export const CartSkelton = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full flex gap-x-4 items-start">
        <div className="relative w-20 h-20 flex-shrink-0 bg-gray-200 animate-pulse"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="font-semibold min-h-[1.5rem] bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="min-h-[1.25rem] bg-gray-200 animate-pulse rounded w-1/3 mt-1"></div>
          <div className="min-h-[1.2rem] bg-gray-200 animate-pulse rounded w-1/4 mt-1"></div>
          <div className="min-h-[1.2rem] bg-gray-200 animate-pulse rounded w-1/4 mt-1"></div>
          <div className="min-h-[1.2rem] bg-gray-200 animate-pulse rounded w-full mt-1"></div>
          <div className="min-h-[1.2rem] bg-gray-200 animate-pulse rounded w-full mt-1"></div>
        </div>
      </div>
    </div>
  );
};
