// API Route - Next.js 내부에서 API 요청 처리
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_SERVER_URL;

export async function GET(req: Request) {
    const authToken = (await cookies()).get('Authorization'); // 쿠키에서 토큰 가져오기
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    if (!authToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    }

    if (!productId) {
        return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    try {
        const response = await fetch(`${baseUrl}/review/${productId}`, {
            method: "GET",
            headers: {
                Authorization: authToken.value, // 토큰 포함
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch reviews" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data); // 프론트엔드에서 사용할 데이터 반환
    } catch (error) {
        console.error("리뷰 조회 api 에러:", error);
    }
}
