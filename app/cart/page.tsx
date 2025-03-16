import Navbar from '@/widgets/navbar/Navbar';
import {CartComponent} from '../../src/views/cart/ui/CartComponent';
import Footer from '@/widgets/Footer';

export default async function CartPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <CartComponent />
      </main>
      <Footer />
    </div>
    </>
  );
}
