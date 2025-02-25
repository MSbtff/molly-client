import Link from 'next/link';

type SideItemProps = {
  shopItem?: boolean;
};

export const SideItem = (props: SideItemProps) => {
  const shopItem = [
    {name: '주문 배송내역', path: '/mypage/orders'},
    {name: '판매자 페이지', path: '/seller'},
    {name: '관심', path: '/mypage/wishlist'},
  ];

  const myItem = [
    {name: '프로필 관리', path: '/mypage/profile'},
    {name: '배송지 관리', path: '/mypage/address'},
    {name: '판매 정보', path: '/mypage/seller'},
    {name: '리뷰 작성', path: '/mypage/review'},
  ];

  return (
    <div className="flex flex-col gap-2">
      {(props.shopItem ? shopItem : myItem).map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className="text-[#acacac] hover:text-black transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
