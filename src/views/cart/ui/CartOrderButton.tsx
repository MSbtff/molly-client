import cartOrder from '@/features/cart/api/cartOrder';

interface CartOrderButtonProps {
  totalAmount: number;
  totalItems: number;
}

export const CartOrderButton = ({
  totalAmount,
  totalItems,
}: CartOrderButtonProps) => {
  const formattedAmount = totalAmount;
  const won = formattedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleClick = async () => {
    try {
      const res = cartOrder();
    } catch (error) {}
  };

  return (
    <>
      <div className="w-full h-20 flex justify-center items-center cursor-pointer">
        <div className="w-[685px] h-14 flex justify-center items-center gap-2 border bg-[#EB6455] rounded-[10px] text-white font-semibold">
          <div>{won}원</div>
          <p>/</p>
          <div>총 {totalItems}건 주문하기</div>
        </div>
      </div>
    </>
  );
};
