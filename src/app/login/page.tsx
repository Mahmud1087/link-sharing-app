import Logo from '@/components/common/Logo';
import LoginForm from '@/components/forms/LoginForm';

const Login = () => {
  return (
    <div className='py-20 flex justify-center items-center'>
      <section className='w-full h-full flex flex-col items-center justify-center gap-[51px]'>
        <aside className='w-full flex justify-center'>
          <Logo headerclassName='text-[2rem]' />
        </aside>
        <div className='p-10 rounded-xl bg-white flex flex-col justify-start w-[476px] mx-auto gap-10'>
          <article className='flex gap-2 self-stretch flex-col'>
            <h1 className='text-[2rem] font-bold leading-[48px] text-dark-default'>
              Login
            </h1>
            <p className='leading-6 text-dark-light'>
              Add your details below to get back into the app
            </p>
          </article>
          <LoginForm />
        </div>
      </section>
    </div>
  );
};
export default Login;
