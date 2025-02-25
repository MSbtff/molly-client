import {Order} from './BuyAddress';

type InfoRowProps = {
  label: string;
  value: string;
};

interface ContactInfoProps {
  userInfo: Order;
}

const InfoRow = ({label, value}: InfoRowProps) => (
  <div className="w-[435px] flex gap-20">
    <div>{label}</div>
    <div>{value}</div>
  </div>
);

const ContactInfo = ({userInfo}: ContactInfoProps) => {
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const {roadAddress, addrDetail, recipient, recipientCellPhone} =
    userInfo.defaultAddress;

  const contactData = [
    {label: '받는분', value: recipient},
    {label: '연락처', value: recipientCellPhone},
    {label: '배송지', value: `${roadAddress} ${addrDetail || ''}`},
  ];

  return (
    <div>
      {contactData.map((item, index) => (
        <InfoRow key={index} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default ContactInfo;
