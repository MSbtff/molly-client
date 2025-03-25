import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  { id: 1, title: "구호플러스", imgSrc: "/main/kuho.webp" },
  { id: 2, title: "킨", imgSrc: "/main/keen-1.svg" },
  { id: 3, title: "던스트", imgSrc: "/main/dust.png" },
  { id: 4, title: "티엔지티", imgSrc: "/main/tngt.png" },
  { id: 5, title: "메종키츠네", imgSrc: "/main/Maison.svg" },
  { id: 6, title: "유니폼브릿지", imgSrc: "/main/uni.webp" },
  { id: 7, title: "일꼬르소", imgSrc: "/main/ilco.png" },
  { id: 8, title: "아떼", imgSrc: "/main/athe.png" },
  { id: 9, title: "아미", imgSrc: "/main/logo-ami.png" },
  { id: 10, title: "라코스테", imgSrc: "/main/lacoste.webp" },
];

export default function BrandSection() {
  const router = useRouter();
  const handleBrandClick = (brandName: string) => {
    const newSearchParams = `brandName=${brandName}`;
    router.push(`/product?${newSearchParams}`); //실제 url에 반영
  };

  return (
    <section className="px-20 mt-10" role="region" aria-label="브랜드 섹션">
      {/* <h3 className="text-xl font-semibold mb-4">인기 탑 브랜드</h3> */}
      <div className="grid grid-cols-5 gap-1">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center ">
            <button
              className="w-full h-24 flex flex-col items-center justify-center rounded-lg bg-gray-100 "
              onClick={() => handleBrandClick(category.title)}
            >
              <Image
                src={category.imgSrc}
                alt={category.title}
                unoptimized={true}
                width={150}
                height={80}
              />
            </button>
            <p
              className="text-sm font-semibold mt-2"
              onClick={() => handleBrandClick(category.title)}
            >
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
