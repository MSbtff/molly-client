import {Button} from '../../../public/src/shared/ui/Button';
import {ProfileMyPage} from '../../../public/src/views/mypage/ui/ProfileMyPage';

type Params = {
  params: {
    slug: string;
  };
};

export default function Page({params}: Params) {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="w-[420px] h-full flex flex-col gap-10 border-b-2">
          <strong>프로필 관리</strong>
          {/* profile 컴퍼넌트 재사용가능하게 수정 필요 */}
          <ProfileMyPage />
          <div className=" flex flex-col gap-4 border-b-2">
            <p className="text-gray2">닉네임</p>
            <div className="flex justify-between">
              <strong>구름</strong>
              <Button width="36px" height="36px" radius="10px">
                변경
              </Button>
            </div>
          </div>

          <div className="w-[420px] h-full flex flex-col gap-2 border-b-2">
            <div className=" flex flex-col gap-4">
              <p className="text-gray2">이름</p>
              <div className="flex justify-between">
                <strong>김구름</strong>
              </div>
            </div>
          </div>
          <div className="w-[420px] h-full flex flex-col gap-2 border-b-2">
            <div className=" flex flex-col gap-4">
              <p className="text-gray2">생년월일</p>
              <div className="flex justify-between">
                <strong>2000.01.01</strong>
                <Button width="36px" height="36px" radius="10px">
                  변경
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[420px] h-full flex flex-col gap-2 border-b-2">
            <div className=" flex flex-col gap-4">
              <p className="text-gray2">기본 배송지</p>
              <div className="flex justify-between">
                <strong>경기도 성남시 분당구 판교로 242</strong>
                <Button width="36px" height="36px" radius="10px">
                  관리
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[420px] h-full flex flex-col gap-2 ">
            <div className=" flex flex-col gap-4">
              <p className="text-gray2">전화번호</p>
              <div className="flex justify-between">
                <strong>010-1234-5678</strong>
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
