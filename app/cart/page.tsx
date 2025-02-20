import Navbar from '@/widgets/navbar/Navbar';
import {CartComponent} from '../../src/views/cart/ui/CartComponent';
import Footer from '@/widgets/Footer';
import {cartRead} from '@/features/cart/api/cartRead';
import {revalidatePath} from 'next/cache';

export default async function CartPage() {
  return (
    <>
      <Navbar />
      <CartComponent />
      <Footer />
    </>
  );
}
