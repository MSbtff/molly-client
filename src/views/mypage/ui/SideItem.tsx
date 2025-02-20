type SideItemProps = {
  shopItem?: boolean;
};

export const SideItem = (props: SideItemProps) => {
  const shopItem = ['주문 배송내역', '판매 내역', '관심'];
  const myItem = ['프로필 관리', '배송지 관리', '판매 정보', '리뷰 작성'];
  return (
    <div className="flex flex-col gap-2">
      {(props.shopItem ? shopItem : myItem).map((item, index) => (
        <div key={index} style={{color: '#acacac'}}>
          {item}
        </div>
      ))}
    </div>
  );
};
