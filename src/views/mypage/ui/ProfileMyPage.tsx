import Image from 'next/image';
import logo from '../../../../public/logo.webp';

export interface PointRes {
  point: number;
  name: string;
  email: string;
}
export interface ProfileProps {
  pointRes: PointRes;
}

export const ProfileMyPage = ({pointRes}: ProfileProps) => {
  return (
    <div className=" flex p-8 border rounded-[10px]">
      <div>
        <Image
          src={logo}
          alt="profile"
          loading="eager"
          width={60}
          height={60}
        />
      </div>
      <div className="w-full flex justify-between">
        <div className="flex flex-col">
          <strong>{pointRes.name}</strong>
          <p>{pointRes.email}</p>
        </div>
        <div className="flex items-center">{/* <div>프로필 관리</div> */}</div>
      </div>
    </div>
  );
};
