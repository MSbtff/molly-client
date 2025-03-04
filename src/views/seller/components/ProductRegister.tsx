'use client';

import {useRef, useState} from 'react';
import {z} from 'zod';
import registerProduct from '../api/registerProduct';
import Image from 'next/image';

const productType = z.object({
  categories: z.tuple([
    z.enum(['남성', '여성', '키즈']),
    z.enum(['아우터', '상의', '하의', '액세사리']),
  ]),
  brandName: z.string().min(1, '브랜드명을 입력해주세요'),
  productName: z.string().min(1, '상품명을 입력해주세요'),
  price: z.number().min(1, '가격을 입력해주세요'),
  description: z.string().min(1, '상품 설명을 입력해주세요'),
  thumbnail: z.string(),
  productImages: z.array(z.string()),
  productDescriptionImages: z.array(z.string()),
  items: z.array(
    z.object({
      id: z.nullable(z.number()),
      color: z.string().min(1, '색상을 입력해주세요'),
      colorCode: z.string(),
      size: z.string(),
      quantity: z.number(),
    })
  ),
});

type Product = z.infer<typeof productType>;
type MainCategory = z.infer<typeof productType>['categories'][0];
type SubCategory = z.infer<typeof productType>['categories'][1];

export const ProductRegister = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const thumbnailRef = useRef<HTMLInputElement>(null);
  const productImagesRef = useRef<HTMLInputElement>(null);
  const descriptionImagesRef = useRef<HTMLInputElement>(null);

  const [product, setProduct] = useState<Product>({
    categories: ['남성', '아우터'] as [MainCategory, SubCategory],
    brandName: '',
    productName: '',
    price: 0,
    description: '',
    thumbnail: '',
    productImages: [],
    productDescriptionImages: [],
    items: [
      {
        id: null,
        color: '',
        colorCode: '',
        size: '',
        quantity: 0,
      },
    ],
  });

  const handleProductChange = (key: string, value: string | number) => {
    setProduct((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const handleCategoryChange = (
    index: number,
    value: MainCategory | SubCategory
  ) => {
    setProduct((prev) => ({
      ...prev,
      categories: prev.categories.map((cat, i) =>
        i === index ? value : cat
      ) as [MainCategory, SubCategory],
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'thumbnail' | 'productImages' | 'productDescriptionImages'
  ) => {
    const files = e.target.files;
    if (!files) return;

    // 파일을 선택하면 미리보기만 보여주도록 수정
    const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file));

    setProduct((prev) => ({
      ...prev,
      [type]: type === 'thumbnail' ? fileUrls[0] : [...prev[type], ...fileUrls],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const validationResult = productType.safeParse(product);
      if (!validationResult.success) {
        console.error(
          '입력 데이터가 유효하지 않습니다:',
          validationResult.error.errors
        );
        return;
      }

      const formData = new FormData();
      const productData = {
        categories: validateData.categories,
        brandName: validateData.brandName,
        productName: validateData.productName,
        price: validateData.price,
        description: validateData.description,
        items: validateData.items,
      };

      formData.append('product', JSON.stringify(productData));

      // 이미지 파일들 추가
      if (thumbnailRef.current?.files?.[0]) {
        formData.append('thumbnail', thumbnailRef.current.files[0]);
      }

      if (productImagesRef.current?.files) {
        Array.from(productImagesRef.current.files).forEach((file) => {
          formData.append('productImages', file);
        });
      }

      if (descriptionImagesRef.current?.files) {
        Array.from(descriptionImagesRef.current.files).forEach((file) => {
          formData.append('productDescriptionImages', file);
        });
      }

      // fetch로 formData 전송
      const res = await registerProduct(formData);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(product);

  // items 관련 핸들러 함수 추가
  const handleAddItem = () => {
    setProduct((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: null,
          color: '',
          colorCode: '',
          size: '',
          quantity: 0,
        },
      ],
    }));
  };

  const handleItemChange = (
    index: number,
    key: keyof (typeof product.items)[0],
    value: string | number
  ) => {
    setProduct((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? {...item, [key]: value} : item
      ),
    }));
  };

  const handleRemoveItem = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleRemoveImage = (
    type: 'productImages' | 'productDescriptionImages',
    index: number
  ) => {
    setProduct((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="rounded-xl bg-muted/50 p-6">
        <h2 className="text-2xl font-bold mb-6">상품 등록</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">상품명</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="상품명을 입력하세요"
                ref={ref}
                onChange={(e) =>
                  handleProductChange('productName', e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">브랜드명</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="브랜드명을 입력하세요"
                ref={ref}
                onChange={(e) =>
                  handleProductChange('brandName', e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">가격</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                placeholder="가격을 입력하세요"
                ref={ref}
                onChange={(e) =>
                  handleProductChange('price', Number(e.target.value))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">카테고리</label>
              <select
                className="w-full p-2 border rounded-md"
                onChange={(e) =>
                  handleCategoryChange(0, e.currentTarget.value as MainCategory)
                }
                value={product.categories[0]}
              >
                <option value="" disabled>
                  카테고리 선택
                </option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="키즈">키즈</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                상세 카테고리
              </label>
              <select
                className="w-full p-2 border rounded-md"
                onChange={(e) =>
                  handleCategoryChange(1, e.currentTarget.value as SubCategory)
                }
                value={product.categories[1]}
              >
                <option value="" disabled>
                  상세 카테고리 선택
                </option>
                <option value="아우터">아우터</option>
                <option value="상의">상의</option>
                <option value="하의">하의</option>
                <option value="액세서리">액세서리</option>
              </select>
            </div>

            <div className="space-y-4">
              {/* 썸네일 이미지 */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  썸네일 이미지
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbnailRef}
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => handleImageChange(e, 'thumbnail')}
                />
                {product.thumbnail && (
                  <div className="mt-2">
                    <Image
                      src={product.thumbnail}
                      alt="썸네일 미리보기"
                      width={50}
                      height={50}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* 상품 이미지들 */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  상품 이미지
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={productImagesRef}
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => handleImageChange(e, 'productImages')}
                />
                <div className="mt-2 grid grid-cols-4 gap-4">
                  {product.productImages.map((url, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={url}
                        alt={`상품 이미지 ${index + 1}`}
                        width={50}
                        height={50}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage('productImages', index)
                        }
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 상품 상세 설명 이미지들 */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  상세 설명 이미지
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={descriptionImagesRef}
                  className="w-full p-2 border rounded-md"
                  onChange={(e) =>
                    handleImageChange(e, 'productDescriptionImages')
                  }
                />
                <div className="mt-2 grid grid-cols-4 gap-4">
                  {product.productDescriptionImages.map((url, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={url}
                        alt={`상세 설명 이미지 ${index + 1}`}
                        width={50}
                        height={50}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage('productDescriptionImages', index)
                        }
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                상세 설명
              </label>
              <input
                type="area"
                className="w-full p-2 border rounded-md"
                placeholder="제품의 상세 설명을 입력하세요"
                value={product.description}
                ref={ref}
                onChange={(e) =>
                  handleProductChange('description', e.target.value)
                }
              />
            </div>
          </div>
          {/* items 입력 폼 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-lg font-medium">상품 옵션</label>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                옵션 추가
              </button>
            </div>

            {product.items.map((item, index) => (
              <div key={index} className="p-4 border rounded-md space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">옵션 {index + 1}</span>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      색상
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="색상을 입력하세요"
                      value={item.color}
                      ref={ref}
                      onChange={(e) =>
                        handleItemChange(index, 'color', e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      색상코드
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="색상코드 입력하세요"
                      value={item.colorCode}
                      onChange={(e) =>
                        handleItemChange(index, 'colorCode', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      사이즈
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="사이즈를 입력하세요"
                      value={item.size}
                      onChange={(e) =>
                        handleItemChange(index, 'size', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      수량
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md"
                      placeholder="수량을 입력하세요"
                      value={item.quantity}
                      ref={ref}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          'quantity',
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-md"
          >
            상품 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};
