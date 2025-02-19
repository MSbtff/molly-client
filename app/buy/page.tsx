import {TestCheckoutPage} from '../../src/features/buy/TestCheckoutPage';
import {Address} from '../../src/views/buy/ui/Address';
import {CartOrderButton} from '../../src/views/cart/ui/CartOrderButton';
import {CartProductInfo} from '../../src/views/cart/ui/CartProductInfo';
import {ChevronRight} from 'lucide-react';
import {CircleHelp} from 'lucide-react';

//Element 타입은 시맨틱 태그로 사용하기 위해 만든 타입

export default function BuyPage() {
  return (
    <div className="w-screen h-full flex items-center flex-col ">
      <div className="w-full h-[75px] flex justify-center items-center font-bold text-2xl border">
        배송/결제
      </div>
      <div className="w-full h-full flex flex-col items-center bg-[#EFF2F1]">
        <Address />
        <div className="mt-4 w-[700px] h-[400px] flex flex-col bg-white rounded-[10px] border p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">주문 상품 및 쿠폰</h2>
            <div>총 1건</div>
          </div>
          <div className="mt-10 h-full">{/* <CartProductInfo /> */}</div>
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
          {/* <div className="font-bold">결제방법</div>
          <div className="mt-2">간편 결제</div>
          <div className="w-full flex gap-4">
            <button className="w-[215px] h-12 border rounded-[10px]">
              카카오페이
            </button>
            <button className="w-[215px] h-12 border rounded-[10px]">
              토스
            </button>
            <button className="w-[215px] h-12 border rounded-[10px]">
              네이버페이
            </button>
          </div> */}
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
        <div className="fixed w-full bottom-0">
          <CartOrderButton />
        </div>
      </div>
    </div>
  );
}
