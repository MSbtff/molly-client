import { get } from "@/shared/util/lib/fetchAPI";
import "./global.css";
import Navbar from "@/widgets/navbar/Navbar";
import Footer from "@/widgets/Footer";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";

export interface UserInfoResponse {
  profileImage: string;
  nickname: string;
  name: string;
  birth: string;
  cellPhone: string;
  email: string;
}

export const metadata: Metadata = {
  title: "Molly",
  description: "패션을 쉽게 Molly에서 만나보세요.",

  openGraph: {
    title: "Molly - 패션을 쉽게",
    description: "패션을 쉽게 Molly에서 만나보세요.",
    url: "https://mollymol.com",
    siteName: "Molly",
    images: [
      {
        url: "/images/suggestion/추천12.jpg",
        width: 800,
        height: 600,
        alt: "Molly Logo",
        type: "image/jpeg",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/molly.svg", type: "image/svg+xml" },
    ],
    apple: "/mollyLogo.svg", // 180x180 크기 권장
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 헤더에서 referer 확인
  const headersList = headers();
  const referer = (await headersList).get("referer") || "";
  const url = (await headersList).get("x-url") || "";

  // URL에서 경로 추출하는 함수
  const extractPath = (urlString: string) => {
    try {
      const url = new URL(urlString);
      return url.pathname;
    } catch {
      return "";
    }
  };

  const pathname =
    (await headersList).get("x-pathname") ||
    (await headersList).get("x-invoke-path") ||
    extractPath(referer) ||
    extractPath(url) ||
    "";

  console.log("현재 경로:", pathname);
  const isSellerRoute = pathname.includes("/seller");

  if (isSellerRoute) {
    console.log("판매자 레이아웃 적용");
    return (
      <html lang="ko">
        <body className="bg-white min-h-screen">{children}</body>
      </html>
    );
  }

  const authToken = (await cookies()).get("Authorization")?.value;
  let nickname = "";

  // 토큰이 있는 경우에만 사용자 정보 요청 시도
  if (authToken) {
    try {
      const res = await get<UserInfoResponse>("/user/info");
      nickname = res?.nickname || "";
    } catch (error) {
      console.error("사용자 정보를 가져오는 중 오류가 발생했습니다:", error);
    }
  }

  return (
    <html lang="ko">
      <head>
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_IMAGE_URL || ""}
        />
        <link
          rel="preconnect"
          href={process.env.NEXT_PUBLIC_IMAGE_URL || ""}
          crossOrigin="anonymous"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </head>
      <body className="min-h-screen">
        <Navbar nickname={nickname} />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
