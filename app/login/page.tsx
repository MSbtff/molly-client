import Footer from '../../src/widgets/Footer';
import Navbar from '../../src/widgets/navbar/Navbar';
import {LoginFormPage} from '../../src/features/login/ui/LoginFormPage';

export default function Page() {
  return (
    <>
      <Navbar />
      <LoginFormPage />
      <Footer />
    </>
  );
}
