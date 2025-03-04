import React from 'react';
import {SideItem} from './SideItem';

export const SideMyPage = () => {
  return (
    <div className="w-[180px] h-full flex flex-col gap-4 p-8">
      <div className="min-w-[180px]">
        <span className="text-base md:text-lg lg:text-2xl font-bold block break-keep whitespace-nowrap">
          쇼핑 정보
        </span>
        <SideItem shopItem={true} />
      </div>
      <div className="min-w-[180px]">
        <span className="text-base md:text-lg lg:text-2xl font-bold block break-keep whitespace-nowrap">
          내 정보
        </span>
        <SideItem shopItem={false} />
      </div>
    </div>
  );
};
