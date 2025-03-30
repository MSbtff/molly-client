// src/features/register/hooks/useRegisterForm.ts
import { useState } from "react";
import { registerPost } from "../api/registerPost";

export interface RegisterFormData {
  nickname: string;
  cellPhone: string;
  sex: "MALE" | "FEMALE";
  birth: string;
  name: string;
  email: string;
  password: string;
  isSeller: boolean;
}

export type RegisterFormKey = keyof RegisterFormData;
export type RegisterFormValue = RegisterFormData[RegisterFormKey];
export type ErrorState = Partial<Record<RegisterFormKey, string>>;

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    nickname: "",
    cellPhone: "",
    sex: "MALE",
    birth: "",
    name: "",
    email: "",
    password: "",
    isSeller: false,
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const handleInputChange = (
    name: RegisterFormKey,
    value: RegisterFormValue
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  const validateField = (
    name: RegisterFormKey,
    value: RegisterFormValue
  ): void => {
    let error = "";

    switch (name) {
      case "email":
        if (!validateEmail(value as string)) error = "이메일 형식이 아닙니다";
        break;
      case "password":
        if (!validatePassword(value as string))
          error = "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다";
        break;
      case "name":
        if ((value as string).length < 2) error = "이름을 입력해주세요";
        break;
      case "nickname":
        if ((value as string).length < 1) error = "닉네임을 입력해주세요";
        break;
      case "cellPhone":
        if ((value as string).length !== 11) error = "전화번호를 입력해주세요";
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateAllFields = (): boolean => {
    Object.keys(formData).forEach((key) => {
      validateField(key as RegisterFormKey, formData[key as RegisterFormKey]);
    });

    return !Object.values(errors).some((error) => error !== "");
  };

  const submitRegistration = async (): Promise<boolean> => {
    if (!validateAllFields()) {
      return false;
    }

    try {
      const res = await registerPost(formData);
      return !!res;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateField,
    submitRegistration,
  };
};
