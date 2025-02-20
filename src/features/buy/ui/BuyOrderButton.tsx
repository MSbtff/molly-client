export const BuyOrderButton = () => {
  return (
    <>
      <div className="w-full h-20 flex justify-center items-center cursor-pointer">
        <div className="w-[705px] h-14 flex justify-center items-center gap-2 border bg-[#EB6455] rounded-[10px] text-white font-semibold">
          <div> 400000원</div>
          <p>/</p>
          <div>총 1건 주문하기</div>
        </div>
      </div>
    </>
  );
};
