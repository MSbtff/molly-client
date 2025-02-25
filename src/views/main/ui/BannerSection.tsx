'use client';

import Image from 'next/image';
import Banner from "../../../../public/images/banner.webp";

export default function BannerSection() {
    return (

        <section className="relative w-screen h-[500px]">
            {/* <div className="absolute inset-0"> */}
            <Image src={Banner} alt="banner" fill className="absolute inset-0 object-cover w-screen h-full" />
            <div className="absolute top-1/4 left-10 text-white">
                <h2 className="text-4xl font-bold leading-tight">
                    봄 아우터를 <br /> 즐기는 방법
                </h2>
                <p className="mt-2 text-lg">인플루언서가 입은 신상 아우터</p>
                {/* </div> */}
            </div>
        </section>
    );
}