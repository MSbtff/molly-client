export default function RegisterPage() {
  return (
    <div className="bg-gray">
      <h1>Register</h1>
      <form>
        <label>
          이메일주소:
          <input type="text" name="email" />
        </label>
        <label>
          비밀번호:
          <input type="password" name="password" />
        </label>
        <label>
          이름
          <input type="text" name="userName" />
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
          <input type="text" name="phoneNumber" />
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
  );
}
