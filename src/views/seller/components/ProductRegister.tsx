'use client';

export const ProductRegister = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="rounded-xl bg-muted/50 p-6">
        <h2 className="text-2xl font-bold mb-6">상품 등록</h2>
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">상품명</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="상품명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">가격</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                placeholder="가격을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">카테고리</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="카테고리를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">색상</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="색상을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">사이즈</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="사이즈를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">수량</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                placeholder="수량을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                상품 이미지
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                placeholder="이미지 업로드로 변경 예정"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                상세 설명
              </label>
              <input
                type="area"
                className="w-full p-2 border rounded-md"
                placeholder="제품의 상세 설명을 입력하세요"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-md"
          >
            상품 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};
