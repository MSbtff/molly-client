import Image from 'next/image';
import Close from '../../../assets/close.svg';
import product from '../../../assets/product.png';
import Down from '../../../assets/down.svg';
import {Button} from '../../../shared/ui/Button';

interface OptionModalProps {
  onClose: () => void;
}

export const OptionModal = ({onClose}: OptionModalProps) => {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-40 z-1000">
        <div className="w-[490px] h-[730px] border flex flex-col bg-white rounded-[10px] p-4 shadow-md">
          <div className="flex justify-between">
            <div className="font-bold text-2xl">옵션 변경</div>
            <div onClick={onClose} className="cursor-pointer">
              <Close />
            </div>
          </div>
          <div className="w-full flex items-center gap-8 border-b-2 mt-12">
            <Image
              src={product}
              alt="product"
              width={80}
              height={80}
              loading="eager"
            />
            <div className="flex flex-col">
              <strong>상품명</strong>
              <p className="text-gray2">브랜드명</p>
            </div>
          </div>
          <div className="flex flex-col  gap-8">
            <div className="text-gray2">상품 컬러</div>
            <div className="w-full flex justify-between items-center border-b-2">
              <div>블루</div>
              <Down />
            </div>
            <div className="text-gray2">사이즈</div>
            <div className="w-full flex justify-between items-center border-b-2">
              <div>XL</div>
              <Down />
            </div>
            <div className="text-gray2">수량</div>
            <div className="w-full flex justify-between items-center border-b-2">
              <div>2</div>
              <Down />
            </div>
          </div>

          <div className="mt-24">
            <Button
              width="460px"
              height="52px"
              bg="black"
              color="white"
              radius="10px"
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
