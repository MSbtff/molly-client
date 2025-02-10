import {cn} from '../util/lib/utils';

//아이콘 이름 정의 및 추가
type GoogleIconName = 'arrow_forward_ios' | 'refresh' | 'content_copy' | 'help';

interface GoogleIconProps {
  name: GoogleIconName;
  size?: string;
  className?: string;
}

export const GoogleIcon = ({name, size = '24', className}: GoogleIconProps) => {
  return (
    <span
      className={cn('material-symbols-outlined', className)}
      style={{fontSize: `${size}px`}}
    >
      {name}
    </span>
  );
};
