import './global.css';

export const metadata = {
  title: 'Molly',
  description: '패션을 쉽게 Molly에서 만나보세요.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}
