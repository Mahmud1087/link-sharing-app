import Logo from '@/components/common/Logo';
import NavLinks from './NavLinks';
import Button from '@/components/common/Button';
import { CircleUserRound, Link } from 'lucide-react';

const links = [
  {
    label: 'Links',
    href: '/dashboard',
    icon: <Link width={17} strokeWidth={2.5} />,
  },
  {
    label: 'Profile Details',
    href: '/dashboard/profile',
    icon: <CircleUserRound width={17} strokeWidth={2.5} />,
  },
];

const Navbar = () => {
  return (
    <nav className='bg-white flex justify-between items-center py-4 pl-6 pr-4 rounded-xl self-stretch'>
      <Logo headerclassName='text-[1.75rem]' imgClassName='w-8' />

      <div className='flex gap-4 items-center'>
        {links.map((link) => {
          return (
            <NavLinks key={link.label} href={link.href}>
              {link.icon} {link.label}
            </NavLinks>
          );
        })}
      </div>

      <Button
        btnClassName='border border-prim-default bg-transparent text-prim-default font-semibold hover:bg-sec-light'
        type='button'
      >
        Preview
      </Button>
    </nav>
  );
};
export default Navbar;
