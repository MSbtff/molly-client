import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useUrlStore } from "@/app/provider/UrlStore";

const categories = [
  { id: 1, title: "구호플러스", imgSrc: "/main/kuho.webp" },
  { id: 2, title: "킨", imgSrc: "/main/keen.avif" },
  { id: 3, title: "던스트", imgSrc: "/main/dust.avif" },
  { id: 4, title: "티엔지티", imgSrc: "/main/tngt.avif" },
  { id: 5, title: "메종키츠네", imgSrc: "/main/MaisonKitsune.webp" },
  { id: 6, title: "유니폼브릿지", imgSrc: "/main/uni.webp" },
  { id: 7, title: "일꼬르소", imgSrc: "/main/ilco.avif" },
  { id: 8, title: "아떼", imgSrc: "/main/athe.avif" },
  { id: 9, title: "아미", imgSrc: "/main/ami.png" },
  { id: 10, title: "라코스테", imgSrc: "/main/lacoste.webp" },
];

export default function BrandSection() {
  const router = useRouter();  
  const handleBrandClick = (brandName: string) => {
    const newSearchParams = `brandName=${brandName}`;
    router.push(`/product?${newSearchParams}`);//실제 url에 반영
    // useUrlStore.getState().setSearchParams(newSearchParams);// zustand에 반영
  };

  return (
    <section className="px-20 mt-10" role="region">
      <div className="grid grid-cols-5 gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center mb-7">
            {/* <button className="w-full h-24 flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-sm p-3 mb-1" */}
            <button className="w-full h-24 flex flex-col items-center justify-center rounded-lg shadow-sm p-3 mb-1"
              onClick={() => handleBrandClick(category.title)} >
              <Image src={category.imgSrc} alt={category.title} width={100} height={80} />
            </button>
            <p className="text-sm font-semibold mt-2"
              onClick={() => handleBrandClick(category.title)}>
              {category.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}