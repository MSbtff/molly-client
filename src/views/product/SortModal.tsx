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

  return (
    <div className="fixed inset-0 flex items-end bg-black bg-opacity-50 z-50">
      <div className="w-full bg-white rounded-t-lg p-4">
        <ul className="mt-2">
          {["추천순", "신상품순", "판매순", "낮은가격순", "높은가격순", "리뷰순"].map((sort) => (
            <li
              key={sort}
              className={`p-2 hover:bg-gray-200 cursor-pointer ${
                sort === selectedSort ? "font-bold text-blue-500" : ""
              }`}
              onClick={() => {
                onSortSelect(sort);
                onClose();
              }}
            >
              {sort}
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
