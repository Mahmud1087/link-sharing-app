import Image from 'next/image';
import linkIcon from '~/public/linkIcon.svg';

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <aside>
        <Image src={linkIcon} alt='link icon' />
      </aside>

      <h1 className='text-[2rem] font-bold text-dark-default'>devlinks</h1>
    </div>
  );
};
export default Logo;
