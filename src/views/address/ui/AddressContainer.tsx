'use client';

import {useState} from 'react';

interface Address {
  id: number;
  name: string;
  address: string;
  detail: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressContainer() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: '홍길동',
      address: '서울시 강남구 테헤란로',
      detail: '123-45',
      phone: '010-1234-5678',
      isDefault: true,
    },
    {
      id: 2,
      name: '김철수',
      address: '서울시 서초구 서초대로',
      detail: '456-78',
      phone: '010-8765-4321',
      isDefault: false,
    },
  ]);

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">배송지 관리</h1>
      <button className="mb-4 bg-black text-white px-4 py-2 rounded">
        + 새 배송지 추가
      </button>
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{address.name}</span>
                {address.isDefault && (
                  <span className="text-sm text-blue-600">기본 배송지</span>
                )}
              </div>
              <div className="text-gray-600 mt-1">
                {address.address} {address.detail}
              </div>
              <div className="text-gray-600 mt-1">{address.phone}</div>
            </div>
            <div className="space-x-2">
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="text-blue-600 hover:underline"
                >
                  기본 배송지로 설정
                </button>
              )}
              <button
                onClick={() => handleDelete(address.id)}
                className="text-red-600 hover:underline"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
