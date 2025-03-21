import { batchProduct } from "../api/batchProduct";
import { useState } from "react";

export const ProductBatch = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string }>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // 파일이 선택되었는지 확인
    if (!file || file.size === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    // 파일 타입 확인 (엑셀 파일만 허용)
    if (!file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      alert("엑셀 파일(.xls 또는 .xlsx)만 업로드 가능합니다.");
      return;
    }

    setIsUploading(true);
    setResult({});

    try {
      console.log(
        "업로드할 파일:",
        file.name,
        "크기:",
        file.size,
        "타입:",
        file.type
      );
      const response = await batchProduct(file);

      setResult({
        success: true,
        message: "상품 일괄 등록이 성공적으로 완료되었습니다.",
      });

      console.log("API 응답:", response);
      // 폼 초기화 (선택 사항)
    } catch (error) {
      console.error("상품 일괄 등록 중 오류 발생:", error);
      setResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "상품 일괄 등록에 실패했습니다.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">상품 일괄 등록</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="file-upload"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            엑셀 파일 업로드 (.xls, .xlsx)
          </label>

          <input
            id="file-upload"
            name="file"
            type="file"
            accept=".xls, .xlsx"
            required
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-medium
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />

          <p className="mt-1 text-xs text-gray-500">
            지정된 양식의 엑셀 파일만 업로드 가능합니다.
          </p>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`py-2 px-4 rounded-md text-white ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isUploading ? "업로드 중..." : "업로드"}
        </button>
      </form>

      {/* 결과 메시지 표시 */}
      {result.message && (
        <div
          className={`mt-4 p-3 rounded-md ${
            result.success
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
};
