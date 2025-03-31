"use server";

import { revalidatePath } from "next/cache";

export default async function getProduct(paramsString: string) {
  try {
    const res = await fetch(`${paramsString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("url 정보:", paramsString);

    // if (!res.ok) {
    //   throw new Error("상품 정보 요청 실패");
    // }
    console.log(res);
    revalidatePath("/product");
    return res.json();
  } catch (error) {
    console.error("상품 정보 요청 실패:", error);
  }
}
