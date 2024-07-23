import PhoneFrame from './PhoneFrame';

const PhonePreview = () => {
  return (
    <div>
      <PhoneFrame>
        <section className='py-6 px-[1.5rem] h-full w-full flex flex-col gap-14'>
          <div className='w-full h-44 bg-white'>
            <aside className='flex flex-col gap-6 self-stretch items-center'>
              <div className='w-24 h-24 rounded-full bg-[#eee]'></div>
              <article className='flex flex-col items-center gap-3'>
                <h1 className='w-40 h-4 rounded-full bg-[#eee]'></h1>
                <p className='w-[4.5rem] h-2 rounded-full bg-[#eee]'></p>
              </article>
            </aside>
          </div>
          <section className='flex flex-col gap-5 w-full h-full'>
            {Array.from([1, 2, 3, 4, 5]).map((item) => {
              return (
                <div
                  key={item}
                  className='w-full rounded-lg bg-[#eee] h-11 self-stretch'
                ></div>
              );
            })}
          </section>
        </section>
      </PhoneFrame>
    </div>
  );
};
export default PhonePreview;
