import Logo from '@/components/common/Logo';
import RegisterForm from '@/components/forms/RegisterForm';

const Register = () => {
  return (
    <div>
      <div className='py-20 flex justify-center items-center'>
        <section className='w-full h-full flex flex-col items-center justify-center gap-[51px]'>
          <aside className='w-full flex justify-center'>
            <Logo />
          </aside>
          <div className='p-10 rounded-xl bg-white flex flex-col justify-start w-[476px] mx-auto gap-10'>
            <article className='flex gap-2 self-stretch flex-col'>
              <h1 className='text-[2rem] font-bold leading-[48px] text-dark-default'>
                Create account
              </h1>
              <p className='leading-6 text-dark-light'>
                Let&apos;s get you started sharing your links!
              </p>
            </article>
            <RegisterForm />
          </div>
        </section>
      </div>
    </div>
  );
};
export default Register;
