import Image from "next/image";
import type { StaticImageData } from 'next/image';
// import { useState } from 'react';
// import { motion, AnimatePresence } from "framer-motion";
import Slider1 from "../../../../public/images/review/리뷰.jpeg";
// import Slider2 from '../../../../public/images/review/리뷰10.jpeg';
import Slider3 from '../../../../public/images/review/리뷰2.jpg';
// import Slider4 from '../../../../public/images/review/리뷰3.jpg';
import Slider5 from '../../../../public/images/review/리뷰4.png';
// import Slider6 from '../../../../public/images/review/리뷰6.jpeg';
import Slider7 from '../../../../public/images/review/리뷰8.jpg';
import Slider8 from '../../../../public/images/review/리뷰9.jpeg';


const styleClip: { id: number; src: StaticImageData; nickname: string; rounded?: boolean }[] = [
    { id: 1, src: Slider1, nickname: "rjft" },
    // { id: 2, src: Slider2, nickname: "무에" },
    { id: 3, src: Slider3, nickname: "앙큼", rounded: true },
    // { id: 4, src: Slider4, nickname: "@183.h.g" },
    { id: 5, src: Slider5, nickname: "@dk_xk" },
    // { id: 6, src: Slider6, nickname: "걸스" },
    { id: 7, src: Slider7, nickname: "타이" },
    { id: 8, src: Slider8, nickname: "밍곰" },
];


export default function StyleClipSection() {
    // const [activeIndex, setActiveIndex] = useState(0);//슬라이드1 인덱스 그룹
    // const [direction, setDirection] = useState(0);


    // const handleSlide = (dir: number) => {
    //     setDirection(dir);
    //     setActiveIndex((prev) => (prev + dir + styleClip.length) % styleClip.length);
    // };

    return (

        // <section className="relative bg-[#1a1a1a] text-white py-10 px-6 flex flex-col items-center">
        //     <h2 className="text-left text-xl font-semibold w-full">스타일 클립</h2>

        //     {/* 슬라이드 컨테이너 */}
        //     <div className="relative flex items-center justify-center w-full h-[500px] mt-6 overflow-hidden">
        //         {/* 이전 버튼 */}
        //         <button
        //             className="absolute left-0 z-10 p-2 bg-gray-800 rounded-full opacity-50 hover:opacity-100"
        //             onClick={() => handleSlide(-1)}
        //         >
        //             ◀
        //         </button>

        //         {/* 이미지 리스트 */}
        //         <div className="relative w-[80%] flex justify-center items-center">
        //             <AnimatePresence custom={direction}>
        //                 {[-1, 0, 1].map((offset) => {
        //                     const index = (activeIndex + offset + styleClip.length) % styleClip.length;
        //                     return (
        //                         <motion.div
        //                             key={styleClip[index].id}
        //                             className="absolute w-[250px] h-[350px] rounded-lg overflow-hidden"
        //                             initial={{ x: offset * 300, opacity: offset === 0 ? 1 : 0.5, scale: offset === 0 ? 1.1 : 0.9 }}
        //                             animate={{ x: offset * 300, opacity: offset === 0 ? 1 : 0.5, scale: offset === 0 ? 1.1 : 0.9 }}
        //                             exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
        //                             transition={{ duration: 0.5 }}
        //                         >
        //                             <Image
        //                                 src={styleClip[index].src}
        //                                 alt={styleClip[index].nickname}
        //                                 width={250}
        //                                 height={350}
        //                                 className="object-cover w-full h-full rounded-lg"
        //                             />
        //                             {offset === 0 && (
        //                                 <div className="absolute bottom-0 w-full text-center bg-black bg-opacity-50 py-2">
        //                                     <p className="text-lg font-semibold">{styleClip[index].nickname}</p>
        //                                 </div>
        //                             )}
        //                         </motion.div>
        //                     );
        //                 })}
        //             </AnimatePresence>
        //         </div>

        //         {/* 다음 버튼 */}
        //         <button
        //             className="absolute right-0 z-10 p-2 bg-gray-800 rounded-full opacity-50 hover:opacity-100"
        //             onClick={() => handleSlide(1)}
        //         >
        //             ▶
        //         </button>
        //     </div>
        // </section>
        // <section
        //     className="relative bg-black text-white py-12 px-6 flex flex-col items-center"
        //     onMouseEnter={() => setIsPaused(true)}
        //     onMouseLeave={() => setIsPaused(false)}
        // >
        //     <div className="w-full flex justify-between items-center">
        //         <h2 className="text-left text-xl font-semibold">스타일클립</h2>
        //         <button className="text-gray-400 text-sm hover:text-white">더보기</button>
        //     </div>

        //     {/* 슬라이드 컨테이너 */}
        //     <div className="relative flex items-center justify-center w-full mt-6 overflow-hidden">
        //         <AnimatePresence custom={direction}>
        //             {styleClip.map((item, index) => {
        //                 // 현재 보여지는 슬라이드인지 확인
        //                 const isActive = index === activeIndex;
        //                 const roundedClass = index === 2 ? "rounded-full" : "rounded-lg";

        //                 return (
        //                     <motion.div
        //                         key={item.id}
        //                         className={`relative overflow-hidden ${roundedClass} transition-all duration-500 ease-in-out
        //           ${isActive ? "w-[250px] h-[350px] opacity-100 scale-105" : "w-[200px] h-[300px] opacity-50"}`}
        //                         initial={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1.1 : 0.9 }}
        //                         animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1.1 : 0.9 }}
        //                         transition={{ duration: 0.5 }}
        //                     >
        //                         <Image
        //                             src={item.src}
        //                             alt={item.nickname}
        //                             width={250}
        //                             height={350}
        //                             className="object-cover w-full h-full"
        //                         />

        //                         {/* 닉네임과 설명 오버레이 */}
        //                         <div className="absolute bottom-0 w-full text-center bg-black bg-opacity-50 py-3">

        //                             <p className="text-lg font-semibold">{item.nickname}</p>
        //                         </div>
        //                     </motion.div>
        //                 );
        //             })}
        //         </AnimatePresence>
        //     </div>
        // </section>

        <section className="relative bg-black text-white py-12 px-6 flex flex-col items-center">
            <div className="w-full flex justify-between items-center">
                <h2 className="text-left text-xl font-semibold ml-12">스타일클립</h2>
                <button className="text-gray-400 text-sm hover:text-white mr-10">더보기</button>
            </div>

            {/* 스타일 클립 리스트 */}
            <div className="flex justify-center gap-6 mt-6">
                {styleClip.map((item) => {
                    // 특정 인덱스에 따라 모양 변경 (3번째 이미지만 원형)
                    const roundedClass = item.rounded ? "rounded-full" : "rounded-lg";

                    return (
                        <div
                            key={item.id}
                            className={`relative w-[250px] h-[350px] overflow-hidden ${roundedClass} shadow-lg`}
                        >
                            <Image
                                src={item.src}
                                alt={item.nickname}
                                width={250}
                                height={350}
                                className="object-cover w-full h-full"
                            />
                            {/* 닉네임 및 설명 오버레이 */}
                            <div className="absolute bottom-0 w-full text-center py-3">
                                <p className="text-lg font-semibold">{item.nickname}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}