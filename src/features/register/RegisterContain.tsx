'use client';
import {useState} from 'react';
import {Button} from '../../shared/ui/Button';

interface RegisterFormData {
  nickname: string;
  cellPhone: string;
  sex: 'MALE' | 'FEMALE';
  birth: string;
  name: string;
  email: string;
  password: string;
  isSeller: boolean;
}

interface CheckFormData {
  all: boolean;
  required: boolean;
  optional: boolean;
}

type ErrorState = Partial<Record<keyof RegisterFormData, string>>;
type RegisterFormValue = RegisterFormData[keyof RegisterFormData];

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password: string): boolean => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};

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
] as const;

export const RegisterContain = () => {
  const [register, setRegister] = useState<RegisterFormData>({
    nickname: '',
    cellPhone: '',
    sex: 'MALE',
    birth: '',
    name: '',
    email: '',
    password: '',
    isSeller: false,
  });

  const [check, setCheck] = useState<CheckFormData>({
    all: false,
    required: false,
    optional: false,
  });

  const [errors, setErrors] = useState<ErrorState>({});

  const validateField = (
    name: keyof RegisterFormData,
    value: RegisterFormValue
  ): void => {
    let error = '';

    switch (name) {
      case 'email':
        if (!validateEmail(value as string)) error = '이메일 형식이 아닙니다';
        break;
      case 'password':
        if (!validatePassword(value as string))
          error = '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다';
        break;
      case 'name':
        if ((value as string).length < 2) error = '이름을 입력해주세요';
        break;
      case 'nickname':
        if ((value as string).length < 1) error = '닉네임을 입력해주세요';
        break;
      case 'cellPhone':
        if ((value as string).length !== 11) error = '전화번호를 입력해주세요';
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleInputChange = (
    name: keyof RegisterFormData,
    value: RegisterFormValue
  ): void => {
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    Object.keys(register).forEach((key) => {
      validateField(
        key as keyof RegisterFormData,
        register[key as keyof RegisterFormData]
      );
    });

    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(register),
      });

      console.log(register);

      if (!res.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAllCheck = (checked: boolean): void => {
    setCheck({
      all: checked,
      required: checked,
      optional: checked,
    });
  };

  return (
    <div className="w-full h-full bg-gray2 flex justify-center items-center p-2">
      <div className="bg-white w-[480px] h-full flex flex-col rounded-[10px]">
        <h1 className="p-4 text-2xl mt-4 font-bold">회원가입</h1>
        <form className="p-4 flex flex-col gap-6 justify-between h-full">
          <label className="flex flex-col font-semibold">
            이메일주소
            <input
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요"
              className={`w-full border-b cursor-text font-medium${
                errors.email ? ' border-red-500 border-b-1' : ''
              }`}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => validateField('email', e.target.value)}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </label>

          <label className="flex flex-col font-semibold">
            비밀번호
            <input
              type="password"
              name="password"
              placeholder="영문, 숫자, 특수 문자 조합 8자 이상"
              className={`w-full border-b cursor-text font-medium${
                errors.password ? ' border-red-500 border-b-1' : ''
              }`}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onBlur={(e) => validateField('password', e.target.value)}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </label>

          <label className="flex flex-col font-semibold">
            이름
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              className={`w-full border-b cursor-text font-medium${
                errors.name ? ' border-red-500 border-b-1' : ''
              }`}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={(e) => validateField('name', e.target.value)}
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
                errors.nickname ? ' border-red-500 border-b-1' : ''
              }`}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
              onBlur={(e) => validateField('nickname', e.target.value)}
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
              onChange={(e) => handleInputChange('birth', e.target.value)}
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
                handleInputChange('sex', e.target.value as 'MALE' | 'FEMALE')
              }
              value={register.sex}
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
                errors.cellPhone ? ' border-red-500 border-b-1' : ''
              }`}
              onChange={(e) => handleInputChange('cellPhone', e.target.value)}
              onBlur={(e) => validateField('cellPhone', e.target.value)}
            />
            {errors.cellPhone && (
              <span className="text-red-500">{errors.cellPhone}</span>
            )}
          </label>

          <div className="flex flex-col gap-4">
            <div className="mt-4 flex gap-2">
              <span className="font-medium">판매자 입니다.</span>
              <input
                type="checkbox"
                checked={register.isSeller}
                onChange={(e) =>
                  handleInputChange('isSeller', e.target.checked)
                }
              />
            </div>
            <div className="flex flex-col pr-4 gap-2">
              <div className="flex gap-2">
                <span>모두 동의합니다.</span>
                <input
                  type="checkbox"
                  checked={check.all}
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
                        term.type === '필수' ? check.required : check.optional
                      }
                      onChange={(e) => {
                        if (term.type === '필수') {
                          setCheck((prev) => ({
                            ...prev,
                            required: e.target.checked,
                          }));
                        } else {
                          setCheck((prev) => ({
                            ...prev,
                            optional: e.target.checked,
                          }));
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
