'use client';

import {useState} from 'react';
import Image from 'next/image';
import {SlidersHorizontal} from 'lucide-react';
import FilterSidebar from '../../src/views/product/FilterSidebar';
// import FilterSidebar from '';

const categories = ['아우터', '상의', '바지', '원피스/스커트', '패션소품'];

const products = [
  {
    id: 1,
    image: '/src/assets/images/default.webp',
    brand: '대화우스토',
    name: '트와일 롱플리츠 스커트 [3COLORS]',
    discount: 42,
    price: '58,335',
  },
  {
    id: 2,
    image: '/src/assets/images/default.webp',
    brand: '제이청',
    name: 'Rare Tweed Jacket_Bitter Black',
    discount: 31,
    price: '238,325',
  },
  {
    id: 3,
    image: '/src/assets/images/default.webp',
    brand: '크리스틴',
    name: '[단독]HILDA BOOTS_Scolor',
    discount: 57,
    price: '148,526',
  },
  {
    id: 4,
    image: '/src/assets/images/default.webp',
    brand: '플로트루오',
    name: '[Drama Signature] Two-button Blazer',
    discount: 23,
    price: '168,245',
  },
  {
    id: 5,
    image: '/src/assets/images/default.webp',
    brand: '단스토',
    name: '[단독]UNISEX LEATHER LOGO SWEAT',
    discount: 5,
    price: '75,050',
  },
  {
    id: 6,
    image: '/src/assets/images/default.webp',
    brand: '인지웨터베일',
    name: 'Shearing Fleece Jacket 아이보리',
    discount: 23,
    price: '245,837',
  },
  {
    id: 7,
    image: '/src/assets/images/default.webp',
    brand: '대화우스토',
    name: '트와일 롱플리츠 스커트 [3COLORS]',
    discount: 42,
    price: '58,335',
  },
  {
    id: 8,
    image: '/src/assets/images/default.webp',
    brand: '제이청',
    name: 'Rare Tweed Jacket_Bitter Black',
    discount: 31,
    price: '238,325',
  },
  {
    id: 9,
    image: '/src/assets/images/default.webp',
    brand: '크리스틴',
    name: '[단독]HILDA BOOTS_Scolor',
    discount: 57,
    price: '148,526',
  },
  {
    id: 10,
    image: '/src/assets/images/default.webp',
    brand: '플로트루오',
    name: '[Drama Signature] Two-button Blazer',
    discount: 23,
    price: '168,245',
  },
  {
    id: 11,
    image: '/src/assets/images/default.webp',
    brand: '단스토',
    name: '[단독]UNISEX LEATHER LOGO SWEAT',
    discount: 5,
    price: '75,050',
  },
  {
    id: 12,
    image: '/src/assets/images/default.webp',
    brand: '인지웨터베일',
    name: 'Shearing Fleece Jacket 아이보리',
    discount: 23,
    price: '245,837',
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('아우터');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="px-6">
      {/* 필터 버튼 */}
      <div className="flex items-center justify-between mt-6">
        <button
          className="border border-gray-300 px-4 py-2 rounded-lg text-sm flex items-center"
          onClick={() => setIsFilterOpen(true)}
        >
          필터 <SlidersHorizontal className="ml-2 w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 상품 리스트 */}
      <div className="grid grid-cols-6 gap-2 mt-6">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={250}
              height={300}
            />
            <button className="flex flex-col items-start w-full overflow-hidden">
              <p className="text-left mt-1 text-sm font-semibold">
                {product.brand}
              </p>
              <p className="text-left text-sm text-gray-500 truncate w-full">
                {product.name}
              </p>
              <p className="text-left text-black-500 font-semibold">
                {product.price}원
              </p>
            </button>
          </div>
        ))}
      </div>

      {isFilterOpen && <FilterSidebar setIsOpen={setIsFilterOpen} />}
    </div>
  );
}
