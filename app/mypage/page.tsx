import {PointMyPage} from '../../src/views/mypage/ui/PointMyPage';
import {ProductList} from '../../src/views/mypage/ui/ProductList';
import {ProfileMyPage} from '../../src/views/mypage/ui/ProfileMyPage';
import {PurchasePage} from '../../src/views/mypage/ui/PurchasePage';
import {SideMyPage} from '../../src/views/mypage/ui/SideMyPage';

export default function Mypage() {
  return (
    <>
      <div className="flex p-8">
        <div className="w-[180px] h-full flex flex-col gap-4">
          <SideMyPage />
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-[1000px] h-[110px]">
            <ProfileMyPage />
          </div>
          <div className="w-[1000px] h-[110px] border rounded-[10px]">
            <PointMyPage />
          </div>
          <PurchasePage />
          <div className="w-full border-b"></div>
          <ProductList />
        </div>
      </div>
    </>
  );
}
