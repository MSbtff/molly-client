import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import FilterSidebar from '../FilterSidebar';
import SortModal from '../SortModal';
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

export default function Product() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; //api 서버 주소
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL; //이미지 서버 주소
  const productApiUrl = `${baseUrl}/product`; // 상품 목록 API 엔드포인트

  const [isFilterOpen, setIsFilterOpen] = useState(false);//필터 모달창 열림 상태

  const [selectedSort, setSelectedSort] = useState("조회순");//현재 선택된 정렬
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);//정렬 모달창 열림 상태(반응형 시)


  //상품 목록 api
  const [productList, setProductList] = useState<Product[]>([]);//상품 목록 데이터를 저장
  const [page, setPage] = useState(0); // 현재 api에서 불러온 페이지 번호
  const [isLast, setIsLast] = useState(false); // 마지막 페이지

  //무한스크롤
  const observerRef = useRef<IntersectionObserver | null>(null);//intersectionObserver 객체를 저장, 특정 요소가 화면에 보일 때 api를 호출
  const triggerRef = useRef<HTMLDivElement | null>(null);//스크롤이 끝에 도달했는지 감지하는 요소의 ref

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
    setProductList([]);
  };

  //품절 제외 체크박스 클릭 핸들러
  const handleExcludeSoldOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const params = new URLSearchParams(window.location.search); // 현재 URL 파라미터 가져오기

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

    setSelectedSort(Object.keys(sortOptions).find(key => sortOptions[key] === orderBy) || "조회순"); // UI에 표시할 한글 값 업데이트
    router.push(`/product?${params.toString()}`); // URL 변경 → useEffect 감지 후 API 요청됨
  };
  //특정 상품 클릭 시 url 변경
  const handleProductClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  useEffect(() => {
    const paramsString = searchParams.toString(); // 의존성 배열을 단순화

    const updatedFilters: Partial<typeof filters> = {};
    searchParams.forEach((value, key) => {
      if (value) {
        updatedFilters[key as keyof typeof filters] = value;
      }
    });

    setFilters(updatedFilters as typeof filters);
    resetPagination();
  }, [searchParams.toString()]); //searchParams 대신 paramsString 사용

  const fetchProductList = useCallback(async (nextPage: number) => {
    if (isLast) return;

    try {
      const params = new URLSearchParams();
      params.append("page", (nextPage ?? page).toString());
      params.append("size", "48");

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`${productApiUrl}?${params.toString()}`);
      if (!response.ok) throw new Error(`상품 목록 API 요청 실패: ${response.status}`);

      if (response.status === 204) {
        console.log("상품 목록이 없습니다.");
        return;
      }

      const data = await response.json();
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

      setPage((prev) => prev + 1);
      setIsLast(data.pageable.isLast);
    } catch (error) {
      console.error("상품 목록 API 요청 에러:", error);
    }
  }, [filters, isLast, page, productApiUrl]);

  //filters 변경 시 api 요청
  useEffect(() => {
    fetchProductList(page);
  }, [filters]);



  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      console.log("스크롤 감지 -> api 요청");

      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        console.log(`현재 페이지: ${prevPage}, 다음 페이지: ${nextPage}`);
        fetchProductList(nextPage);  // setPage 이후의 값을 사용
        return nextPage;
      });
    }
  }, [isLast, page, fetchProductList]);

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
  //triggerRef 요소가 화면에 나타나면 fetchProductList()를 호출해 새로운 데이터를 가져옴
  //rootMargin : 0px 0px -30% 는 화면

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

          {productList.map((item) => (
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
          ))}

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