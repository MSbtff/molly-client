import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mt-4 text-2xl font-medium text-gray-600">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="mt-2 text-gray-500">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-2 text-white bg-black rounded-md hover:bg-gray-500 transition-colors duration-300"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
