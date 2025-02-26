import Image from 'next/image';

const categories = [
    { id: 1, title: "에션셜 코드", imgSrc: "images/coat.svg" },
    { id: 2, title: "무스탕", imgSrc: "images/mustang.svg" },
    { id: 3, title: "숏패딩", imgSrc: "images/shortPadding.svg" },
    { id: 4, title: "가방", imgSrc: "images/bag.svg" },
    { id: 5, title: "슈즈", imgSrc: "images/shoes.svg" },
    { id: 6, title: "나일론재킷", imgSrc: "images/nylonJacket.svg" },
    { id: 7, title: "지갑", imgSrc: "images/shortPadding.svg" },
    { id: 8, title: "키즈", imgSrc: "images/kids.svg" },
    { id: 9, title: "뷰티", imgSrc: "images/fashion.svg" },
    { id: 10, title: "악세사리", imgSrc: "images/accessories.svg" },
  ];

export default function CategoriesSection () {
    return (
        <section className="px-10 mt-10">
                <div className="grid grid-cols-5 gap-y-0">
                  {categories.map((category) => (
                    <div key={category.id} className="flex flex-col items-center rounded-xl p-1">
                      <Image src={category.imgSrc} alt={category.title} width={80} height={60} className="rounded-lg" />
                      <p className="text-sm font-semibold mt-2">{category.title}</p>
                    </div>
                  ))}
                </div>
              </section>
    );
}