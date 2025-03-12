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
