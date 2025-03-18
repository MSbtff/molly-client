import { CartComponent } from "../../src/views/cart/ui/CartComponent";

export default async function CartPage() {
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
