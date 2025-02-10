

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-300 py-10 px-6 text-gray-700 mt-16">
            {/* 상단 정보 */}
            <div className="max-w-screen-lg mx-auto grid grid-cols-4 gap-8 text-center md:text-left">
                <div>
                    <h3 className="font-semibold mb-2">안내</h3>
                    <ul className="space-y-1">
                        <li>멤버가입</li>
                        <li>매장찾기</li>
                        <li>나이키 저널</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">멤버 혜택</h3>
                    <ul className="space-y-1">
                        <li>웰컴 쿠폰</li>
                        <li>생일 쿠폰</li>
                        <li>학생 할인 쿠폰</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">고객센터</h3>
                    <ul className="space-y-1">
                        <li>주문배송조회</li>
                        <li>반품 정책</li>
                        <li>결제 방법</li>
                        <li>공지사항</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">회사소개</h3>
                    <ul className="space-y-1">
                        <li>About Nike</li>
                        <li>소식</li>
                        <li>채용</li>
                        <li>투자자</li>
                    </ul>
                </div>
            </div>

            {/* 구분선 */}
            <hr className="my-6 border-gray-300" />

            {/* 하단 정보 */}
            <div className="max-w-screen-lg mx-auto text-center md:text-left text-sm text-gray-500">
                <p>
                    (유)나이키코리아 대표 Kimberlee Lynn Chang Mendes, 킴벌리 린 창 멘데스 |
                    서울 강남구 테헤란로 152 강남파이낸스센터 30층 | 통신판매업신고번호 2011-서울강남-03461
                    | 등록번호 220-88-09068
                </p>
                <p className="mt-2">
                    사업자 정보 확인 | 고객센터 전화 문의 <span className="font-medium">080-022-0182</span> |
                    FAX 02-6744-5880 | 이메일{" "}
                    <a href="mailto:service@nike.co.kr" className="text-blue-500 underline">
                        service@nike.co.kr
                    </a>{" "}
                    | 호스팅서비스사업자 (유)나이키코리아
                </p>
            </div>
        </footer>
    );
}