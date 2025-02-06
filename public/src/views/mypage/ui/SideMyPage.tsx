import React from 'react';
import {SideItem} from './SideItem';

export const SideMyPage = () => {
  return (
    <div className="w-[180px] h-full flex flex-col gap-4">
      <div>
        <span className="text-2xl font-bold block">쇼핑 정보</span>
        <SideItem shopItem={true} />
      </div>
      <div>
        <span className="text-2xl font-bold block">내 정보</span>
        <SideItem shopItem={false} />
      </div>
    </div>
  );
};
