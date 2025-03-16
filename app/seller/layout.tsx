


export const metadata = {
  title: '판매자 페이지',
  description: '패션을 쉽게 Molly에서 만나보세요.',
};

export default async function sellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
     
      <main className="">
        <div className="">
          <div>{children}</div>
        </div>
      </main>
     
    </div>
  );
}
