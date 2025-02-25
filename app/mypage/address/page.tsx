import addressRetriever from '@/features/address/api/addressRetriever';
import AddressContainer from '@/views/address/ui/AddressContainer';

export default async function AddressPage() {
  const addressRes = await addressRetriever();
  console.log(addressRes);

  return (
    <div className="w-full flex p-8 ">
      <AddressContainer addressRes={addressRes} />
    </div>
  );
}
