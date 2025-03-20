"use server";

import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";
import { revalidatePath } from "next/cache";

export interface ProductItem {
  id: number;
  color: string;
  colorCode: string;
  size: string;
  quantity: number;
}

export interface ProductUpdateData {
  categories: string[];
  brandName: string;
  productName: string;
  price: number;
  description: string;
  items: ProductItem[];
}

export async function updateProduct(
  productId: number,
  data: ProductUpdateData
) {
  const authToken = await getValidAuthToken();
  if (!authToken) {
    throw new Error("인증되지 않은 요청입니다.");
  }

  try {
    console.log("API 요청 데이터 전체:", JSON.stringify(data, null, 2));

    // FormData 생성 - 중요: 전체 데이터를 'product' 필드에 JSON 문자열로 추가
    const formData = new FormData();
    formData.append("product", JSON.stringify(data));

    // FormData 내용 확인
    console.log("FormData 내용:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${typeof value === "string" ? value : "[object]"}`);
    }

    const apiUrl = `${process.env.NEXT_SERVER_URL}/product/${productId}`;
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `${authToken}`,
        // fetch API가 multipart/form-data 형식과 올바른 boundary를 자동으로 설정합니다
      },
      body: formData,
    });

    console.log("응답 상태:", response.status);
    console.log("응답 헤더:", Object.fromEntries(response.headers.entries()));

    revalidatePath("/seller");
    return await response.json();
  } catch (error) {
    console.error("상품 수정 중 오류 발생:", error);
    throw error;
  }
}

export async function getProduct(productId: number) {
  const authToken = await getValidAuthToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_SERVER_URL}/product/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("상품 조회에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("상품 조회 중 오류가 발생했습니다.");
  }
}
