'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import FilterSidebar from '../../src/views/product/FilterSidebar';
import SortModal from '../../src/views/product/SortModal';

interface Thumbnail {
  path: string;
  filename: string;
}
interface Product {
  id: number;
  url: string;
  brandName: string;
  productName: string;
  price: number;
  thumbnail: Thumbnail;
}

const categories = ['카테고리', '성별', '색상', '가격', '사이즈', '브랜드'];

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams(); //url 파라미터 가져오기
  const keyword = searchParams.get("keyword") || "";//검색어 추출
  const category = searchParams.get("categories") || "";
  // const [product, setProduct] = useState<Product[]>([]); //타입 명시하지 않으면 ts가 never로 추론함
  // const [productMen, setProductMen] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]); //url 파라미터 처리를 하나의 상태로 통합

  const [isSortModalOpen, setIsSortModalOpen] = useState(false);//정렬 모달창
  const [selectedSort, setSelectedSort] = useState("추천순");//정렬 상태 저장
  const [isFilterOpen, setIsFilterOpen] = useState(false);//필터 모달창

  //무한스크롤
  const [rows, setRows] = useState(8); //처음에는 8개의 행(row)만 렌더링
  const [loading, setLoading] = useState(false); //로딩 방지
  // const itemsPerRow = 6; //한 행에 6개의 상품
  // const products = mockProducts.slice(0, rows * itemsPerRow); //`rows * 6` 만큼 상품을 가져오기

  //검색어 api 요청
  // useEffect(() => {
  //   if (keyword.trim()) {
  //     fetchProducts(keyword);
  //   }
  // }, [keyword]);
  // const fetchProducts = async (keyword: string) => {
  //   const apiUrl = `http://172.16.24.72:8080/search`;
  //   const params = new URLSearchParams({
  //     keyword,
  //     pageable: JSON.stringify({ page: 0, size: 48, sort: ["price,desc"] }),
  //   });

  //   try {
  //     const response = await fetch(`${apiUrl}?${params.toString()}`);
  //     if (!response.ok) throw new Error("검색 api 요청 실패");

  //     const data: Product[] = await response.json();
  //     console.log("검색 api 요청 성공:", data);
  //     setProduct(data);
  //   } catch (error) {
  //     console.error("검색 api 요청 에러:", error);
  //   }
  // }

  //api 호출 로직 통합 (검색어, 카테고리 클릭)
  const fetchProducts = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // .env에서 불러오기
    const apiUrl = `${baseUrl}/product`;

    try {
      let response;

      if (keyword.trim()) {
        const searchParams = new URLSearchParams({
          keyword,
          pageable: JSON.stringify({ page: 0, size: 48, sort: ["price,desc"] }),
        });
        response = await fetch(`http://172.16.24.72:8080/search?${searchParams}`);
        if (!response || !response.ok) {
          throw new Error(`상품 데이터 요청 실패: ${response?.status}`);
        }
        const data = await response.json();
        setProducts(data);
        console.log("API 요청 성공:", data);
      }

      else if (category) {
        const params = new URLSearchParams({
          categories: category,
          page: "0",
          size: "48",
        });
        response = await fetch(`${apiUrl}?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`상품 데이터 요청 실패: ${response.status}`);
        }
        const data = await response.json();
        const formattedData: Product[] = data.data.map((item: Product) => ({
          id: item.id,
          url: item.thumbnail?.path ?? "/noImage.svg",
          brandName: item.brandName,
          productName: item.productName,
          price: item.price,
        }));
        setProducts(formattedData);
        console.log("API 요청 성공:", data)
      }
    } catch (error) {
      console.error("API 요청 에러:", error);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [keyword, category]);

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

  //상품 클릭 시 url 변경
  const handleProductClick = (id: number) => {
    router.push(`/detail?productId=${id}`);
  };

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
        {/*검색어 입력 시 결과 렌더링*/}
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item.id} className="flex flex-col items-center mt-10">
              <Image
                //src={item.url || "/noImage.svg"} //API 응답 필드명 확인 (product.image → item.url)
                src="/images/noImage.svg"
                alt={item.productName}
                width={250}
                height={300}
                className="w-full h-auto object-contain cursor-pointer"
                onClick={() => handleProductClick(item.id)}
              />
              <button className="flex flex-col items-start w-full overflow-hidden"
                      onClick={()=>handleProductClick(item.id)}
              >
                <p className="text-left mt-1 text-sm font-semibold">{item.brandName}</p>
                <p className="text-left text-sm text-gray-500 truncate w-full">{item.productName}</p>
                <p className="text-left text-black-500 font-semibold">{item.price.toLocaleString()}원</p>
              </button>
            </div>
          ))
        ) : (
          <div className="mt-9">
            <p className="text-gray-500">검색된 상품이 없습니다. 검색어를 변경해 보세요.</p>
          </div>
        )}

      </div>

      {isFilterOpen && <FilterSidebar setIsOpen={setIsFilterOpen} />}
      <SortModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)}
        onSortSelect={setSelectedSort} selectedSort={selectedSort} />
    </div>
  );
}
