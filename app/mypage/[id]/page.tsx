import {Button} from '../../../src/shared/ui/Button';
import {ProfileMyPage} from '../../../src/views/mypage/ui/ProfileMyPage';
import {SideMyPage} from '../../../src/views/mypage/ui/SideMyPage';

type Params = {
  params: {
    slug: string;
  };
};

export default function Page({params}: Params) {
  return (
    <>
      <div className="w-full flex gap-12 p-8 ">
        <div className="w-[180px] h-full">
          <SideMyPage />
        </div>
        <div className="w-[900px] h-full flex flex-col gap-10 border-b-2">
          <p className="font-semibold">프로필 관리</p>
          {/* profile 컴퍼넌트 재사용가능하게 수정 필요 */}
          <ProfileMyPage />
          <div className=" flex flex-col gap-4 border-b-2">
            <p className="text-gray2">닉네임</p>
            <div className="flex justify-between">
              <p className="font-semibold">구름</p>
              <Button width="36px" height="36px" radius="10px">
                변경
              </Button>
            </div>
          </div>

          <div className="w-full h-full flex flex-col gap-2 border-b-2">
            <div className=" flex flex-col gap-4">
              <p className="text-gray2">이름</p>
              <div className="flex justify-between">
                <p className="font-semibold">김구름</p>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-2 border-b-2">
            <div className=" flex flex-col gap-4">
              <p className="text-gray2">생년월일</p>
              <div className="flex justify-between">
                <p className="font-semibold">2000.01.01</p>
                <Button width="36px" height="36px" radius="10px">
                  변경
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-2 border-b-2">
            <div className=" flex flex-col gap-4">
              <p className="text-gray2">기본 배송지</p>
              <div className="flex justify-between">
                <p className="font-semibold">경기도 성남시 분당구 판교로 242</p>
                <Button width="36px" height="36px" radius="10px">
                  관리
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-2 ">
            <div className=" flex flex-col gap-4">
              <p className="text-gray2">전화번호</p>
              <div className="flex justify-between">
                <p className="font-semibold">010-1234-5678</p>
                <Button width="36px" height="36px" radius="10px">
                  변경
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
