import Image from "next/image";
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Slider1 from "../../../../public/images/slider1.webp";
import Slider11 from '../../../../public/images/slider1-2.jpg';
import Slider111 from '../../../../public/images/slider1-3.jpg';


const styleClip = [
    { id: 1, src: Slider1, nickname: "비짓뉴욕" },
    { id: 2, src: Slider1, nickname: "비짓뉴욕" },
    { id: 3, src: Slider1, nickname: "비짓뉴욕" },
    { id: 4, src: Slider1, nickname: "@183.h.g" },
    { id: 5, src: Slider1, nickname: "@183.h.g" },
    { id: 6, src: Slider1, nickname: "비짓뉴욕" },
    { id: 7, src: Slider11, nickname: "비짓뉴욕" },
    { id: 8, src: Slider11, nickname: "비짓뉴욕" },
    { id: 9, src: Slider11, nickname: "@183.h.g" },
    { id: 10, src: Slider111, nickname: "비짓뉴욕" },
    { id: 11, src: Slider111, nickname: "비짓뉴욕" },
    { id: 12, src: Slider111, nickname: "비짓뉴욕" },
];


export default function StyleClipSection() {
    const [activeIndex, setActiveIndex] = useState(0);//슬라이드1 인덱스 그룹
    const [direction, setDirection] = useState(0);

    // 슬라이드 이동 함수
    // const handleSlide = (direction: "prev" | "next") => {
    //     setActiveIndex((prev) => {
    //         if (direction === "next") {
    //             return (prev + 1) % styleClip.length;
    //         } else {
    //             return (prev - 1 + styleClip.length) % styleClip.length;
    //         }
    //     });
    // };
    const handleSlide = (dir: number) => {
        setDirection(dir);
        setActiveIndex((prev) => (prev + dir + styleClip.length) % styleClip.length);
    };

    return (
        // <section className="text-center px-6 scale-90">
        //     <h2 className="text-left text-xl font-semibold mb-4">금주 인기 스타일</h2>
        //     <div className="flex justify-center gap-2 overflow-hidden transition-all">
        //         {currentItems.map((item) => (
        //             <div key={item.id} >
        //                 <Image src={item.src} alt={item.title} width={250} height={300} className="rounded-lg" />
        //                 <p className="text-sm mt-2">{item.title}</p>
        //             </div>
        //         ))}
        //     </div>
        //     <div className="flex justify-center mt-4 gap-2">
        //         {[...Array(totalSlides)].map((_, index) => (
        //             <button
        //                 key={index}
        //                 onClick={() => setActiveIndex(index)}
        //                 className={`w-3 h-3 rounded-full transition ${activeIndex === index ? "bg-[hsl(var(--muted-foreground))]" : "bg-gray-300"
        //                     }`}
        //             />
        //         ))}
        //     </div>
        // </section>


        <section className="relative bg-[#1a1a1a] text-white py-10 px-6 flex flex-col items-center">
            <h2 className="text-left text-xl font-semibold w-full">스타일 클립</h2>

            {/* 슬라이드 컨테이너 */}
            <div className="relative flex items-center justify-center w-full h-[500px] mt-6 overflow-hidden">
                {/* 이전 버튼 */}
                <button
                    className="absolute left-0 z-10 p-2 bg-gray-800 rounded-full opacity-50 hover:opacity-100"
                    onClick={() => handleSlide(-1)}
                >
                    ◀
                </button>

                {/* 이미지 리스트 */}
                <div className="relative w-[80%] flex justify-center items-center">
                    {/* {styleClip.map((item, index) => {
                        const isActive = index === activeIndex;
                        const isPrev = index === (activeIndex - 1 + styleClip.length) % styleClip.length;
                        const isNext = index === (activeIndex + 1) % styleClip.length;

                        return (
                            <motion.div
                                key={item.id}
                                className={`absolute rounded-lg overflow-hidden transition-all duration-500 ease-in-out ${isActive
                                        ? "w-[300px] h-[400px] z-20 scale-105"
                                        : "w-[250px] h-[350px] z-10 opacity-50"
                                    }`}
                                animate={{
                                    x: isActive ? 0 : isPrev ? "-150%" : isNext ? "150%" : "0%",
                                    opacity: isActive ? 1 : 0.5,
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.nickname}
                                    width={300}
                                    height={400}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                                {isActive && (
                                    <div className="absolute bottom-0 w-full text-center bg-black bg-opacity-50 py-2">
                                        <p className="text-lg font-semibold">{item.nickname}</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })} */}
                    <AnimatePresence custom={direction}>
                        {[-1, 0, 1].map((offset) => {
                            const index = (activeIndex + offset + styleClip.length) % styleClip.length;
                            return (
                                <motion.div
                                    key={styleClip[index].id}
                                    className="absolute w-[250px] h-[350px] rounded-lg overflow-hidden"
                                    initial={{ x: offset * 300, opacity: offset === 0 ? 1 : 0.5, scale: offset === 0 ? 1.1 : 0.9 }}
                                    animate={{ x: offset * 300, opacity: offset === 0 ? 1 : 0.5, scale: offset === 0 ? 1.1 : 0.9 }}
                                    exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src={styleClip[index].src}
                                        alt={styleClip[index].nickname}
                                        width={250}
                                        height={350}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                    {offset === 0 && (
                                        <div className="absolute bottom-0 w-full text-center bg-black bg-opacity-50 py-2">
                                            <p className="text-lg font-semibold">{styleClip[index].nickname}</p>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* 다음 버튼 */}
                <button
                    className="absolute right-0 z-10 p-2 bg-gray-800 rounded-full opacity-50 hover:opacity-100"
                    onClick={() => handleSlide(1)}
                >
                    ▶
                </button>
            </div>
        </section>
    );
}