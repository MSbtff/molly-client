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
  const searchParams = useSearchParams(); //쿼리 파라미터 가져오기(현재url의 쿼리 파라미터 가져오기)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; //api 서버 주소
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL; //이미지 서버 주소
  const searchApiUrl = `${baseUrl}/search`; // 임시 검색 API 엔드포인트
  const productApiUrl = `${baseUrl}/product`; // 상품 목록 API 엔드포인트


  // const keyword = searchParams.get("keyword") || ""; //쿼리 파라미터 가져오기
  // const category = searchParams.get("categories") || "";

  const [products, setProducts] = useState<Product[]>([]); //검색어 또는 필터링 조건에 따라 api에서 가져온 상품 목록을 저장
  const [selectedSort, setSelectedSort] = useState("추천순");//현재 선택된 정렬 기준
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);//정렬 모달창 열림 상태(반응형)
  const [isFilterOpen, setIsFilterOpen] = useState(false);//필터 모달창 열림 상태
  //필터를 객체로 관리
  const [filters, setFilters] = useState({
    keyword: '',
    categories: '',
    colorCode: '',
    productSize: '',
    brandName: '',
    priceGoe: '',
    priceLt: '',
  });

  //url의 쿼리 파라미터가 변경될 때마다 filters 상태 업데이트
  useEffect(() => {
    const updatedFilters: Partial<typeof filters> = {}; // 새로운 필터링 객체

    searchParams.forEach((value, key) => {
      if (value) { //값이 있는 필터만 저장
        updatedFilters[key as keyof typeof filters] = value;
      }
    });

    setFilters(updatedFilters as typeof filters);
  }, [searchParams]); // searchParams가 변경될 때 실행

  useEffect(() => {
    fetchProducts();
  }, [filters]);


  //api 요청 분기 처리
  const fetchProducts = async () => {
    try {
      let response;
      const params = new URLSearchParams();

      // 검색어 api 엔드포인트
      if (filters.keyword?.trim()) {

        params.append("keyword", filters.keyword);
        response = await fetch(`${searchApiUrl}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`api 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.item || []);
        console.log("API 요청 성공:", data);

        // 다음 페이지 요청을 위해 cursorId와 lastCreatedAt 저장
        if (!data.isLastPage) {
          setFilters(prev => ({
              ...prev,
              cursorId: data.nextCursorId,
              lastCreatedAt: data.nextLastCreatedAt
          }));
      }
        return; // 상품 목록 api 요청 방지
        
      } else {
        // 상품 목록 API 요청 (keyword가 없는 경우)
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        params.append("page", "0");
        params.append("size", "48");
        response = await fetch(`${productApiUrl}?${params.toString()}`);

        if (!response.ok) throw new Error(`상품 데이터 요청 실패: ${response.status}`);

        const data = await response.json();
        const formattedData = data.data.map((item: Product) => ({
          id: item.id,
          url: item.thumbnail.path ? `${item.thumbnail.path}` : "/images/noImage.svg",
          brandName: item.brandName,
          productName: item.productName,
          price: item.price,
        }));

        setProducts(formattedData);
        console.log("API 요청 성공:", data);
      }

    } catch (error) {
      console.error("API 요청 에러:", error);
    }
  }



  //특정 상품 클릭 시 url 변경
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
            <input type="checkbox" id="exclude-sold-out" className="w-4 h-4" />품절 제외</label>
        </div>

        {/* 정렬 : 큰 화면에서 정렬 버튼 전체 표시 */}
        <div className="hidden md:flex gap-4">
          {["조회순", "신상품순", "판매순", "낮은가격순", "높은가격순", "리뷰순"].map((sort) => (
            <button key={sort}
              className="text-gray-500 hover:underline hover:text-black"
              onClick={() => console.log(sort + " 정렬")}
            >{sort}
            </button>
          ))}
        </div>
        {/* 정렬 : 작은 화면에서는 단일 버튼으로 변경 */}
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
                // src="/images/noImage.svg"

                src={`${imageUrl}${item.url}`}
                alt={item.productName}
                width={250}
                height={300}
                className="w-full h-auto object-contain cursor-pointer"
                onClick={() => handleProductClick(item.id)}
              />
              <button className="flex flex-col items-start w-full overflow-hidden"
                onClick={() => handleProductClick(item.id)}
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
