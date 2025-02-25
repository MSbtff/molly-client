'use client';

import {useState, useEffect} from 'react';
import {Address} from './AddressContainer';
import AddressAdd from '@/features/address/api/addrssAdd';
import addressUpdate from '@/features/address/api/addressUpdate';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    address: Omit<Address, 'addressId' | 'userId' | 'userName'>
  ) => void;
  editAddress?: Address;
  isEdit?: boolean;
}

export const AddressModal = ({
  isOpen,
  onClose,
  onSubmit,
  editAddress,
  isEdit = false,
}: AddressModalProps) => {
  const [form, setForm] = useState({
    recipient: '',
    recipientCellPhone: '',
    roadAddress: '',
    numberAddress: '',
    addrDetail: '',
    defaultAddr: false,
  });

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen) {
      if (isEdit && editAddress) {
        // 수정 모드일 경우 기존 주소 정보로 설정
        setForm({
          recipient: editAddress.recipient,
          recipientCellPhone: editAddress.recipientCellPhone,
          roadAddress: editAddress.roadAddress,
          numberAddress: editAddress.numberAddress,
          addrDetail: editAddress.addrDetail,
          defaultAddr: editAddress.defaultAddr,
        });
      } else {
        // 새 배송지 추가 모드일 경우 초기화
        setForm({
          recipient: '',
          recipientCellPhone: '',
          roadAddress: '',
          numberAddress: '',
          addrDetail: '',
          defaultAddr: false,
        });
      }
    }
  }, [isOpen, isEdit, editAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 각 필드를 직접 FormData에 추가
      const addressData = {
        recipient: form.recipient,
        recipientCellPhone: form.recipientCellPhone,
        roadAddress: form.roadAddress,
        numberAddress: form.numberAddress,
        addrDetail: form.addrDetail,
        defaultAddr: form.defaultAddr,
      };

      // FormData 내용 확인을 위한 로깅

      if (isEdit && editAddress) {
        // 수정 모드
        const res = await addressUpdate(editAddress.addressId, addressData);
        if (res) {
          onSubmit(addressData);
          setForm({
            recipient: '',
            recipientCellPhone: '',
            roadAddress: '',
            numberAddress: '',
            addrDetail: '',
            defaultAddr: false,
          });
          onClose();
        }
      } else {
        // 추가 모드
        const res = await AddressAdd(addressData);
        if (res) {
          onSubmit(addressData);
          setForm({
            recipient: '',
            recipientCellPhone: '',
            roadAddress: '',
            numberAddress: '',
            addrDetail: '',
            defaultAddr: false,
          });
          onClose();
        }
      }

      onClose();

      // 성공 시에만 폼 초기화 및 모달 닫기
    } catch (error) {
      console.error('주소 추가 실패:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? '배송지 수정' : '새 배송지 추가'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">받는 사람</label>
            <input
              type="text"
              value={form.recipient}
              onChange={(e) => setForm({...form, recipient: e.target.value})}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">연락처</label>
            <input
              type="tel"
              value={form.recipientCellPhone}
              onChange={(e) =>
                setForm({...form, recipientCellPhone: e.target.value})
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">도로명 주소</label>
            <input
              type="text"
              value={form.roadAddress}
              onChange={(e) => setForm({...form, roadAddress: e.target.value})}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">지번 주소</label>
            <input
              type="text"
              value={form.numberAddress}
              onChange={(e) =>
                setForm({...form, numberAddress: e.target.value})
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">상세주소</label>
            <input
              type="text"
              value={form.addrDetail}
              onChange={(e) => setForm({...form, addrDetail: e.target.value})}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.defaultAddr}
              onChange={(e) =>
                setForm({...form, defaultAddr: e.target.checked})
              }
              id="defaultAddr"
            />
            <label htmlFor="defaultAddr">기본 배송지로 설정</label>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              {isEdit ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
