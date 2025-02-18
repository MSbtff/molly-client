'use client';

import {useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

type Product = {
  id: number;
  categories: string[];
  brandName: string;
  productName: string;
  price: number;
  description: string;
  thumbnail: {
    path: string;
    filename: string;
  };
  productImages: [
    {
      path: string;
      filename: string;
    }
  ];
  productDescriptionImages: [
    {
      path: string;
      filename: string;
    }
  ];
  items: [
    {
      id: number;
      color: string;
      size: string;
      colorCode: string;
      quantity: number;
    }
  ];
  colorDetails: [
    {
      color: string;
      colorCode: string;
      sizeDetails: [
        {
          id: number;
          size: string;
          quantity: number;
        }
      ];
    }
  ];
};

export const ProductRetriever = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`api/product`, {
          method: 'GET',

          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('상품 데이터:', data);

        if (Array.isArray(data)) {
          // setProducts([data]);
        } else {
          setProducts(data);
        }

        setProducts(data as Product[]);
      } catch (error) {
        console.error('상품을 가져오는데 실패했습니다:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Table>
          <TableCaption>최근 판매 내역</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">상품 ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">진행 상황</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.brandName}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
