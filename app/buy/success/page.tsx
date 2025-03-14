import PaymentProcessor from '@/features/buy/ui/PaymentProcessor';
import {BuyComplete} from '@/views/buy/ui/BuyComplete';
import Footer from '@/widgets/Footer';
import Navbar from '@/widgets/navbar/Navbar';

export default async function BuySuccess() {
  
  return (
    <>
      <Navbar />
      <div className="w-screen h-full flex justify-center items-center">
        <BuyComplete />
        <PaymentProcessor  />
      </div>
      <Footer />
    </>
  );
}
