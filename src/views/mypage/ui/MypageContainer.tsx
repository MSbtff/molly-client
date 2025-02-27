'use client';

import {Button} from '@/shared/ui/Button';
import {ProfileMyPage} from './ProfileMyPage';
import Link from 'next/link';
import {useState} from 'react';
import userInfoChange from '@/features/mypage/api/uesrInfoChange';

interface UserInfo {
  nickname: string;
  name: string;
  birth: string;
  cellPhone: string;
  email: string;
}

export interface EditableUserInfo {
  nickname: string;
  name: string;
  birth: string;
  cellPhone: string;
}

export const MypageContainer = ({userRes}: {userRes: UserInfo}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValues, setNewValues] = useState<EditableUserInfo>({
    nickname: userRes.nickname,
    name: userRes.name,
    birth: userRes.birth,
    cellPhone: userRes.cellPhone,
  });

  const handleEdit = () => {
    if (isEditing) {
      // 취소시 원래 값으로 복구
      setNewValues({
        nickname: userRes.nickname,
        name: userRes.name,
        birth: userRes.birth,
        cellPhone: userRes.cellPhone,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    // TODO: API 호출하여 모든 필드 한번에 업데이트
    try {
      await userInfoChange(newValues);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (field: keyof typeof newValues, value: string) => {
    setNewValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 필드 컴포넌트 생성 함수
  const renderField = (label: string, field: keyof typeof newValues) => {
    // 필드별 input type 지정
    const getInputType = (field: keyof typeof newValues) => {
      switch (field) {
        case 'birth':
          return 'date';
        case 'cellPhone':
          return 'tel';
        default:
          return 'text';
      }
    };

    return (
      <div className="flex flex-col gap-4 border-b-2">
        <div className="flex justify-between">
          <p className="text-gray2">{label}</p>
        </div>
        <div className="flex justify-between items-center">
          {isEditing ? (
            <input
              type={getInputType(field)}
              value={newValues[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p className="font-semibold">{userRes[field]}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full flex gap-12 p-8">
        <div className="w-[900px] h-full flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">프로필 관리</h1>
            <div className="flex gap-2">
              <Button
                onClick={handleEdit}
                width="80px"
                height="36px"
                radius="10px"
                border="1px"
              >
                {isEditing ? '취소' : '수정'}
              </Button>
              {isEditing && (
                <Button
                  onClick={handleSubmit}
                  width="80px"
                  height="36px"
                  radius="10px"
                  border="1px"
                >
                  저장
                </Button>
              )}
            </div>
          </div>

          <ProfileMyPage
            pointRes={{name: userRes.name, email: userRes.email, point: 0}}
          />

          {renderField('닉네임', 'nickname')}
          {renderField('이름', 'name')}
          {renderField('생년월일', 'birth')}
          {renderField('전화번호', 'cellPhone')}

          {/* 기본 배송지 섹션 */}
          <div className="w-full flex flex-col gap-2 border-b-2">
            <div className="flex flex-col gap-4">
              <p className="text-gray2">기본 배송지</p>
              <div className="flex justify-between">
                <p className="font-semibold"></p>
                <Link
                  href="/mypage/address"
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                >
                  관리
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
