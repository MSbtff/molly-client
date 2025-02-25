'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

import Image from 'next/image';

export interface ProductData {
  id: number;
  categories: string[];
  brandName: string;
  productName: string;
  price: number;
  description: string;
  thumbnail?: {
    path: string;
    filename: string;
  };
}

export interface SellerContainerProps {
  productRes: {
    pageable: {
      size: number;
      hasNext: boolean;
      isFirst: boolean;
      isLast: boolean;
    };
    data: ProductData[];
  };
}

export const ProductRetriever = ({productRes}: SellerContainerProps) => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 초기 데이터 설정
    if (productRes?.data) {
      setProducts(productRes.data);
    }
  }, [productRes]);

  // 상품 목록 조회
  const fetchProducts = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.error('상품 조회 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 변경 시 API 호출
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // 상품 수정 페이지로 이동
  const handleEdit = (productId: number) => {
    router.push(`/seller/product/edit/${productId}`);
  };

  return (
    <div className="space-y-4">
      {/* 검색 입력창 */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="상품명 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
        <button
          onClick={() => fetchProducts()}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          검색
        </button>
      </div>

      {/* 상품 목록 테이블 */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Table>
          <TableCaption>상품 목록</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">상품 ID</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>브랜드</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  등록된 상품이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.thumbnail?.path}`}
                      alt={product.description}
                      width={50}
                      height={50}
                    />
                    {product.productName}
                  </TableCell>
                  <TableCell>{product.brandName}</TableCell>
                  <TableCell>{product.price.toLocaleString()}원</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-600 hover:underline"
                    >
                      수정
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
