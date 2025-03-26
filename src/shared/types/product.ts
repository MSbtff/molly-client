// types/product.ts
export interface Thumbnail {
    path: string;
    filename: string;
}
export interface Product {
    id: number;
    url: string;
    brandName: string;
    productName: string;
    price: number;
    thumbnail: Thumbnail;
}
export interface DetailProduct {
    id: number;
    categories: string[];
    brandName: string;
    productName: string;
    price: number;
    description: string;
    thumbnail: { path: string; filename: string };
    productImages: { path: string; filename: string }[];
    productDescriptionImages: { path: string; filename: string }[];
    items: {
      id: number;
      color: string;
      colorCode: string;
      size: string;
      quantity: number;
    }[];
  }