"use client";
import Image from "next/image";
interface Props {
    description: string;
    images: { path: string }[];
    showDetails: boolean;
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function ProductDescription({ description, images, showDetails, setShowDetails }: Props) {
    const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  
    return (
            <section className="max-w-screen-lg mx-auto mt-16 px-4 border-t"> {/* 상세 섹션 */}
              {/* 상세 설명 (이미지보다 위에 위치) */}
              <div className="mt-12">
                {description && (
                  <div className="max-w-screen-lg mx-auto text-center mt-8 px-4">
                    {description.split("\n").map((line, index) => (
                      <p key={index} className="mb-4">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
      
              {/* 상품 이미지 및 그라데이션 */}
              <div
                className={`${showDetails ? "h-auto" : "h-[3300px] overflow-hidden"
                  } relative`}
              >
                <div className="flex flex-col gap-6">
                  {images.map((img, index) => (
                    <Image
                      key={index}
                      src={ img.path ? `${imageUrl}${img.path}` : "/images/noImage.svg"}
                      alt={`Product Description Image ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full object-cover"
                      unoptimized={true}
                    />
                  ))}
                </div>
      
                {/* 그라데이션 효과 추가 (showDetails가 false일 때만 보이도록) */}
                {!showDetails && (
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
                )}
              </div>
      
              {/* 상품 정보 더보기 버튼 */}
              {!showDetails && (
                <div className="text-center mt-8 relative z-10">
                  <button
                    className="px-6 py-3 border border-gray-400 text-lg font-medium hover:bg-gray-100 transition"
                    onClick={() => setShowDetails(true)}
                  >
                    상품 정보 더보기
                  </button>
                </div>
              )}
      
              {/* 접기 버튼 */}
              {showDetails && (
                <div className="text-center mt-6">
                  <button
                    className="px-6 py-3 border border-gray-400 text-lg font-medium hover:bg-gray-100 transition"
                    onClick={() => setShowDetails(false)}
                  >
                    접기
                  </button>
                </div>
              )}
            </section>
    );
  }