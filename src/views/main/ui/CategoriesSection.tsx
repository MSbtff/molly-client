import Image from 'next/image';
import {useRouter} from 'next/navigation';

const categories = [
  { id: 1, title: "구호플러스", imgSrc: "/main/kuho.webp" },
  { id: 2, title: "이세이미야케", imgSrc: "/main/ssey.webp" },
  { id: 3, title: "빈폴", imgSrc: "/main/beanpole.webp" },
  { id: 4, title: "띠어리", imgSrc: "/main/theory.webp" },
  { id: 5, title: "메종키츠네", imgSrc: "/main/메종.webp" },
  { id: 6, title: "유니폼브릿지", imgSrc: "/main/uni.webp" },
  { id: 7, title: "PXG", imgSrc: "/main/dl.webp" },
  { id: 8, title: "분크", imgSrc: "/main/vun.webp" },
  { id: 9, title: "아미", imgSrc: "/main/ami.png" },
  { id: 10, title: "가니", imgSrc: "/main/GANNI.png" },
  // { id: 11, title: "르메르", imgSrc: "main/LE.png" },
];

export default function CategoriesSection() {
  const router = useRouter();
  const handleBrandClick = (brandName: string)=>{
      router.push(`/product?brandName=${brandName}`);
  };


  return (
    <section className="px-20 mt-10">
      <div className="grid grid-cols-5 gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center mb-7"
          >
            <button className="w-full h-24 flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-sm p-3 mb-1"
                    onClick={()=>handleBrandClick(category.title)}
            >
              <Image src={category.imgSrc} alt={category.title} width={80} height={60} />
            </button>
            <p className="text-sm font-semibold mt-2"
               onClick={()=>handleBrandClick(category.title)}
            >{category.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}