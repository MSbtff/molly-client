"use server";

import { cookies } from "next/headers";

export async function submitReview(formData: FormData) {
    const baseUrl = process.env.NEXT_SERVER_URL; // API 서버 주소
    const authToken = (await cookies()).get('Authorization'); // 서버에서 쿠키 접근

    console.log("📢 서버 액션 실행됨");
    console.log("📢 Authorization 쿠키:", authToken);
    console.log("📢 FormData 내용:", formData);

    if (!authToken) {
        console.error("❌ 인증 토큰이 없습니다.");
        throw new Error("인증 토큰이 필요합니다.");
    }

    try {
        const response = await fetch(`${baseUrl}/review`, {
            method: "POST",
            headers: {
                Authorization: authToken.value,
            },
            body: formData,
        });

        console.log("리뷰 등록 api 상태 코드", response.status);

        // 서버 응답이 JSON이 아닐 수도 있기 때문에 text로 먼저 확인
        const data = await response.json();
        console.log("📢 서버 응답 원본:", data);

        if (!response.ok) {
            throw new Error(data.message || "리뷰 등록 실패");
        }

        // const data = await response.json();

        // return await response.json(); // 성공 응답 반환
        return data;
    } catch (error) {
        console.error("리뷰 등록 api 요청 중 오류 발생", error);
        throw new Error(error instanceof Error ? error.message : "알 수 없는 오류 발생");
    }
}
