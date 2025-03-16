import Navbar from '@/widgets/navbar/Navbar';
import {CartComponent} from '../../src/views/cart/ui/CartComponent';
import Footer from '@/widgets/Footer';
import { UserInfoResponse } from '../layout';
import { get } from '@/shared/util/lib/fetchAPI';

export default async function CartPage() {
      const res = await get<UserInfoResponse>('/user/info');
      const nickname = res?.nickname || '';

  return (
    <>
      <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
        <CartComponent />
      </main>
      
    </div>
    </>
  );
}
