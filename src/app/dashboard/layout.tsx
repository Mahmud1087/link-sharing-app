import Navbar from '@/components/dashboard/navbar/Navbar';
import PhoneFrame from '@/components/dashboard/phone frame/PhoneFrame';
import PhonePreview from '@/components/dashboard/phone frame/PhonePreview';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='m-6 flex flex-col gap-6'>
      <Navbar />

      <div className='flex gap-6'>
        <section className='h-[834px] w-2/5 bg-white rounded-xl flex items-center justify-center'>
          <PhonePreview />
        </section>
        <div className='w-3/5 h-[834px] bg-white rounded-xl'>{children}</div>
      </div>
    </section>
  );
}
