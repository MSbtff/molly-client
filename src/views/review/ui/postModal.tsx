// components/PostModal.tsx
"use client";

import { useState } from "react";

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; //api 서버 주소
    const [reviewText, setReviewText] = useState("");//리뷰 텍스트
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // 여러 개의 이미지 미리보기 상태
    const [imageFiles, setImageFiles] = useState<File[]>([]); // 실제 파일 데이터 저장

    // 이미지 파일 선택 시 미리보기 생성 (여러 개 가능)
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files); // 여러 개 파일을 배열로 변환
            const newImagePreviews: string[] = [];
            const newImageFiles: File[] = [];

            filesArray.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImagePreviews.push(reader.result as string);
                    setImagePreviews((prev) => [...prev, ...newImagePreviews]); // 미리보기 추가
                };
                reader.readAsDataURL(file); // 파일을 Base64로 변환
                newImageFiles.push(file);
            });

            setImageFiles((prev) => [...prev, ...newImageFiles]); // 실제 파일 배열 추가
        }
    };

    // 선택한 이미지 삭제 기능
    const removeImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // FormData로 이미지와 리뷰 텍스트 백엔드로 전송
    const handleSubmit = async () => {
        const formData = new FormData();

        // 리뷰 객체 추가 (id를 224로 하드코딩)
        const reviewData = {
            id: 224, // 하드코딩된 ID
            content: reviewText,
        };

        // formData.append("reviewText", reviewText);
        formData.append("review", new Blob([JSON.stringify(reviewData)], { type: "application/json" }));

        // 이미지 배열 추가
        imageFiles.forEach((file) => {
            formData.append("reviewImages", file);
        });

        try {
            const response = await fetch(`${baseUrl}/review`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                // throw new Error("리뷰 올리기 실패", response.status);
                console.log("리뷰 올리기 실패", response.status);
                alert("리뷰 등록이 실패하였습니다.");
            }else{
                console.log("업로드 성공");
            }
            onClose(); // 모달 닫기
        } catch (error) {
            console.error("업로드 오류:", error);
        }
    };

    if (!isOpen) return null; // 모달이 닫혀있으면 렌더링 X

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
                {/* 모달 헤더 */}
                <div className="flex justify-between items-center border-b pb-2">
                    <button className="text-gray-500" onClick={onClose}>
                        취소
                    </button>
                    <h2 className="text-lg font-semibold">리뷰 올리기</h2>
                    <button className="text-black font-medium" onClick={handleSubmit}>
                        등록
                    </button>
                </div>

                {/* 이미지 업로드 + 미리보기 */}
                <div className="flex gap-2 overflow-x-auto my-4">
                    {imagePreviews.map((src, index) => (
                        <div key={index} className="relative w-20 h-20">
                            <img src={src} alt={`미리보기-${index}`} className="w-full h-full object-cover rounded-md" />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                                onClick={() => removeImage(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/* 추가 버튼 */}
                    <label className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg cursor-pointer">
                        <span className="text-gray-400 text-xl">+</span>
                        <input type="file" className="hidden" onChange={handleImageChange} multiple />
                    </label>
                </div>

                {/* 리뷰 작성란 */}
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none resize-none h-80"
                    rows={4}
                    placeholder="리뷰를 작성해주세요"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>

                {/* 하단 버튼 */}
                <div className="flex justify-between mt-4">
                    <button className="border border-gray-400 text-black px-4 py-2 rounded-md" onClick={onClose}>
                        취소
                    </button>
                    <button className="bg-black text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}
