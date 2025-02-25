import userInfo from '@/features/mypage/api/userInfo';
import {MypageContainer} from '@/views/mypage/ui/MypageContainer';

export default async function Page() {
  const userRes = await userInfo();
  console.log(userRes);
  return (
    <>
      <div className="w-full">
        <MypageContainer userRes={userRes} />
      </div>
    </>
  );
}
