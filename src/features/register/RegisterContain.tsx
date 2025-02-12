'use client';
import {useState} from 'react';
import {Button} from '../../shared/ui/Button';
import {z} from 'zod';

//유효성 검증 스키마 생성
const registerSchema = z.object({
  nickname: z.string().min(1, {message: '닉네임을 입력해주세요'}),
  cellPhone: z.string().length(11, {message: '전화번호를 입력해주세요'}),
  password: z
    .string()
    .min(8, {message: '비밀번호는 8자 이상이어야 합니다'})
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
    }),
  name: z.string().min(3, {message: '이름을 입력해주세요'}),
  email: z.string().email({message: '이메일 형식이 아닙니다'}),
  isSeller: z.boolean(),
  sex: z.enum(['MALE', 'FEMALE']),
  birth: z.string(),
});

const checkSchema = z.object({
  all: z.boolean(),
  required: z.boolean(),
  optional: z.boolean(),
});

// 회원가입 폼 데이터 타입 추론
type RegisterFormData = z.infer<typeof registerSchema>;
type CheckFormData = z.infer<typeof checkSchema>;

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

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  const validateField = (name: keyof RegisterFormData, value: any) => {
    try {
      // 각 필드에 대한 개별 스키마 유효성 검사
      const fieldSchema = registerSchema.shape[name];
      fieldSchema.parse(value);

      // 유효성 검사 통과시 해당 필드의 에러 메시지 제거
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // 유효성 검사 실패시 에러 메시지 설정
        setErrors((prev) => ({
          ...prev,
          [name]: error.errors[0].message,
        }));
      }
    }
  };

  const handleInputChange = (name: keyof RegisterFormData, value: any) => {
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse(register);

    if (!result.success) {
      const formattedErrors = result.error.issues.reduce(
        (acc, issue) => ({
          ...acc,
          [issue.path[0]]: issue.message,
        }),
        {}
      );
      setErrors(formattedErrors);
      return;
    }
    setErrors({});

    try {
      const res = await fetch('http://3.35.175.203:8080/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: register.nickname,
          cellPhone: register.cellPhone,
          sex: register.sex,
          birth: register.birth,
          name: register.name,
          email: register.email,
          password: register.password,
          isSeller: register.isSeller,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(register);
  console.log(check);

  return (
    <div className="w-full h-full bg-gray2 flex justify-center items-center p-2">
      <div className="bg-white w-[480px] h-full flex flex-col rounded-[10px]">
        <h1 className=" p-4 text-2xl mt-4 font-bold">회원가입</h1>
        <form className="p-4 flex flex-col gap-6 justify-between h-full">
          <label className="flex flex-col font-semibold">
            이메일주소
            <input
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요"
              className={`w-full  border-b cursor-text font-medium${
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
              className="w-full border-b cursor-text font-medium"
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
              className="w-full border-b cursor-text font-medium"
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={(e) => validateField('name', e.target.value)}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </label>
          <label className="flex flex-col font-bold">
            닉네임
            <input
              type="text"
              name="nickname"
              placeholder="이름을 입력해주세요"
              className="w-full border-b cursor-text font-medium"
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
              name="birthday"
              onChange={(e) => {
                setRegister({...register, birth: e.target.value});
              }}
            />
            {errors.birth && (
              <span className="text-red-500">{errors.birth}</span>
            )}
          </label>
          <label className="flex flex-col w-12 font-semibold">
            성별
            <select
              name="gender"
              className="cursor-pointer"
              onChange={(e) => {
                setRegister({
                  ...register,
                  sex: e.target.value as 'MALE' | 'FEMALE',
                });
              }}
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
              placeholder="전화번호 입력해주세요"
              className="w-full border-b cursor-text font-medium"
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
                onClick={() =>
                  setRegister({...register, isSeller: !register.isSeller})
                }
              />
            </div>
            <div className="flex flex-col pr-4 gap-2">
              <div className="flex gap-2">
                <span>모두 동의합니다.</span>
                <input
                  type="checkbox"
                  onClick={() =>
                    setCheck((prev) => ({...prev, all: !prev.all}))
                  }
                />
              </div>
              <div className="flex mt-6 flex-col gap-4">
                {terms.map((term) => (
                  <label key={term.id} className="flex items-center gap-2">
                    <input type="checkbox" className="w-5 h-5" />
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
