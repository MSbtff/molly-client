import {PointMyPage} from '../../public/src/views/mypage/ui/PointMyPage';
import {ProfileMyPage} from '../../public/src/views/mypage/ui/ProfileMyPage';
import {PurchasePage} from '../../public/src/views/mypage/ui/PurchasePage';
import {SideMyPage} from '../../public/src/views/mypage/ui/SideMyPage';

export default function Mypage() {
  return (
    <>
      <div className="flex  p-8">
        <div className="w-[180px] h-full flex flex-col gap-4">
          <SideMyPage />
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-[1000px] h-[110px]">
            <ProfileMyPage />
          </div>
          <div className="w-[1000px] h-[110px] border">
            <PointMyPage />
          </div>
          <PurchasePage />
        </div>
      </div>
    </>
  );
}
