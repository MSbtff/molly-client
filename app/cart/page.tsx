import Navbar from '@/widgets/navbar/Navbar';
import {CartComponent} from '../../src/views/cart/ui/CartComponent';
import Footer from '@/widgets/Footer';

export default async function CartPage() {
  return (
    <>
      <Navbar />
      <CartComponent />
      <Footer />
    </>
  );
}
