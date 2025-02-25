import {SideMyPage} from '@/views/mypage/ui/SideMyPage';
import Footer from '@/widgets/Footer';
import Navbar from '@/widgets/navbar/Navbar';

export const metadata = {
  title: '마이페이지',
  description: '패션을 쉽게 Molly에서 만나보세요.',
};

export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-w-screen min-h-screen">
      <Navbar />
      <main className="flex-auto">
        <div className="flex  xl:justify-center">
          <SideMyPage />
          <div>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
