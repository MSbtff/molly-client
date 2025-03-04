'use client';

import {useState, useEffect} from 'react';
import {AddressModal} from './AddressModal';
import addressDelete from '@/features/address/api/addressDelete';
import addressDefault from '@/features/address/api/addressDefault';

export interface Address {
  addressId: number;
  recipient: string;
  recipientCellPhone: string;
  roadAddress: string;
  numberAddress: string;
  addrDetail: string;
  defaultAddr: boolean;
  userId: number;
  userName: string;
}

export default function AddressContainer({
  addressRes,
}: {
  addressRes: Address[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(addressRes);

  // addressRes가 변경될 때마다 addresses state 업데이트
  useEffect(() => {
    setAddresses(addressRes);
  }, [addressRes]);

  const handleAddAddress = (newAddress: Omit<Address, 'addressId'>) => {
    const newId =
      addresses.length > 0
        ? Math.max(...addresses.map((a) => a.addressId)) + 1
        : 1;

    if (newAddress.defaultAddr) {
      setAddresses((prev) =>
        prev.map((address) => ({
          ...address,
          defaultAddr: false,
        }))
      );
    }

    // 새 주소 추가 시 필요한 모든 필드 포함
    const fullNewAddress: Address = {
      ...newAddress,
      addressId: newId,
      userId: addresses[0]?.userId || 0, // 기존 주소가 있다면 그 userId 사용
      userName: addresses[0]?.userName || '', // 기존 주소가 있다면 그 userName 사용
    };

    setAddresses((prev) => [...prev, fullNewAddress]);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await addressDelete(id);
      if (res) {
        setAddresses((prev) =>
          prev.filter((address) => address.addressId !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await addressDefault(id);

      setAddresses((prev) =>
        prev.map((address) => ({
          ...address,
          defaultAddr: address.addressId === id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (address: Address) => {
    setEditAddress(address);
    setIsModalOpen(true);
  };

  const handleSubmit = async (
    addressData: Omit<Address, 'addressId' | 'userId' | 'userName'>
  ) => {
    if (editAddress) {
      // 수정 모드
      setAddresses((prev) =>
        prev.map((address) =>
          address.addressId === editAddress.addressId
            ? {
                ...address,
                ...addressData,
              }
            : address
        )
      );
      console.log('주소 수정 완료');
      setEditAddress(null);
      setIsModalOpen(false); // 모달 닫기
      alert('수정되었습니다.');
    } else {
      // 새로운 주소 추가
      handleAddAddress({
        ...addressData,
        userId: addresses[0]?.userId || 0,
        userName: addresses[0]?.userName || '',
      });
      setIsModalOpen(false); // 모달 닫기
    }
  };

  return (
    <div className="w-[1000px]">
      <h1 className="text-2xl font-bold mb-6">배송지 관리</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-black text-white px-4 py-2 rounded"
      >
        + 새 배송지 추가
      </button>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditAddress(null);
        }}
        onSubmit={handleSubmit}
        editAddress={editAddress || undefined}
        isEdit={!!editAddress}
      />

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.addressId}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{address.recipient}</span>
                {address.defaultAddr && (
                  <span className="text-sm text-blue-600">기본 배송지</span>
                )}
              </div>
              <div className="text-gray-600 mt-1">
                {address.roadAddress} {address.addrDetail}
              </div>
              <div className="text-gray-600 mt-1">
                {address.recipientCellPhone}
              </div>
            </div>
            <div className="space-x-2">
              {!address.defaultAddr && (
                <button
                  onClick={() => handleSetDefault(address.addressId)}
                  className="text-blue-600 hover:underline"
                >
                  기본 배송지로 설정
                </button>
              )}
              <button
                onClick={() => handleEdit(address)}
                className="text-gray-600 hover:underline"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(address.addressId)}
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
