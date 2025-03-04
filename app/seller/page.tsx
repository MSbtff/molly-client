import retrieverProduct from '@/views/seller/api/retrieverProduct';
import SellerContainer from '../../src/views/seller/ui/SellerContainer';

export interface ProductData {
  id: number;
  categories: string[];
  brandName: string;
  productName: string;
  price: number;
  description: string;
  thumbnail?: Thumbnail;
}

interface Thumbnail {
  path: string;
  filename: string;
}

export interface Pageable {
  size: number;
  hasNext: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export default async function Page() {
  const productRes = await retrieverProduct();
  console.log(productRes?.success);

  return (
    <>
      <SellerContainer productRes={productRes} />
    </>
  );
}
