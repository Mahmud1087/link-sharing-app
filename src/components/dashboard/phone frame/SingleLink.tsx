import { cn } from '@/utils/cn';

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
        'h-11 px-4 py-3 items-center justify-center rounded-lg bg-red-600 text-white text-sm'
      )}
    >
      {provider}
    </a>
  );
};
export default SingleLink;
