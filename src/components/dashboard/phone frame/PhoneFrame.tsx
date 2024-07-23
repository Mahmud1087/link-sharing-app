const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-[631px] w-[307px] border-2 border-dark-light rounded-[3.5rem] flex flex-col items-center justify-center'>
      <section className='h-[611px] w-[285px] border-2 border-dark-light rounded-[calc(3.5rem-11px)] flex flex-col items-center'>
        <article className='h-6 w-32 relative border border-t-0 border-dark-light rounded-3xl inner-frame'>
          <div className='absolute h-3 w-32 -top-2 left-1/2 -translate-x-1/2 bg-white'></div>
        </article>
        {children}
      </section>
    </div>
  );
};
export default PhoneFrame;
