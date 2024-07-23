import { cn } from '@/utils/cn';
import Image from 'next/image';
import linkIcon from '~/public/linkIcon.svg';

type LogoProperties = {
  headerclassName: string;
  imgClassName?: string;
};

const Logo = ({ headerclassName, imgClassName }: LogoProperties) => {
  return (
    <div className='flex items-center gap-2'>
      <aside className={cn(imgClassName)}>
        <Image src={linkIcon} alt='link icon' className='w-full h-full' />
      </aside>

      <h1 className={cn('font-bold text-dark-default', headerclassName)}>
        devlinks
      </h1>
    </div>
  );
};
export default Logo;
