'use client';

import {BuyOrderButton} from '@/features/buy/ui/BuyOrderButton';
import {ChevronRight} from 'lucide-react';
import {CircleHelp} from 'lucide-react';
import {TestCheckoutPage} from '@/features/buy/api/TestCheckoutPage';

import {CartProductInfo} from '@/views/cart/ui/CartProductInfo';
import {useOrderStore} from '@/app/provider/OrderStore';
import {BuyAddress} from './BuyAddress';
import {useEffect} from 'react';

import buyCancel from '@/features/buy/api/buyCancel';
import {useRouter} from 'next/navigation';

//Element 타입은 시맨틱 태그로 사용하기 위해 만든 타입

export default function BuyContainer() {
  const router = useRouter();
  const {orders, setOrders} = useOrderStore();
  const orderNumber = orders?.length - 1;
  const orderId = orders?.[orderNumber]?.orderId;

  // 주문이 없을 때 카트로 리다이렉트
  useEffect(() => {
    if (!orders?.length) {
      router.replace('/cart');
      return;
    }
  }, [orders, router]);

  // // 뒤로가기 처리
  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault();
  //     e.returnValue = '';
  //   };

  //   const handlePopState = async (e: PopStateEvent) => {
  //     e.preventDefault();
  //     const confirmed = window.confirm('결제를 취소하시겠습니까?');

  //     if (confirmed && orderId) {
  //       try {
  //         await buyCancel(orderId);
  //         setOrders([]);
  //         window.location.href = '/cart';
  //       } catch (error) {
  //         console.error('결제 취소 실패:', error);
  //       }
  //     } else {
  //       // 취소 시 현재 페이지 유지
  //       window.history.pushState(null, '', window.location.href);
  //     }
  //   };

  //   // 이벤트 리스너 등록
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('popstate', handlePopState);

  //   // 초기 history 상태 설정
  //   window.history.pushState(null, '', window.location.href);

  //   // 클린업 함수
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('popstate', handlePopState);
  //   };
  // }, [orderId, setOrders]);

  // 총 주문 건수 계산
  const totalItems = orders?.length || 0;

  return (
    <div className="w-screen h-full flex items-center flex-col ">
      <div className="w-full h-[75px] flex justify-center items-center font-bold text-2xl border">
        배송/결제
      </div>
      <div className="w-full h-full flex flex-col items-center bg-[#EFF2F1]">
        <BuyAddress />
        <div className="mt-4 w-[700px] h-[400px] flex flex-col bg-white rounded-[10px] border p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">주문 상품 및 쿠폰</h2>
            <div>총 {totalItems}건</div>
          </div>
          <div className="mt-10 h-full overflow-auto">
            {orders?.length > 0 &&
              orders[orderNumber].orderDetails?.map((item) => (
                <CartProductInfo
                  key={item.itemId}
                  cartId={0} // 필요한 경우 적절한 값으로 변경
                  itemId={item.itemId}
                  productId={item.productId}
                  brandName={item.brandName}
                  productName={item.productName}
                  price={item.price}
                  quantity={item.quantity}
                  size={item.size}
                  color="" // orderDetails에 color 정보가 없다면 기본값 설정
                  url="" // orderDetails에 url 정보가 없다면 기본값 설정
                />
              ))}
          </div>
          <div className="mt-12 w-full h-9 rounded-[10px] border flex justify-between items-center p-2">
            <div>요청사항 없음</div>

            <ChevronRight size={20} />
          </div>
        </div>
        <div className="mt-4 w-[700px] h-[145px] flex flex-col justify-between bg-white rounded-[10px] border p-4">
          <div>포인트</div>
          <div className="w-[585px] h-9 border rounded-[10px] flex items-center">
            <div>0</div>
          </div>
          <div className="flex">
            <div>보유 포인트</div>
            <div className="ml-8 flex  items-center">
              <CircleHelp size={20} color="#acacac" />
            </div>
            <div> 0p</div>
          </div>
        </div>
        <div className="mt-4 w-[700px] h-full flex flex-col  bg-white rounded-[10px] border p-2">
          <TestCheckoutPage />
        </div>
        <div className="mt-4 w-[700px] h-[160px] flex flex-col  bg-white rounded-t-[10px] border p-4">
          <div className="font-bold">최종 주문 정보</div>
          <div className="w-full flex justify-between">
            <div>구매가</div>
            <div>400,000원</div>
          </div>
          <div className="w-full flex justify-between">
            <div>배송비</div>
            <div>무료</div>
          </div>
          <div className="w-full flex justify-between">
            <div>쿠폰 사용</div>
            <div>-</div>
          </div>
          <div className="w-full flex justify-between">
            <div>포인트 사용</div>
            <div>-</div>
          </div>
        </div>
        <div className=" flex flex-col bg-gray2 w-[700px] h-[60px] rounded-b-[10px] px-4">
          <div className="font-bold text-lg">총 결제금액</div>
          <div className="text-right font-bold">400,000원</div>
        </div>
        <div className=" w-full bottom-0">
          <BuyOrderButton />
        </div>
      </div>
    </div>
  );
}
