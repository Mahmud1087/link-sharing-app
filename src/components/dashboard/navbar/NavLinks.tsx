'use client';

type NavLinksProperties = {
  href: string;
  children: React.ReactNode;
};

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/cn';

const NavLinks = ({ href, children }: NavLinksProperties) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        'flex items-center gap-2 font-semibold py-3 px-7 rounded-lg text-dark-light transition-all leading-6 bg-transparent hover:text-prim-default',
        {
          'bg-sec-light text-prim-default': pathname === href,
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
};
export default NavLinks;
