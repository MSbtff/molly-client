import React from "react";
interface ProductFiltersProps {
  selectedSort: string;
  sortOptions: Record<string, string>;
  handleExcludeSoldOutChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (sortLabel: string) => void;
  isSortModalOpen: boolean;
  setIsSortModalOpen: (isOpen: boolean) => void;
  searchParams: URLSearchParams;
}

const SortButtons: React.FC<ProductFiltersProps> = ({
  selectedSort,
  sortOptions,
  handleExcludeSoldOutChange,
  handleSortChange,
  setIsSortModalOpen,
  searchParams,
}) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            id="exclude-sold-out"
            className="w-4 h-4"
            onChange={handleExcludeSoldOutChange}
            checked={!!searchParams.get("excludeSoldOut")} //ui에 반영
          />
          품절 제외
        </label>
      </div>

      {/* 정렬 버튼 (큰 화면) */}
      <div className="hidden md:flex gap-4">
        {Object.keys(sortOptions).map((label) => (
          <button
            key={label}
            className={`hover:underline hover:text-black ${
              selectedSort === label ? "text-black underline" : "text-gray-500"
            }`}
            onClick={() => handleSortChange(label)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 정렬 버튼 (작은 화면) */}
      <button className="md:hidden hover:underline" 
              onClick={() => setIsSortModalOpen(true)}>
        {selectedSort}
      </button>
    </div>
  );
};

export default SortButtons;
