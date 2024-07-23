import Button from '@/components/common/Button';
import Image from 'next/image';
import noLinkIcon from '~/public/no-link-icon.png';

const DashboardLinks = () => {
  return (
    <div className='flex flex-col h-full'>
      <section className='h-full p-10 flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[2rem] font-bold leading-[48px] text-dark-default'>
            Customize your links
          </h1>
          <p className='text-dark-light leading-6'>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>

        <aside className='flex flex-col gap-7 w-full h-full'>
          <Button
            btnClassName='w-full border border-prim-default bg-transparent text-prim-default font-bold hover:bg-sec-light'
            type='button'
          >
            + Add new link
          </Button>
          <section className='w-full h-full bg-sec-lighter rounded-xl flex flex-col items-center justify-center'>
            <div className='mb-10'>
              <Image src={noLinkIcon} alt='No Link Icon' />
            </div>
            <div className='flex flex-col gap-6'>
              <h1 className='text-center text-dark-default text-[2rem] font-bold leading-[48px]'>
                Let&apos;s get you started
              </h1>
              <p className='w-[488px] text-dark-light text-center leading-6'>
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We&apos;re here to
                help you share your profiles with everyone!
              </p>
            </div>
          </section>
        </aside>
      </section>
      <footer className='px-10 py-6 flex flex-col gap-2 self-stretch items-end border-t-2 border-sec-default'>
        <div className='w-full flex justify-end'>
          <Button
            btnClassName='w-fit bg-prim-default/25 text-white'
            type='button'
          >
            Save
          </Button>
        </div>
      </footer>
    </div>
  );
};
export default DashboardLinks;
