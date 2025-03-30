import { CartItemDto } from "@/features/cart/api/cartRead";
import { memo, useMemo } from "react";
import { ProductImage } from "@/views/buy/ui/ProductImage";

interface CartProductInfoProps extends CartItemDto {
  priority?: boolean;
  hideShippingInfo?: boolean;
}

// 컴포넌트 정의
const CartProductInfoComponent = (props: CartProductInfoProps) => {
  const {
    productName,
    brandName,
    price,
    size,
    quantity,
    color,
    url,
    priority,
    hideShippingInfo = false,
  } = props;

  const won = Number(price) * Number(quantity);
  const sumWon = won.toLocaleString();

  // 최적화된 텍스트 렌더링 - 사전 계산
  const optimizedProductName = useMemo(() => {
    if (!productName) return "";

    return productName.length > 30
      ? productName.substring(0, 30) + "..."
      : productName;
  }, [productName]);

  const optimizedBrandName = useMemo(() => brandName || "", [brandName]);

  // 결제 페이지 레이아웃
  if (hideShippingInfo) {
    return (
      <div className="w-full py-2">
        <div className="flex gap-4">
          <div className=" w-16 h-16 flex-shrink-0 bg-gray-50">
            <ProductImage
              url={url}
              alt={productName || "상품"}
              width={64}
              height={64}
              priority={priority}
            />
          </div>

          <div className="flex-1">
            <p className="text-base font-semibold text-black line-clamp-1">
              {optimizedProductName} / {optimizedBrandName}
            </p>

            <div className="text-sm text-gray-600">
              {color} / {size} / {quantity}개
            </div>
            <div className="font-medium mt-1">{sumWon}원</div>
          </div>
        </div>
      </div>
    );
  }

  // 장바구니 레이아웃
  return (
    <div className="w-full h-full min-h-[1.5rem]">
      <div className="w-full h-20 flex gap-x-4 items-start">
        <div className="relative w-20 h-20 flex-shrink-0 bg-gray-50">
          <ProductImage
            url={url || ""}
            alt={productName || "상품"}
            width={80}
            height={80}
            priority={priority}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-semibold line-clamp-1 text-wrap cart-item-title flex flex-col">
            <span className="inline-block">{optimizedProductName}</span>
            <span className="inline-block text-gray-700">
              {optimizedBrandName}
            </span>
          </p>
          <div className="flex justify-between min-h-[1.25rem]">
            <p className="text-gray-600">color:{color}</p>
          </div>
          <div className="min-h-[1.2rem]">
            <strong>사이즈: {size}</strong>
          </div>
          <div className="flex gap-2 min-h-[1.2rem]">
            <div className="font-bold">수량 : {quantity}개</div>
          </div>
          <div className="flex justify-between min-h-[1.2rem]">
            <div>상품 금액</div>
            <strong>{sumWon}원</strong>
          </div>

          {!hideShippingInfo && (
            <div className="flex justify-between">
              <div>배송 비용</div>
              <div className="text-gray2">
                <p className="text-end text-gray-800">무료배송</p>
                <p className="underline">배송 예정일 3-5일</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// memo로 감싸기
export const CartProductInfo = memo(
  CartProductInfoComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.cartId === nextProps.cartId &&
      prevProps.productId === nextProps.productId &&
      prevProps.quantity === nextProps.quantity
    );
  }
);

// displayName 설정
CartProductInfo.displayName = "CartProductInfo";
