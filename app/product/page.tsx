'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import FilterSidebar from '../../src/views/product/FilterSidebar';
import SortModal from '../../src/views/product/SortModal';

interface Product {
  productId: number;
  url: string;
  brandName: string;
  productName: string;
  price: number;
}
const categories = ['카테고리', '성별', '색상', '가격', '사이즈', '브랜드'];

// const baseProducts = [
//   {
//     id: 1,
//     image: '/src/assets/images/default.webp',
//     brand: '대화우스토',
//     name: '트와일 롱플리츠 스커트 [3COLORS]',
//     discount: 42,
//     price: '58,335',
//   },
//   {
//     id: 2,
//     image: '/src/assets/images/default.webp',
//     brand: '제이청',
//     name: 'Rare Tweed Jacket_Bitter Black',
//     discount: 31,
//     price: '238,325',
//   },
//   {
//     id: 3,
//     image: '/src/assets/images/default.webp',
//     brand: '크리스틴',
//     name: '[단독]HILDA BOOTS_Scolor',
//     discount: 57,
//     price: '148,526',
//   },
//   {
//     id: 4,
//     image: '/src/assets/images/default.webp',
//     brand: '플로트루오',
//     name: '[Drama Signature] Two-button Blazer',
//     discount: 23,
//     price: '168,245',
//   },
//   {
//     id: 5,
//     image: '/src/assets/images/default.webp',
//     brand: '단스토',
//     name: '[단독]UNISEX LEATHER LOGO SWEAT',
//     discount: 5,
//     price: '75,050',
//   },
//   {
//     id: 6,
//     image: '/src/assets/images/default.webp',
//     brand: '인지웨터베일',
//     name: 'Shearing Fleece Jacket 아이보리',
//     discount: 23,
//     price: '245,837',
//   },
//   {
//     id: 7,
//     image: '/src/assets/images/default.webp',
//     brand: '대화우스토',
//     name: '트와일 롱플리츠 스커트 [3COLORS]',
//     discount: 42,
//     price: '58,335',
//   },
//   {
//     id: 8,
//     image: '/src/assets/images/default.webp',
//     brand: '제이청',
//     name: 'Rare Tweed Jacket_Bitter Black',
//     discount: 31,
//     price: '238,325',
//   },
//   {
//     id: 9,
//     image: '/src/assets/images/default.webp',
//     brand: '크리스틴',
//     name: '[단독]HILDA BOOTS_Scolor',
//     discount: 57,
//     price: '148,526',
//   },
//   {
//     id: 10,
//     image: '/src/assets/images/default.webp',
//     brand: '플로트루오',
//     name: '[Drama Signature] Two-button Blazer',
//     discount: 23,
//     price: '168,245',
//   },
//   {
//     id: 11,
//     image: '/src/assets/images/default.webp',
//     brand: '단스토',
//     name: '[단독]UNISEX LEATHER LOGO SWEAT',
//     discount: 5,
//     price: '75,050',
//   },
//   {
//     id: 12,
//     image: '/src/assets/images/default.webp',
//     brand: '인지웨터베일',
//     name: 'Shearing Fleece Jacket 아이보리',
//     discount: 23,
//     price: '245,837',
//   },
// ];
// const mockProducts = Array.from({ length: 2000 }).map((_, i) => {
//   const baseProduct = baseProducts[i % baseProducts.length];
//   return {
//     id: i + 1,
//     image: baseProduct.image,
//     brand: baseProduct.brand,
//     name: `${baseProduct.name} - ${i + 1}`,
//     discount: baseProduct.discount,
//     price: baseProduct.price,
//   };
// });

export default function Products() {
  const searchParams = useSearchParams(); //url 파라미터 가져오기
  const keyword = searchParams.get("keyword") || "";//검색어 추출
  const category = searchParams.get("categories") || "";
  const [product, setProduct] = useState<Product[]>([]); //타입 명시하지 않으면 ts가 never로 추론함
  const [productMen, setProductMen] = useState<Product[]>([]);

  const [isSortModalOpen, setIsSortModalOpen] = useState(false);//정렬 모달창
  const [selectedSort, setSelectedSort] = useState("추천순");//정렬 상태 저장
  const [isFilterOpen, setIsFilterOpen] = useState(false);//필터 모달창

  //무한스크롤
  const [rows, setRows] = useState(8); //처음에는 8개의 행(row)만 렌더링
  const [loading, setLoading] = useState(false); //로딩 방지
  // const itemsPerRow = 6; //한 행에 6개의 상품
  // const products = mockProducts.slice(0, rows * itemsPerRow); //`rows * 6` 만큼 상품을 가져오기

  //네비 바에서 남성 클릭 시 카테고리=남성 으로 api 요청
  useEffect(() => {
    if (category) {
      fetchMen(category);
    }
  }, [category]);

  const fetchMen = async (category: string) => {
    const apiUrl = `http://3.35.175.203:8080/product`;
    const params = new URLSearchParams({
      categories: category,
    });

    try {
      const response = await fetch(`${apiUrl}?${params.toString()}`);
      if (!response.ok) throw new Error("상품 데이터 요청 실패");

      const data: Product[] = await response.json();
      console.log("상품 데이터 요청 성공:", data);
      setProductMen(data);
    } catch (error) {
      console.error("API 요청 에러:", error);
    }
  };


  //검색어 api 요청
  useEffect(() => {
    if (keyword.trim()) {
      fetchProducts(keyword);
    }
  }, [keyword]);
  const fetchProducts = async (keyword: string) => {
    const apiUrl = `http://172.16.24.72:8080/search`;
    const params = new URLSearchParams({
      keyword,
      pageable: JSON.stringify({ page: 0, size: 48, sort: ["price,desc"] }),
    });

    try {
      const response = await fetch(`${apiUrl}?${params.toString()}`);
      if (!response.ok) throw new Error("검색 api 요청 실패");

      const data: Product[] = await response.json();
      console.log("검색 api 요청 성공:", data);
      setProduct(data);
    } catch (error) {
      console.error("검색 api 요청 에러:", error);
    }
  }

  //무한 스크롤 로드 함수
  const loadMoreRows = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setRows((prev) => prev + 8); //기존 행 수 +8 (한 번에 8행 추가)
      setLoading(false);
    }, 500); //가짜 로딩 시간
  };
  //스크롤 이벤트 감지 (60이상% 내려가면 데이터 로드)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight; // 전체 문서 높이
      const scrollTop = document.documentElement.scrollTop; // 현재 스크롤 위치
      const clientHeight = window.innerHeight; // 보이는 화면 높이
      const scrollPosition = (scrollTop + clientHeight) / scrollHeight; // 현재 스크롤 비율

      if (scrollPosition >= 0.8) {
        loadMoreRows();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // 정리(cleanup)
  }, [rows, loading]);



  return (
    <div className="px-20 mt-10">
      {/* 카테고리 버튼 */}
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            className={"px-4 py-2 rounded-full text-sm bg-gray-100 hover:bg-gray-300 flex-shrink-0"}
            onClick={() => setIsFilterOpen(true)}
          >{category}
          </button>
        ))}
      </div>
      {/* 품절 체크박스, 정렬 */}
      <div className="flex items-center justify-between mt-6">

        <div className='flex itmes-center gap-2'>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" id="exclude-sold-out" className="w-4 h-4" />품절 제외
          </label>
        </div>
        {/* <div className='flex gap-4 text-sm text-gray-700'>
          {["추천순", "신상품순", "판매순", "낮은가격순", "높은가격순", "리뷰순"].map((sort) => (
            <button
              key={sort}
              className="hover:underline"
              onClick={() => console.log(sort + " 정렬")}
            > */}
        {/* 큰 화면에서 정렬 버튼 전체 표시 */}
        <div className="hidden md:flex gap-4">
          {["추천순", "신상품순", "판매순", "낮은가격순", "높은가격순", "리뷰순"].map((sort) => (
            <button
              key={sort}
              className="hover:underline"
              onClick={() => console.log(sort + " 정렬")}
            >
              {sort}

            </button>
          ))}
        </div>

        {/* 작은 화면에서는 단일 버튼으로 변경 */}
        <button
          className="md:hidden hover:underline"
          onClick={() => setIsSortModalOpen(true)}
        >{selectedSort}</button>
      </div>

      {/* 상품 리스트 */}
      <div className="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2  gap-2 mt-1">
        {/* {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center mt-10">
            <Image
              src={product.image}
              alt={product.name}
              width={250}
              height={300}
              className="w-full h-auto object-contain"
            // layout="responsive"
            />
            <button className="flex flex-col items-start w-full overflow-hidden">
              <p className="text-left mt-1 text-sm font-semibold">{product.brand}</p>
              <p className="text-left text-sm text-gray-500 truncate w-full">product.name} </p>
              <p className="text-left text-black-500 font-semibold">{product.price}원</p>
            </button>
          </div>
        ))} */}

        {/*검색어 입력 시 결과 렌더링*/}
        {product.length > 0 ? (
          product.map((item) => (
            <div key={item.productId} className="flex flex-col items-center mt-10">
              <Image
                src={item.url ? item.url : "/noImage.svg"} //API 응답 필드명 확인 (product.image → item.url)
                alt={item.productName}
                width={250}
                height={300}
                className="w-full h-auto object-contain"
              />
              <button className="flex flex-col items-start w-full overflow-hidden">
                <p className="text-left mt-1 text-sm font-semibold">{item.brandName}</p>
                <p className="text-left text-sm text-gray-500 truncate w-full">{item.productName}</p>
                <p className="text-left text-black-500 font-semibold">{item.price.toLocaleString()}원</p>
              </button>
            </div>
          ))
        ) : (
          <div className="mt-9">
            <p className="text-gray-500">검색된 상품이 없습니다.</p>
            <p className="text-gray-500">검색어를 변경해 보세요.</p>
          </div>
        )}

        {/*네비바에서 클릭 시 결과 렌더링*/}

      </div>

      {isFilterOpen && <FilterSidebar setIsOpen={setIsFilterOpen} />}
      <SortModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)}
        onSortSelect={setSelectedSort} selectedSort={selectedSort} />
    </div>
  );
}
