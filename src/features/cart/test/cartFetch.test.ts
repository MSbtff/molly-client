import { OrderItem } from './../../../app/provider/OrderStore';
import { deleteRequest, fetchAPI, get, post } from '@/shared/util/lib/fetchAPI';
import { CartItem, cartRead } from '../api/cartRead';
import { cartUpdate } from '../api/cartUpdate';
import cartDelete from '../api/cartDelete';
import cartOrder from '../api/cartOrder';
import { decryptToken } from '@/shared/util/lib/encrypteToken';


jest.mock('next/headers', () =>  ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({value: 'encryptToken'}),
  })
}));

jest.mock('@/shared/util/lib/encrypteToken', () => ({
  decryptToken: jest.fn().mockReturnValue('decryptToken'),
}))

jest.mock('@/shared/util/lib/fetchAPI', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  deleteRequest: jest.fn(),
  fetchAPI: jest.fn(),
}));

global.fetch = jest.fn()




// 모의 데이터
const mockCartItems: CartItem[] = [
  {
    cartInfoDto: {
      cartId: 1,
      itemId: 101,
      productId: 1001,
      productName: '테스트 상품 1',
      brandName: '테스트 브랜드',
      price: 10000,
      quantity: 1,
      color: 'Black',
      size: 'M',
      url: '/images/test.jpg',
    },
    colorDetails: [
      {
        color: 'Black',
        colorCode: '#000000',
        sizeDetails: [
          { id: 101, size: 'M', quantity: 10 },
          { id: 102, size: 'L', quantity: 5 },
        ],
      },
    ],
  },
  {
    cartInfoDto: {
      cartId: 2,
      itemId: 102,
      productId: 1002,
      productName: '테스트 상품 2',
      brandName: '테스트 브랜드',
      price: 20000,
      quantity: 2,
      color: 'White',
      size: 'L',
      url: '/images/test2.jpg',
    },
    colorDetails: [
      {
        color: 'White',
        colorCode: '#FFFFFF',
        sizeDetails: [
          { id: 201, size: 'M', quantity: 8 },
          { id: 202, size: 'L', quantity: 12 },
        ],
      },
    ],
  },
];

 
  
  

  describe('cartOrder 함수', () => {

    beforeEach(()=> {
      (global.fetch as jest.Mock).mockReturnValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ orderId: 1 }),
      })

      
    })

    it('장바구니 주문 생성 API 호출이 성공해야 함', async () => {
      // API 응답 모킹
      const orderItems = [{ cartId: 1 }, { cartId: 2 }];

      // 함수 실행
      const result = await cartOrder(orderItems);


      // 검증
      expect(result).toEqual({orderId: 1});
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/orders',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'decryptToken',
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({ cartOrderRequests: orderItems }),
        })
      );
    });

    it('장바구니 조회 API 호출 실패 시 에러를 던져야 함', async () => {
      // API 오류 모킹
      (global.fetch as jest.Mock).mockReturnValue({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValue({ message: 'Bad Request' }),
      })
      
      const orderItems = [{ cartId: 1 }];

      // 에러 발생 테스트
      await expect(cartOrder(orderItems)).rejects.toThrow('API 실패');
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });




