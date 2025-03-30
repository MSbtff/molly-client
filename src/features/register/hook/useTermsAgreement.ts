// src/features/register/hooks/useTermsAgreement.ts
import { useState } from "react";

export interface CheckFormData {
  all: boolean;
  required: boolean;
  optional: boolean;
}

export const terms = [
  {
    id: 1,
    type: "필수",
    content: "만 14세 이상입니다.",
  },
  {
    id: 2,
    type: "필수",
    content: "이용약관 동의",
  },
  {
    id: 3,
    type: "필수",
    content: "개인정보 수집 및 이용 동의",
  },
  {
    id: 4,
    type: "선택",
    content: "마케팅 정보 수신 동의",
  },
] as const;

export const useTermsAgreement = () => {
  const [checkState, setCheckState] = useState<CheckFormData>({
    all: false,
    required: false,
    optional: false,
  });

  const handleAllCheck = (checked: boolean): void => {
    setCheckState({
      all: checked,
      required: checked,
      optional: checked,
    });
  };

  const handleRequiredCheck = (checked: boolean): void => {
    setCheckState((prev) => {
      const newState = {
        ...prev,
        required: checked,
      };
      // 모든 체크박스 상태 동기화
      newState.all = newState.required && newState.optional;
      return newState;
    });
  };

  const handleOptionalCheck = (checked: boolean): void => {
    setCheckState((prev) => {
      const newState = {
        ...prev,
        optional: checked,
      };
      // 모든 체크박스 상태 동기화
      newState.all = newState.required && newState.optional;
      return newState;
    });
  };

  const isValidTerms = (): boolean => {
    return checkState.required;
  };

  return {
    checkState,
    handleAllCheck,
    handleRequiredCheck,
    handleOptionalCheck,
    isValidTerms,
    terms,
  };
};
