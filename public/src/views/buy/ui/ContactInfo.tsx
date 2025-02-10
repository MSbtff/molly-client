type InfoRowProps = {
  label: string;
  value: string;
};

const InfoRow = ({label, value}: InfoRowProps) => (
  <div className="w-[435px] flex gap-20">
    <div>{label}</div>
    <div>{value}</div>
  </div>
);

const ContactInfo = () => {
  const contactData = [
    {label: '받는분', value: '김구름'},
    {label: '연락처', value: '010-1234-5678'},
    {label: '배송지', value: '경기도 성남시 분당구 판교로 242'},
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
