'use client';

import Button from '@/components/common/Button';
import Footer from '@/components/dashboard/Footer';
import PageHeading from '@/components/dashboard/PageHeading';
import AddNewLinkComponent from '@/components/dashboard/profile-page/AddNewLinkComponent';
import { useAppContext } from '@/context/AppContext';
import { auth, firestore } from '@/firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import noLinkIcon from '~/public/no-link-icon.png';
import { v4 as uuidv4 } from 'uuid';
import { FieldValues, useForm } from 'react-hook-form';
import { cn } from '@/utils/cn';

// type DataType = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   links: { link: string; provider: string }[];
// };

// const onSubmit = async (data: FieldValues) => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const docRef = doc(firestore, 'users', user.uid);

//         // Update the document data
//         updateDoc(docRef, {
//           firstName: `${data.firstName} ${data.lastName}`,
//           email: data.email,
//         });
//       }
//     });

//     //sleep for 1 sec
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     if (!isSubmitting) {
//       setSave(true);
//       setTimeout(() => {
//         setSave(false);
//       }, 4000);
//     }

const DashboardLinks = () => {
  const { data } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: submit },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scroll, setScroll] = useState(false);

  async function addLinkToFirestore(
    userId: string,
    newLink: { id: number | string; link: string; provider: string }
  ) {
    setIsSubmitting(true);
    try {
      const docRef = doc(firestore, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentLinks = currentData.links as {
          id: number | string;
          link: string;
          provider: string;
        }[];

        if (currentLinks.length !== 5) {
          currentLinks.push(newLink);
          toast.success('New link added', {
            position: 'top-center',
          });
        } else {
          toast.error('You can only add 5 links', {
            position: 'top-center',
          });
        }

        await updateDoc(docRef, {
          links: currentLinks,
        });
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error updating document:', error);
    }
  }

  const addLink = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        addLinkToFirestore(user.uid, {
          id: uuidv4(),
          link: '',
          provider: 'Github',
        });
      }
    });
  };

  async function updateForm(userId: string, data: FieldValues) {
    try {
      const docRef = doc(firestore, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const currentLinks = currentData.links as {
          id: number | string;
          link: string;
          provider: string;
        }[];

        const newLinks = currentLinks.map((link, index) => ({
          ...link,
          link: data[`link ${index + 1}`],
        }));

        await updateDoc(docRef, {
          links: newLinks,
        });
      }
    } catch (error) {
      console.error('Error updating document', error);
    }
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const user: User = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user);
          } else {
            reject(new Error('User not authenticated'));
          }
        });
      });

      await updateForm(user.uid, data);
    } catch (error) {}

    // //sleep for 1 sec
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // if (!isSubmitting) {
    //   // setSave(true);
    //   // setTimeout(() => {
    //   //   setSave(false);
    //   // }, 4000);
    // }
  };

  return (
    <div className='flex flex-col h-full'>
      <section className='h-[750px] p-10 flex flex-col gap-10'>
        <PageHeading
          heading='Customize your links'
          subheading='Add/edit/remove links below and then share all your profiles with the
        world!'
        />

        <aside className='flex flex-col gap-7 w-full h-full'>
          <Button
            btnClassName='w-full border border-prim-default bg-transparent text-prim-default font-bold hover:bg-sec-light'
            type='button'
            onClick={addLink}
            disabled={isSubmitting}
          >
            + Add new link
          </Button>
          {data.length === 0 ? (
            <section className='w-full h-full bg-sec-lighter rounded-xl flex flex-col items-center justify-center'>
              <div className='mb-10'>
                <Image src={noLinkIcon} priority={true} alt='No Link Icon' />
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
            <form
              id='linkFormId'
              onSubmit={handleSubmit(onSubmit)}
              className={cn(
                'flex flex-col gap-3 h-full overflow-y-auto transition-all mb-32',
                {
                  onscroll: scroll,
                }
              )}
              onMouseEnter={() => setScroll(true)}
              onMouseLeave={() => setScroll(false)}
            >
              {data.map((item, i) => {
                return (
                  <AddNewLinkComponent
                    key={i}
                    index={i + 1}
                    {...item}
                    errors={errors}
                    register={register}
                    name={`link ${i + 1}`}
                  />
                );
              })}
            </form>
          )}
        </aside>
      </section>
      <Footer
        btnType='submit'
        addClass={`bg-prim-default hover:bg-prim-light ${
          data.length === 0 && 'disabled:cursor-not-allowed'
        }`}
        disabled={data.length === 0}
        formID='linkFormId'
      />
    </div>
  );
};
export default DashboardLinks;
