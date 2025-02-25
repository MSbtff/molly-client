'use client';

import {useState} from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import {getProduct, updateProduct} from '../api/updateProduct';
import {SellerContainerProps} from './ProductRetriever';

type Product = {
  id: number;
  categories: string[];
  brandName: string;
  productName: string;
  price: number;
  description: string;
  items: {
    id: number;
    color: string;
    colorCode: string;
    size: string;
    quantity: number;
  }[];
};

export const ProductModify = ({productRes}: SellerContainerProps) => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [product, setProduct] = useState<Product>({
    id: 0,
    categories: [],
    brandName: '',
    productName: '',
    price: 0,
    description: '',
    items: [
      {
        id: 0,
        color: '',
        colorCode: '',
        size: '',
        quantity: 0,
      },
    ],
  });

  // 상품 선택 시 데이터 로드
  const handleProductSelect = async (productId: number) => {
    try {
      const data = await getProduct(productId);
      setProduct(data);
      setSelectedProduct(productId);
    } catch (error) {
      console.error(error);
    }
  };

  // 선택한 상품 정보 수정
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await updateProduct(selectedProduct, {
        categories: product.categories,
        brandName: product.brandName,
        productName: product.productName,
        price: product.price,
        description: product.description,
        items: product.items,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = () => {
    setProduct({
      ...product,
      items: [
        ...product.items,
        {
          id: product.items.length,
          color: '',
          colorCode: '',
          size: '',
          quantity: 0,
        },
      ],
    });
  };

  const handleItemChange = (
    index: number,
    field: keyof Product['items'][0],
    value: string | number
  ) => {
    const newItems = [...product.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setProduct({...product, items: newItems});
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>수정할 상품을 선택하세요</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>상품 ID</TableHead>
            <TableHead>상품명</TableHead>
            <TableHead>브랜드</TableHead>
            <TableHead>가격</TableHead>
            <TableHead>액션</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* 상품 목록을 매핑하여 표시 */}
          <TableRow
            key={product.id}
            className={selectedProduct === product.id ? 'bg-muted' : ''}
          >
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.productName}</TableCell>
            <TableCell>{product.brandName}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              <button
                onClick={() => handleProductSelect(product.id)}
                className="text-primary hover:underline"
              >
                수정
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {selectedProduct && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={product.productName}
            onChange={(e) =>
              setProduct({...product, productName: e.target.value})
            }
            placeholder="상품명"
          />
          <input
            type="text"
            value={product.brandName}
            onChange={(e) =>
              setProduct({...product, brandName: e.target.value})
            }
            placeholder="브랜드명"
          />
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({...product, price: Number(e.target.value)})
            }
            placeholder="가격"
          />
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({...product, description: e.target.value})
            }
            placeholder="상품 설명"
          />
          {/* items 입력 폼 추가 */}
          <button type="submit">수정하기</button>
        </form>
      )}
    </div>
  );
};
