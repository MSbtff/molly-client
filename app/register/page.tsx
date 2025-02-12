import {RegisterContain} from '../../src/features/register/RegisterContain';
import Footer from '../../src/widgets/Footer';
import Navbar from '../../src/widgets/navbar/Navbar';

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <RegisterContain />
      <Footer />
    </>
  );
}
