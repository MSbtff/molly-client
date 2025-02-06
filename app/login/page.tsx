import {Button} from '../../public/src/shared/ui/Button';
import {Icon} from '../../public/src/shared/ui/Icon';

export default function LoginPage() {
  return (
    <div className="min-w-full h-full flex flex-col items-center justify-center">
      <Icon />
      <h1 className="text-2xl">로그인</h1>
      <form className="mt-12 w-full h-[260px] flex flex-col items-center justify-between cursor-text">
        <label className="w-[435px] flex flex-col items-start ">
          <span className="text-2xl">이메일주소</span>
          <input
            type="text"
            name="username"
            placeholder="Molly@gmail.com"
            className="w-[435px] border-b-2 text-lg "
          />
        </label>
        <label className="w-[435px] flex flex-col items-start">
          <span className="text-2xl">비밀번호</span>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-[435px] border-b-2 text-lg "
          />
        </label>

        <Button
          color="white"
          width="435px"
          height="52px"
          radius="10px"
          border="1px solid #ccc"
          bg="#ACACAC"
        >
          로그인
        </Button>
      </form>
      <div className="mt-10 w-[435px] h-9  flex justify-between">
        <div>회원가입</div>
        <div>이메일 찾기</div>
        <div>비밀번호 찾기</div>
      </div>
    </div>
  );
}
