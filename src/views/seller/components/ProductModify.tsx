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
  const [product, setProduct] = useState<Product | null>(null);
  const [originalProduct, setOriginalProduct] = useState<Product | null>(null);

  // 상품 선택 시 데이터 로드
  const handleProductSelect = async (productId: number) => {
    try {
      const data = await getProduct(productId);
      setProduct(data);
      setOriginalProduct(data); // 원래 데이터 저장
      setSelectedProduct(productId);
    } catch (error) {
      console.error(error);
    }
  };

  // 선택한 상품 정보 수정
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !product) return;

    try {
      await updateProduct(selectedProduct, {
        categories: product.categories,
        brandName: product.brandName,
        productName: product.productName,
        price: product.price,
        description: product.description,
        items: product.items,
      });
      alert('상품이 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  // 수정 취소
  const handleCancel = () => {
    if (originalProduct) {
      setProduct(originalProduct);
    }
  };

  // const handleAddItem = () => {
  //   if (!product) return;
  //   setProduct({
  //     ...product,
  //     items: [
  //       ...product.items,
  //       {
  //         id: product.items.length,
  //         color: '',
  //         colorCode: '',
  //         size: '',
  //         quantity: 0,
  //       },
  //     ],
  //   });
  // };

  // const handleItemChange = (
  //   index: number,
  //   field: keyof Product['items'][0],
  //   value: string | number
  // ) => {
  //   if (!product) return;
  //   const newItems = [...product.items];
  //   newItems[index] = {
  //     ...newItems[index],
  //     [field]: value,
  //   };
  //   setProduct({...product, items: newItems});
  // };

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
          {productRes.data.map((product) => (
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
                  className="hover:underline text-blue-500"
                >
                  수정하기
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedProduct && product && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">상품 수정</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  상품명
                </label>
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) =>
                    setProduct({...product, productName: e.target.value})
                  }
                  placeholder="상품명"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  브랜드명
                </label>
                <input
                  type="text"
                  value={product.brandName}
                  onChange={(e) =>
                    setProduct({...product, brandName: e.target.value})
                  }
                  placeholder="브랜드명"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  가격
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({...product, price: Number(e.target.value)})
                  }
                  placeholder="가격"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  상품 설명
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) =>
                    setProduct({...product, description: e.target.value})
                  }
                  placeholder="상품 설명"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                취소
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                수정하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
