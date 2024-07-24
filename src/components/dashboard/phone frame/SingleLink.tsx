import { cn } from '@/utils/cn';

type SingleLinkProps = {
  id: string;
  link: string;
  provider: string;
  color: string;
};

const SingleLink = ({ id, link, provider, color }: SingleLinkProps) => {
  return (
    <a
      target='_blank'
      href={link}
      className={cn(
        'h-11 px-4 py-3 items-center justify-center rounded-lg bg-red-600 text-white text-sm',
        {
          color,
        }
      )}
    >
      {provider}
    </a>
  );
};
export default SingleLink;
