"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { getProduct, updateProduct } from "../api/updateProduct";
import { SellerContainerProps } from "./ProductRetriever";

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

export const ProductModify = ({ productRes }: SellerContainerProps) => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [originalProduct, setOriginalProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 상품 선택 시 데이터 로드
  const handleProductSelect = async (productId: number) => {
    setError(null);
    try {
      const data = await getProduct(productId);
      console.log("불러온 상품 데이터:", data);
      setProduct(data);
      setOriginalProduct(data); // 원래 데이터 저장
      setSelectedProduct(productId);
    } catch (error) {
      console.error("상품 조회 오류:", error);
      setError("상품 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  // 선택한 상품 정보 수정
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !product) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 스웨거 스펙에 맞는 데이터 구조로 전송
      // items 필드 사용 (colorDetails가 아님)
      const updateData = {
        categories: product.categories,
        brandName: product.brandName,
        productName: product.productName,
        price: product.price,
        description: product.description,
        items: product.items,
      };

      console.log("전송할 데이터:", JSON.stringify(updateData, null, 2));

      await updateProduct(selectedProduct, updateData);

      // 성공 후 원본 데이터 업데이트
      setOriginalProduct(product);
      alert("상품이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("상품 수정 오류:", error);
      setError("상품 수정 중 오류가 발생했습니다. 개발자 콘솔을 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 수정 취소
  const handleCancel = () => {
    if (originalProduct) {
      setProduct(originalProduct);
      setError(null);
    }
  };

  // 상품 아이템 정보 수정
  const handleItemChange = (
    index: number,
    field: keyof Product["items"][0],
    value: string | number
  ) => {
    if (!product) return;
    const newItems = [...product.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === "quantity" || field === "id" ? Number(value) : value,
    };
    setProduct({ ...product, items: newItems });
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

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
              className={selectedProduct === product.id ? "bg-muted" : ""}
            >
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.brandName}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleProductSelect(product.id)}
                  className="hover:underline text-blue-500"
                  disabled={isSubmitting}
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
                    setProduct({ ...product, productName: e.target.value })
                  }
                  placeholder="상품명"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled={isSubmitting}
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
                    setProduct({ ...product, brandName: e.target.value })
                  }
                  placeholder="브랜드명"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled={isSubmitting}
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
                    setProduct({ ...product, price: Number(e.target.value) })
                  }
                  placeholder="가격"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled={isSubmitting}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  상품 설명
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  placeholder="상품 설명"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* 상품 아이템 정보 수정 부분 (옵션 편집) */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">상품 옵션</h3>
              <div className="mt-2 border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        색상
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        색상 코드
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        사이즈
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        수량
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {product.items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={item.color}
                            onChange={(e) =>
                              handleItemChange(index, "color", e.target.value)
                            }
                            className="w-full text-sm border-gray-300 rounded-md"
                            disabled={isSubmitting}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={item.colorCode}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "colorCode",
                                e.target.value
                              )
                            }
                            className="w-full text-sm border-gray-300 rounded-md"
                            disabled={isSubmitting}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={item.size}
                            onChange={(e) =>
                              handleItemChange(index, "size", e.target.value)
                            }
                            className="w-full text-sm border-gray-300 rounded-md"
                            disabled={isSubmitting}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                Number(e.target.value)
                              )
                            }
                            className="w-full text-sm border-gray-300 rounded-md"
                            disabled={isSubmitting}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                취소
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "처리 중..." : "수정하기"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
