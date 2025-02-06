export const PurchasePage = () => {
  return (
    <>
      <div className="text-2xl font-bold">구매내역</div>
      <div className="w-full h-full border ">
        <div className="flex">
          <div
            className="flex flex-col justify-between p-4"
            style={{
              borderRight: '1px solid #e5e5e5',
              width: '250px',
            }}
          >
            <div className="flex flex-col justify-between">
              <div className="text-2xl">전체</div>
              <div className="text-2xl">10</div>
            </div>
          </div>
          <div
            className=" flex flex-col justify-between p-4"
            style={{borderRight: '1px solid #e5e5e5', width: '250px'}}
          >
            <div>대기중</div>
            <div>
              <div className="text-2xl">5</div>
              <div></div>
            </div>
          </div>

          <div
            className=" flex flex-col justify-between p-4"
            style={{borderRight: '1px solid #e5e5e5', width: '250px'}}
          >
            <div>진행중</div>
            <div>
              <div className="text-2xl">5</div>
              <div></div>
            </div>
          </div>
          <div
            className=" flex flex-col justify-between p-4"
            style={{borderRight: '1px solid #e5e5e5', width: '250px'}}
          >
            <div>완료</div>
            <div>
              <div className="text-2xl">5</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
