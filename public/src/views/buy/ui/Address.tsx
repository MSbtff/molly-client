import {GoogleIcon} from '../../../shared/ui/GoogleIcon';
import ContactInfo from './ContactInfo';

export const Address = () => {
  return (
    <>
      <div className="mt-4 w-[700px] h-[205px] flex flex-col bg-white rounded-[10px] border p-4">
        <div className="flex justify-between">
          <h2 className="font-semibold">배송 주소</h2>
          <div>주소 변경</div>
        </div>
        <ContactInfo />
        <div className="mt-12 w-full h-9 rounded-[10px] border flex justify-between items-center p-2">
          <div>요청사항 없음</div>
          <GoogleIcon name="arrow_forward_ios" size="18" />
        </div>
      </div>
    </>
  );
};
