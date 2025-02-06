import {Button} from '../../public/src/shared/ui/Button';

export default function RegisterPage() {
  const terms = [
    {
      id: 1,
      type: '필수',
      content: '만 14세 이상입니다.',
    },
    {
      id: 2,
      type: '필수',
      content: '이용약관 동의',
    },
    {
      id: 3,
      type: '필수',
      content: '개인정보 수집 및 이용 동의',
    },
    {
      id: 4,
      type: '선택',
      content: '마케팅 정보 수신 동의',
    },
  ];

  return (
    <div className="w-full h-screen bg-gray2 flex justify-center items-center">
      <div className="bg-white w-[480px] h-full flex flex-col">
        <h1 className="p-4 text-2xl mt-24 font-bold">회원가입</h1>
        <form className="p-4 flex flex-col justify-between h-full">
          <label className="flex flex-col font-bold">
            이메일주소
            <input
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요"
              className="w-[400px] border-b-2 cursor-text"
            />
          </label>
          <label className="flex flex-col font-bold">
            비밀번호
            <input
              type="password"
              name="password"
              placeholder="영문, 숫자, 특수 문자 조합 8자 이상"
              className="w-[400px] border-b-2 cursor-text"
            />
          </label>
          <label className="flex flex-col font-bold">
            이름
            <input
              type="text"
              name="userName"
              placeholder="이름을 입력해주세요"
              className="w-[400px] border-b-2 cursor-text"
            />
          </label>
          <label className="flex flex-col font-bold">
            닉네임
            <input
              type="text"
              name="userName"
              placeholder="이름을 입력해주세요"
              className="w-[400px] border-b-2 cursor-text"
            />
          </label>
          <label className="w-[150px] flex flex-col font-bold">
            생년월일
            <input type="date" name="birthday" />
          </label>
          <label className="flex flex-col w-12 font-bold">
            성별
            <select name="gender" className="cursor-pointer">
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </label>
          <label className="flex flex-col font-bold">
            휴대전화번호
            <input
              type="text"
              name="phoneNumber"
              placeholder="전화번호 입력해주세요"
              className="w-[400px] border-b-2 cursor-text"
            />
          </label>
          <div className="flex justify-between pr-4">
            <span>모두 동의합니다.</span>
            <div>check</div>
          </div>
          <div>
            <span>판매자 입니다.</span>
            <div>check</div>
          </div>
          <div className="flex flex-col gap-4">
            {terms.map((term) => (
              <label key={term.id} className="flex items-center gap-2">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">
                  [{term.type}] {term.content}
                </span>
              </label>
            ))}
          </div>
          <Button
            width="400px"
            height="52px"
            bg="#acacac"
            radius="10px"
            color="white"
          >
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}
