import {BorderBox} from '../BorderBox';

export const PurchasePage = () => {
  return (
    <>
      <div className="text-2xl font-bold">구매내역</div>
      <div className="w-full h-full  ">
        <div className="flex">
          <BorderBox title="전체" count="10" />
          <BorderBox title="결제대기" count="0" />
          <BorderBox title="배송중" count="3" />
          <BorderBox title="배송완료" count="7" />
        </div>
      </div>
    </>
  );
};
