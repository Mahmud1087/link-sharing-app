'use client';

import { useAppContext } from '@/context/AppContext';
import PhoneFrame from './PhoneFrame';
import { auth } from '@/firebase/config';
import { useEffect, useState } from 'react';
import SingleLink from './SingleLink';

const PhonePreview = () => {
  const { email, data } = useAppContext();
  const user = auth.currentUser;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <PhoneFrame>
        <section className='py-6 px-[1.5rem] h-full w-full flex flex-col gap-14'>
          <div className='w-full h-44 bg-white'>
            <div className='flex flex-col gap-6 self-stretch items-center'>
              <div className='w-24 h-24 rounded-full bg-[#eee]'></div>
              <div className='flex flex-col items-center gap-3'>
                {user?.displayName === null || !isClient ? (
                  <h1 className='w-40 h-4 rounded-full bg-[#eee]'></h1>
                ) : (
                  <h1 className='text-[18px] font-semibold text-dark-default leading-[27px] capitalize'>
                    {user?.displayName}
                  </h1>
                )}
                {email === null || !isClient ? (
                  <p className='w-[4.5rem] h-2 rounded-full bg-[#eee]'></p>
                ) : (
                  <p className='text-dark-light text-sm'>{email}</p>
                )}
              </div>
            </div>
          </div>
          <section className='flex flex-col gap-5 w-full h-full'>
            {[1, 2, 3, 4, 5].map((item, i) => {
              return (
                <>
                  {data[i] ? (
                    <SingleLink {...data[i]} />
                  ) : (
                    <div
                      key={item}
                      className='w-full rounded-lg bg-[#eee] h-11 self-stretch'
                    ></div>
                  )}
                </>
              );
            })}
          </section>
        </section>
      </PhoneFrame>
    </div>
  );
};
export default PhonePreview;
