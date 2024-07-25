'use client';

import Button from '@/components/common/Button';
import Footer from '@/components/dashboard/Footer';
import PageHeading from '@/components/dashboard/PageHeading';
import AddNewLinkComponent from '@/components/dashboard/profile-page/AddNewLinkComponent';
import { useAppContext } from '@/context/AppContext';
import { auth, firestore } from '@/firebase/config';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect } from 'react';
import noLinkIcon from '~/public/no-link-icon.png';

const DashboardLinks = () => {
  const user = auth.currentUser;
  const { data, setData } = useAppContext();

  // const getData = async () => {
  //   try {
  //     if (user) {
  //       const docRef = doc(firestore, 'users', user.uid);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         console.log(docSnap.data());
  //         // setData(docSnap.data());
  //       } else {
  //         console.log('No such document!');
  //       }
  //     } else {
  //       console.log('No user signed in!');
  //     }
  //   } catch (error) {
  //     if (error instanceof FirebaseError) {
  //       console.log(error.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className='flex flex-col h-full'>
      <section className='h-full p-10 flex flex-col gap-10'>
        <PageHeading
          heading='Customize your links'
          subheading='Add/edit/remove links below and then share all your profiles with the
        world!'
        />

        <aside className='flex flex-col gap-7 w-full h-full'>
          <Button
            btnClassName='w-full border border-prim-default bg-transparent text-prim-default font-bold hover:bg-sec-light'
            type='button'
          >
            + Add new link
          </Button>
          {data.length === 0 ? (
            <section className='w-full h-full bg-sec-lighter rounded-xl flex flex-col items-center justify-center'>
              <div className='mb-10'>
                <Image src={noLinkIcon} alt='No Link Icon' />
              </div>
              <div className='flex flex-col gap-6'>
                <h1 className='text-center text-dark-default text-[2rem] font-bold leading-[48px]'>
                  Let&apos;s get you started
                </h1>
                <p className='w-[488px] text-dark-light text-center leading-6'>
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We&apos;re
                  here to help you share your profiles with everyone!
                </p>
              </div>
            </section>
          ) : (
            <AddNewLinkComponent />
          )}
        </aside>
      </section>
      <Footer btnType='button' disabled={data.length === 0} />
    </div>
  );
};
export default DashboardLinks;
