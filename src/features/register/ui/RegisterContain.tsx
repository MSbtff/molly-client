"use client";
import { Button } from "@/shared/ui/Button";
import { useRegisterForm } from "../hook/useRegisterForm";
import { useTermsAgreement } from "../hook/useTermsAgreement";

export const RegisterContain = () => {
  const {
    formData,
    errors,
    handleInputChange,
    validateField,
    submitRegistration,
  } = useRegisterForm();

  const {
    checkState,
    handleAllCheck,
    handleRequiredCheck,
    handleOptionalCheck,
    isValidTerms,
    terms,
  } = useTermsAgreement();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!isValidTerms()) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    const success = await submitRegistration();
    if (success) {
      alert("회원가입이 완료되었습니다.");
      window.location.href = "/";
    } else {
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="w-full h-full bg-gray2 flex justify-center items-center p-2">
      <div className="bg-white w-[480px] h-full flex flex-col rounded-[10px]">
        <h1 className="p-4 text-2xl mt-4 font-bold">회원가입</h1>
        <form className="p-4 flex flex-col gap-6 justify-between h-full">
          {/* 이메일 필드 */}
          <label className="flex flex-col font-semibold">
            이메일주소
            <input
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요"
              className={`w-full border-b cursor-text font-medium${
                errors.email ? " border-red-500 border-b-1" : ""
              }`}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={(e) => validateField("email", e.target.value)}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </label>

          {/* 비밀번호 필드 */}
          <label className="flex flex-col font-semibold">
            비밀번호
            <input
              type="password"
              name="password"
              placeholder="영문, 숫자, 특수 문자 조합 8자 이상"
              className={`w-full border-b cursor-text font-medium${
                errors.password ? " border-red-500 border-b-1" : ""
              }`}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onBlur={(e) => validateField("password", e.target.value)}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </label>

          {/* 나머지 필드들 (중복 코드 생략) */}
          <label className="flex flex-col font-semibold">
            이름
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              className={`w-full border-b cursor-text font-medium${
                errors.name ? " border-red-500 border-b-1" : ""
              }`}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={(e) => validateField("name", e.target.value)}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </label>

          <label className="flex flex-col font-semibold">
            닉네임
            <input
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              className={`w-full border-b cursor-text font-medium${
                errors.nickname ? " border-red-500 border-b-1" : ""
              }`}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              onBlur={(e) => validateField("nickname", e.target.value)}
            />
            {errors.nickname && (
              <span className="text-red-500">{errors.nickname}</span>
            )}
          </label>

          <label className="w-[150px] flex flex-col font-semibold">
            생년월일
            <input
              type="date"
              name="birth"
              className="cursor-pointer"
              onChange={(e) => handleInputChange("birth", e.target.value)}
            />
            {errors.birth && (
              <span className="text-red-500">{errors.birth}</span>
            )}
          </label>

          <label className="flex flex-col w-12 font-semibold">
            성별
            <select
              name="sex"
              className="cursor-pointer"
              onChange={(e) =>
                handleInputChange("sex", e.target.value as "MALE" | "FEMALE")
              }
              value={formData.sex}
            >
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
          </label>

          <label className="flex flex-col font-semibold">
            휴대전화번호
            <input
              type="text"
              name="cellPhone"
              placeholder="전화번호를 입력해주세요"
              className={`w-full border-b cursor-text font-medium${
                errors.cellPhone ? " border-red-500 border-b-1" : ""
              }`}
              onChange={(e) => handleInputChange("cellPhone", e.target.value)}
              onBlur={(e) => validateField("cellPhone", e.target.value)}
            />
            {errors.cellPhone && (
              <span className="text-red-500">{errors.cellPhone}</span>
            )}
          </label>

          {/* 판매자 체크박스 */}
          <div className="flex flex-col gap-4">
            <div className="mt-4 flex gap-2">
              <span className="font-medium">판매자 입니다.</span>
              <input
                type="checkbox"
                checked={formData.isSeller}
                onChange={(e) =>
                  handleInputChange("isSeller", e.target.checked)
                }
              />
            </div>

            {/* 약관 체크박스 */}
            <div className="flex flex-col pr-4 gap-2">
              <div className="flex gap-2">
                <span>모두 동의합니다.</span>
                <input
                  type="checkbox"
                  checked={checkState.all}
                  onChange={(e) => handleAllCheck(e.target.checked)}
                />
              </div>
              <div className="flex mt-6 flex-col gap-4">
                {terms.map((term) => (
                  <label key={term.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={
                        term.type === "필수"
                          ? checkState.required
                          : checkState.optional
                      }
                      onChange={(e) => {
                        if (term.type === "필수") {
                          handleRequiredCheck(e.target.checked);
                        } else {
                          handleOptionalCheck(e.target.checked);
                        }
                      }}
                    />
                    <span className="text-sm">
                      [{term.type}] {term.content}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <Button
            width="450px"
            height="52px"
            bg="#acacac"
            radius="10px"
            color="white"
            onClick={handleSubmit}
            type="submit"
            className="mt-8"
          >
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
};
