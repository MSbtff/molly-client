"use client"

import React from "react";
interface SortModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSortSelect: (sort: string) => void;
    selectedSort: string;
  }

  const SortModal: React.FC<SortModalProps> = ({ isOpen, onClose, onSortSelect, selectedSort }) => {
  if (!isOpen) return null;

  // 정렬 옵션 매핑 (한글 → API 값)
  const sortOptions: Record<string, string> = {
    "조회순": "VIEW_COUNT",
    "신상품순": "CREATED_AT",
    "판매순": "PURCHASE_COUNT",
    "낮은가격순": "PRICE_ASC",
    "높은가격순": "PRICE_DESC"
  };

  return (
    <div onClick={onClose} className="fixed inset-0 flex items-end bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="w-full bg-white rounded-t-lg p-4">
        <ul className="mt-2">
          {Object.keys(sortOptions).map((label) => (
            <li
              key={label}
              className={`p-2 hover:bg-gray-200 cursor-pointer text-gray-400 ${
                label === selectedSort ? "font-bold text-black" : ""
              }`}
              onClick={() => {
                onSortSelect(label);
                onClose();
              }}
            >
              {label}
            </li>
          ))}

        </ul>
        <button onClick={onClose} className="w-full mt-4 py-2 bg-gray-300 rounded">
          닫기
        </button>
      </div>
    </div>
  );
};

export default SortModal;
