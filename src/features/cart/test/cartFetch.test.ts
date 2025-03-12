
import {deleteRequest, get, post} from '@/shared/util/lib/fetchAPI';
import { CartItem, cartRead } from '../api/cartRead';
import { cartUpdate } from '../api/cartUpdate';
import cartDelete from '../api/cartDelete';
import cartOrder from '../api/cartOrder';

global.fetch = jest.fn();
process.env.NEXT_SERVER_URL = 'https://api.example.com';

jest.mock('../api/cartRead', () => ({
  cartRead: jest.fn().mockResolvedValue([/* 목 데이터 */])
}));

jest.mock('../api/cartUpdate', () => ({
  cartUpdate: jest.fn().mockResolvedValue({ success: true })
}));

jest.mock('../api/cartDelete', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({ success: true })
}));

jest.mock('../api/cartOrder', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({ orderId: 1 })
}));

jest.mock('../../../shared/util/lib/fetchAPI', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  deleteRequest: jest.fn(),
  fetchAPI: jest.fn(),
}));




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
          {id: 101, size: 'M', quantity: 10},
          {id: 102, size: 'L', quantity: 5},
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
          {id: 201, size: 'M', quantity: 8},
          {id: 202, size: 'L', quantity: 12},
        ],
      },
    ],
  },
];

describe('장바구니 api 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
});

describe('cartRead 함수 테스트', () => {
  it('장바구니 조회 API 호출이 성공적으로 이루어져야 함', async () => {
    (get as jest.Mock).mockResolvedValue(mockCartItems);
    const result = await cartRead();
    expect(result).toEqual(mockCartItems);
    expect(get).toBeCalledWith('/cart');
  });
  it('장바구니 조회 API 호출이 실패했을 때 에러를 던져야 함', async () => {
    (get as jest.Mock).mockRejectedValue(new Error('API 실패'));
    await expect(cartRead()).rejects.toThrow('API 실패');
  });
});


describe('cartUpdate 함수 테스트', () => {
  it('장바구니 추가 API 호출이 성공적으로 이루어져야 함', async() => {
    (post as jest.Mock).mockResolvedValue(mockCartItems);
    await cartUpdate(1, 101, 1);
    expect(post).toBeCalledWith('/cart', {cartId: 1, itemId: 101, quantity: 1});
  });
});


describe('cartDelete 함수 테스트', () => {
    it('장바구니 삭제 API 호출이 성공적으로 이루어져야 함', async() => {
      (deleteRequest as jest.Mock).mockResolvedValue(mockCartItems);
      await cartDelete(1);
      expect(deleteRequest).toBeCalledWith('/cart/1');
    });
});

describe('장바구니 주문 생성 테스트', () => {
  it('장바구니 생성 호출이 성공적으로 이루어져야 함', () => {
    const orderItems = [{cartId: 1}, {cartId: 2}];
    const mockResponse = {orderId: 1};
    (post as jest.Mock).mockResolvedValue(mockResponse);
    cartOrder(orderItems);
    expect(post).toBeCalledWith('/orders', {cartOrderRequests: orderItems});
  });
});