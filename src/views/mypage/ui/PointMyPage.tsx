export const PointMyPage = () => {
  return (
    <div className="w-full h-full flex ">
      <div
        className="flex flex-col justify-between p-4"
        style={{
          borderRight: '1px solid #e5e5e5',
          width: '595px',
        }}
      >
        <div>회원정보</div>
        <div className="flex justify-between">
          <div className="text-2xl">포인트</div>
          <div className="text-2xl">1000</div>
        </div>
      </div>
      <div className=" flex flex-col justify-between p-4">
        <div>사용가능 쿠폰</div>
        <div>
          <div className="text-2xl">5</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
