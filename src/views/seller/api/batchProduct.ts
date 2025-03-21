"use server";

import { getValidAuthToken } from "@/shared/util/lib/authTokenValue";

export async function batchProduct(file: File) {
  const authToken = await getValidAuthToken();

  try {
    const formData = new FormData();
    formData.append("product_file", file);

    const res = await fetch(`${process.env.NEXT_SERVER_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: ` ${authToken}`,
      },
      body: formData,
    });

    console.log(res.status);

    if (res.ok) {
      const data = await res.json();
      console.log("Batch product response:", data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}
