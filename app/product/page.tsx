'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import FilterSidebar from '../../src/views/product/FilterSidebar';
import SortModal from '../../src/views/product/SortModal';
import Navbar from '@/widgets/navbar/Navbar';
import Footer from '@/widgets/Footer';
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

  // const [products, setProducts] = useState<Product[]>([]); //검색어 또는 필터링 조건에 따라 api에서 가져온 상품 목록을 저장
  const [selectedSort, setSelectedSort] = useState("조회순");//현재 선택된 정렬 기준
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);//정렬 모달창 열림 상태(반응형)
  const [isFilterOpen, setIsFilterOpen] = useState(false);//필터 모달창 열림 상태
  // const [imageError, setImageError] = useState(false);

  //일반 상품 목록 api
  const [productList, setProductList] = useState<Product[]>([]);//상품 목록
  const [page, setPage] = useState(0); // 상품 목록 api 페이지 번호
  const [isLast, setIsLast] = useState(false); // 상품 목록 API 마지막 페이지 여부

  //검색 api
  const [searchList, setSearchList] = useState<Product[]>([]); //검색 상품 목록
  const [cursorId, setCursorId] = useState<number | null>(null); // 검색 API 커서 ID
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null); // 검색 API 마지막 생성 시간
  const [isLastPage, setIsLastPage] = useState(false); // 검색 API 마지막 페이지 여부

  //무한스크롤
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  //필터를 객체로 관리
  const [filters, setFilters] = useState({
    keyword: '',
    categories: '',
    colorCode: '',
    productSize: '',
    brandName: '',
    priceGoe: '',
    priceLt: '',
    excludeSoldOut: '',
  });
  // 정렬 옵션 매핑 (한글 → API 값)
  const sortOptions: Record<string, string> = {
    "조회순": "VIEW_COUNT",
    "신상품순": "CREATED_AT",
    "판매순": "PURCHASE_COUNT",
    "낮은가격순": "PRICE_ASC",
    "높은가격순": "PRICE_DESC"
  };
  //필터 변경 시 페이지네이션 초기화
  const resetPagination = () => {
    setPage(0);
    setIsLast(false);
    setCursorId(null);
    setLastCreatedAt(null);
    setIsLastPage(false);
    setSearchList([]);
    setProductList([]);
  };

  //url의 쿼리 파라미터가 변경될 때마다 filters 상태 업데이트
  useEffect(() => {
    const updatedFilters: Partial<typeof filters> = {}; // 새로운 필터링 객체

    searchParams.forEach((value, key) => {
      if (value) { //값이 있는 필터만 저장
        updatedFilters[key as keyof typeof filters] = value;
      }
    });

    setFilters(updatedFilters as typeof filters);
    resetPagination();
  }, [searchParams.toString()]); // searchParams가 변경될 때

  //filters 변경 시 api 요청
  useEffect(() => {
    // fetchProducts();
    // resetPagination(); // 기존 데이터 초기화 (검색 또는 필터 변경 시 필요)

    if (filters.keyword?.trim()) {
      fetchSearchResults();
    } else {
      fetchProductList(page);
      // if (page === 0 && productList.length === 0) {  // 중복 호출 방지
      //   fetchProductList(0);
      // }
    }
  }, [filters]);

  //품절 제외 체크박스 클릭 핸들러
  const handleExcludeSoldOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const params = new URLSearchParams(window.location.search); // 현재 URL 파라미터 가져오기
    // setExcludeSoldOut(checked);

    // 현재 URL의 검색어 & 카테고리 유지하면서 excludeSoldOut 값 추가
    // const params = new URLSearchParams(window.location.search);
    if (checked) {
      params.set("excludeSoldOut", "true");
    } else {
      params.delete("excludeSoldOut");
    }

    router.push(`/product?${params.toString()}`); // URL 변경
  };
  // 정렬 버튼 클릭 핸들러
  const handleSortChange = (sortLabel: string) => {
    const orderBy = sortOptions[sortLabel]; // 한글 → API 값 변환

    if (!orderBy) {
      console.log("정렬 값이 한글로 변환되지 않았음");
      return; // 만약 변환이 실패하면 실행하지 않음
    }

    const params = new URLSearchParams(window.location.search);

    params.set("orderBy", orderBy); // 선택한 정렬 기준 추가
    params.set("page", "0"); // 첫 페이지부터 요청

    // setSelectedSort(sortLabel); // 선택된 정렬 상태 업데이트
    setSelectedSort(Object.keys(sortOptions).find(key => sortOptions[key] === orderBy) || "조회순"); // UI에 표시할 한글 값 업데이트
    router.push(`/product?${params.toString()}`); // URL 변경 → useEffect 감지 후 API 요청됨
  };
  //특정 상품 클릭 시 url 변경
  const handleProductClick = (id: number) => {
    // router.push(`/detail?productId=${id}`);
    router.push(`/detail/${id}`);
  };

  const fetchSearchResults = async () => {
    if (isLastPage) return;

    try {
      const params = new URLSearchParams();
      if (cursorId) params.append("cursorId", cursorId.toString());
      if (lastCreatedAt) params.append("lastCreatedAt", lastCreatedAt);
      params.append("keyword", filters.keyword);

      const response = await fetch(`${searchApiUrl}?${params.toString()}`);
      if (!response.ok) throw new Error(`검색 API 요청 실패: ${response.status}`);

      const data = await response.json();
      console.log("검색 API 요청 성공:", data);


      setSearchList((prev) => {
        // ...prev,
        // ...data.item.filter((newItem: Product) => !prev.some((item) => item.id === newItem.id)),
        if (page === 0) return data.item; // 첫 페이지면 기존 데이터 리셋
        return [...prev, ...data.item]; // 다음 페이지 데이터 추가
      });

      //다음 페이지 요청을 위한 데이터 업데이트
      setCursorId(data.nextCursorId);
      setLastCreatedAt(data.nextLastCreatedAt);
      setIsLastPage(data.isLastPage);
    } catch (error) {
      console.error("검색 api 요청 에러:", error);
    }
  };

  //상품 api 요청
  const fetchProductList = async (nextPage: number) => {
    if (isLast) return;

    try {
      const params = new URLSearchParams();
      params.append("page", (nextPage ?? page).toString());
      params.append("size", "80");

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`${productApiUrl}?${params.toString()}`);
      if (!response.ok) throw new Error(`상품 목록 API 요청 실패: ${response.status}`);

      if (response.status === 204) {
        console.log(" 상품 목록이 없습니다.");
        return;  // 빈 데이터이므로 API 요청 종료
      }

      const data = await response.json();
      // console.log("데이터 로그:", data);
      console.log(`상품 목록 API 요청 성공(page: ${nextPage ?? page}):`, data);

      const formattedData = data.data.map((item: Product) => ({
        id: item.id,
        url: item.thumbnail?.path,
        brandName: item.brandName,
        productName: item.productName,
        price: item.price,
      }));

      setProductList((prev) => [
        ...prev,
        ...formattedData.filter((newItem: Product) => !prev.some((item) => item.id === newItem.id)),
      ]);

      console.log("formattedData.url", formattedData[0].url);
      setPage((prev) => prev + 1);
      setIsLast(data.pageable.isLast);
    } catch (error) {
      console.error("상품 목록 API 요청 에러:", error);
    }
  };

  //intersection observer 설정
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      console.log("스크롤 감지 -> api 요청");
      // fetchProducts();

      // if (filters.keyword?.trim() && !isLastPage) {
      //   fetchSearchResults();
      // } else if (!filters.keyword?.trim() && !isLast) {
      //   fetchProductList(page + 1);
      // }
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        console.log(`현재 페이지: ${prevPage}, 다음 페이지: ${nextPage}`);

        if (filters.keyword?.trim() && !isLastPage) {
          fetchSearchResults();
        } else if (!filters.keyword?.trim() && !isLast) {
          fetchProductList(nextPage);  // setPage 이후의 값을 사용
        }

        return nextPage;
      });
    }
  }, [cursorId, lastCreatedAt, isLastPage, isLast]);

  useEffect(() => {
    if (!triggerRef.current) return;

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null, // 뷰포트 기준
      rootMargin: '0px 0px -30%', // viewport의 80% 도달 시 실행
      threshold: 0.1, // 요소가 10%만 보여도 실행
    });

    observerRef.current.observe(triggerRef.current);

    return () => observerRef.current?.disconnect();
  }, [observerCallback]);

  return (
    <>
      <Navbar />
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
              <input type="checkbox" id="exclude-sold-out" className="w-4 h-4"
                onChange={handleExcludeSoldOutChange}
                checked={!!searchParams.get("excludeSoldOut")} // URL의 파라미터 값에 따라 체크 여부 결정
              /> 품절 제외
            </label>
          </div>

          {/* 정렬 : 큰 화면에서 정렬 버튼 전체 표시 */}
          <div className="hidden md:flex gap-4">
            {Object.keys(sortOptions).map((label) => (
              <button key={label}
                className={`hover:underline hover:text-black ${selectedSort === label ? "text-black underline" : "text-gray-500"
                  }`}
                onClick={() => handleSortChange(label)} // 한글 → API 값 변환 후 요청
              >
                {label}
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

          {filters.keyword?.trim() ? (
            searchList.length > 0 ? (
              searchList.map((item) => (
                <div key={item.id} className="flex flex-col items-center mt-10">
                  <Image
                    // src={imageError ? "/images/noImage.svg" : `${imageUrl}${item.url}`}
                    src={`${imageUrl}${item.url}`}
                    // src={`${imageUrl}${item.url}`}
                    alt={item.productName}
                    width={250}
                    height={300}
                    className="w-full h-auto object-contain cursor-pointer"
                    onClick={() => handleProductClick(item.id)}
                  // onError={() => setImageError(true)}
                  />
                  <button className="flex flex-col items-start w-full overflow-hidden" onClick={() => handleProductClick(item.id)}>
                    <p className="text-left mt-1 text-sm font-semibold">{item.brandName}</p>
                    <p className="text-left text-sm text-gray-500 truncate w-full">{item.productName}</p>
                    <p className="text-left text-black-500 font-semibold">{item.price.toLocaleString()}원</p>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-9">검색된 상품이 없습니다. 검색어를 변경해 보세요.</p>
            )
          ) : (
            productList.map((item) => (
              <div key={item.id} className="flex flex-col items-center mt-10">
                <Image
                  // src={imageError ? "/images/noImage.svg" : `${imageUrl}${item.url}`}

                  src={`${imageUrl}${item.url}`}
                  // src={`${imageUrl}${item.url || "/images/noImage.svg"}`}
                  alt={item.productName}
                  width={250}
                  height={300}
                  className="w-full h-auto object-contain cursor-pointer"
                  onClick={() => handleProductClick(item.id)}
                // onError={() => setImageError(true)}
                />
                <button className="flex flex-col items-start w-full overflow-hidden" onClick={() => handleProductClick(item.id)}>
                  <p className="text-left mt-1 text-sm font-semibold">{item.brandName}</p>
                  <p className="text-left text-sm text-gray-500 truncate w-full">{item.productName}</p>
                  <p className="text-left text-black-500 font-semibold">{item.price.toLocaleString()}원</p>
                </button>
              </div>
            ))
          )}

          {/* intersection observer로 감지할 요소. 스크롤 80% 넘어가면 api 요청 */}
          <div ref={triggerRef} className="h-20 w-full"></div>

        </div>

        {isFilterOpen && <FilterSidebar setIsOpen={setIsFilterOpen} />}
        <SortModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)}
          onSortSelect={(sort) => handleSortChange(sort)} selectedSort={selectedSort} />
      </div>
      <Footer />
    </>
  );
}
