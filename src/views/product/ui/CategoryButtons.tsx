import React from "react";

const categories = ['카테고리', '성별', '색상', '가격', '사이즈', '브랜드'];

interface CategoryButtonsProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ isFilterOpen, setIsFilterOpen }) => {
  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-300 flex-shrink-0"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
