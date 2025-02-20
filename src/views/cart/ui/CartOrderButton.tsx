interface CartOrderButtonProps {
  totalAmount: number;
  totalItems: number;
  handleOrder: () => void;
}

export const CartOrderButton = ({
  totalAmount,
  totalItems,
  handleOrder,
}: CartOrderButtonProps) => {
  const formattedAmount = totalAmount;
  const won = formattedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <>
      <div
        className="w-full h-20 flex justify-center items-center cursor-pointer"
        onClick={handleOrder}
      >
        <div className="w-[685px] h-14 flex justify-center items-center gap-2 border bg-[#EB6455] rounded-[10px] text-white font-semibold">
          <div>{won}원</div>
          <p>/</p>
          <div>총 {totalItems}건 주문하기</div>
        </div>
      </div>
    </>
  );
};
