'use client';

type NavLinksProperties = {
  href: string;
  children: React.ReactNode;
};

import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { useAppContext } from '@/context/AppContext';

const NavLinks = ({ href, children }: NavLinksProperties) => {
  const { dashboardPage, setDashboardPage } = useAppContext();
  const pathname = usePathname();

  return (
    <button
      type='button'
      className={cn(
        'flex items-center gap-2 font-semibold py-3 px-7 rounded-lg text-dark-light transition-all leading-6 bg-transparent hover:text-prim-default',
        {
          'bg-sec-light text-prim-default': href === dashboardPage,
        }
      )}
      onClick={() => setDashboardPage(href)}
    >
      {children}
    </button>
  );
};
export default NavLinks;
