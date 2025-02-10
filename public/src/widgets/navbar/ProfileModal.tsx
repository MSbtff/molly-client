import Image from "next/image";
interface ProfileModalProps {
    setIsOpen: (value: boolean) => void; // 타입 명시
}

export default function ProfileModal({ setIsOpen }: ProfileModalProps) {
    return (
        <>
            {/* 배경 */}
            <div className="fixed inset-0 bg-black bg-opacity-40 z-40"
                 onClick={() => setIsOpen(false)}//배경 클릭 시 모달 닫기
            ></div>
            
            {/* 모달 */}
            <div className="absolute right-0 mt-2 w-[220px] bg-white p-6 rounded-2xl shadow-lg z-50"
                 onClick={(e) => e.stopPropagation()}//내부 클릭 시 닫히지 않도록 막음
            >
                {/* 닫기 버튼 */}
                {/* <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button> */}

                {/* 메뉴 리스트 */}
                <div className="mt-2 mb-2 space-y-7 text-gray-700">
                    <button className="flex items-center w-full text-left">
                        <Image src="/src/assets/icons/profile.svg" alt="User Profile" width={24} height={24}
                            className="rounded-full" />
                        <span className="ml-3">마이페이지</span>
                    </button>
                    <button className="flex items-center w-full text-left">
                        <Image src="/src/assets/icons/heart.svg" alt="찜하기" width={24} height={24} />
                        <span className="ml-3">찜하기</span>
                    </button>

                    <button className="flex items-center w-full text-left">
                        <Image src="/src/assets/icons/alarm.svg" alt="알림" width={24} height={24} />
                        <span className="ml-3">알림</span>
                    </button>

                    <button className="flex items-center w-full text-left">
                        <Image src="/src/assets/icons/logout.svg" alt="로그아웃" width={24} height={24} />
                        <span className="ml-3">로그아웃</span>
                    </button>
                </div>
            </div>
        </>
    );
}
