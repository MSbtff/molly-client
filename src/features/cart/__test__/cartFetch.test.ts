
import {deleteRequest, get, post} from '@/shared/util/lib/fetchAPI';
import { CartItem, cartRead } from '../api/cartRead';
import { cartUpdate } from '../api/cartUpdate';
jest.mock('../../../shared/util/lib/fetchAPI', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  deleteRequest: jest.fn(),
  fetchAPI: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockImplementation(() =>
    Promise.resolve({
      get: jest.fn().mockImplementation((name) => {
        if (name === 'Authorization')
          return {
            value: 'test-token',
          };
        return null;
      }),
    })
  ),
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
