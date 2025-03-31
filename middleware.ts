import { decryptToken } from "@/shared/util/lib/encrypteToken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호할 경로 목록
const protectedPaths = ["/mypage", "/buy", "/cart", "/seller"];
const excludedPaths = ["/fail?message="];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (excludedPaths.some((excludedPath) => pathname.startsWith(excludedPath))) {
    return NextResponse.next();
  }

  // 현재 경로가 보호된 경로인지 체크
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 보호된 경로가 아니면 그냥 통과
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // 요청 헤더의 쿠키 확인
  console.log("Request headers:", request.headers);
  console.log("Request cookies:", request.cookies.getAll());
  const testToken = request.cookies.get("Authorization");

  console.log(
    "Test token:",
    testToken?.value ? decryptToken(testToken.value) : "No token"
  );

  // 보호된 경로일 때만 인증 체크
  const authToken = request.cookies.get("Authorization");

  if (!authToken) {
    const returnUrl = encodeURIComponent(
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${returnUrl}`, request.url)
    );
  }

  // 응답에 토큰 추가 및 쿠키 재설정
  const response = NextResponse.next();
  return response;
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: ["/mypage/:path*", "/buy/:path*", "/cart/:path*", "/seller/:path*"],
};
