import orderRetriever from '@/features/mypage/api/orderRetriever';
import {PointMyPage} from '../../src/views/mypage/ui/PointMyPage';
import {ProductList} from '../../src/views/mypage/ui/ProductList';
import {ProfileMyPage} from '../../src/views/mypage/ui/ProfileMyPage';
import {PurchasePage} from '../../src/views/mypage/ui/PurchasePage';

import userInfoPoint from '@/features/mypage/api/userInfoPoint';

export default async function Mypage() {
  const orderRes = await orderRetriever();
  const pointRes = await userInfoPoint();

  return (
    <>
      <div className="flex p-8 ">
        {/* <div className="w-[180px] h-full flex flex-col gap-4"></div> */}
        <div className="flex flex-col gap-4">
          <div className="w-[1000px] h-[110px]">
            <ProfileMyPage pointRes={pointRes} />
          </div>
          <div className="w-[1000px] h-[110px] border rounded-[10px]">
            <PointMyPage pointRes={pointRes} />
          </div>
          <PurchasePage orders={orderRes.orders} />
          <div className="w-full border-b"></div>
          <ProductList orders={orderRes.orders} />
        </div>
      </div>
    </>
  );
}
