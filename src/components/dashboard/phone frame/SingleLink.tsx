import { cn } from '@/utils/cn';
import { dropdownList } from '@/utils/helper';
import { FaArrowRight, FaFacebook, FaLinkedin } from 'react-icons/fa6';
import { SiFrontendmentor } from 'react-icons/si';
import { TbBrandGithubFilled, TbBrandYoutubeFilled } from 'react-icons/tb';

type SingleLinkProps = {
  link: string;
  provider: string;
};

const SingleLink = ({ link, provider }: SingleLinkProps) => {
  return (
    <a
      target='_blank'
      href={link}
      className={cn(
        'h-11 px-4 py-3 flex items-center justify-between rounded-lg bg-red-600 text-white text-sm',
        {
          'bg-[#1A1A1A]': provider === 'Github',
          'bg-[#1877f2]': provider === 'Facebook',
          'bg-[#EE3939]': provider === 'YouTube',
          'bg-[#2D68FF]': provider === 'LinkedIn',
          'bg-[#35465d]': provider === 'Frontend Mentor',
        }
      )}
    >
      <div className='flex items-center gap-5'>
        {provider === 'Github' ? (
          <p>
            <TbBrandGithubFilled />
          </p>
        ) : provider === 'Facebook' ? (
          <p>
            <FaFacebook />
          </p>
        ) : provider === 'YouTube' ? (
          <p>
            <TbBrandYoutubeFilled />
          </p>
        ) : provider === 'LinkedIn' ? (
          <p>
            <FaLinkedin />
          </p>
        ) : provider === 'Frontend Mentor' ? (
          <p>
            <SiFrontendmentor />
          </p>
        ) : null}
        {provider}
      </div>
      <FaArrowRight />
    </a>
  );
};
export default SingleLink;
