export default function RegisterPage() {
  return (
    <div className="w-full h-screen bg-gray2 flex justify-center items-center">
      <div className="bg-white w-[480px] h-full flex flex-col ">
        <h1 className="text-2xl mt-24">회원가입</h1>
        <form className="flex flex-col">
          <label className="flex flex-col">
            이메일주소
            <input
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요"
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </label>
          <label>
            이름
            <input
              type="text"
              name="userName"
              placeholder="이름을 입력해주세요"
            />
          </label>
          <label>
            생년월일
            <input type="text" name="birthday" />
          </label>
          <label>
            성별
            <select name="gender">
              <option value="male">남성</option>
              <option value="female">여성</option>
            </select>
          </label>
          <label>
            휴대전화번호
            <input
              type="text"
              name="phoneNumber"
              placeholder="전화번호 입력해주세요"
            />
          </label>
          <button type="submit">회원가입</button>
        </form>
        <div>모두 동의합니다.</div>
        <div>판매자 입니다.</div>
        <div>[필수] 만 14세 입니다.</div>
        <div>[필수] 이용약관 동의</div>
        <div>[필수] 개인 정보 수집 및 이용 동의</div>
        <div>광고성 정보 수신 모두 동의</div>
      </div>
    </div>
  );
}
