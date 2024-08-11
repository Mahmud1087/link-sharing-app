'use client';

import Footer from '@/components/dashboard/Footer';
import PageHeading from '@/components/dashboard/PageHeading';
import { cn } from '@/utils/cn';
import { FieldValues, useForm } from 'react-hook-form';
import { PiImageLight } from 'react-icons/pi';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '@/firebase/config';
import SaveSuccess from '@/components/dashboard/SaveSuccess';
import { useAppContext } from '@/context/AppContext';
import { doc, updateDoc } from 'firebase/firestore';

const ProfilePage = () => {
  const { setSave } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);

        // Update the document data
        updateDoc(docRef, {
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email,
        });
      }
    });

    //sleep for 1 sec
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!isSubmitting) {
      setSave(true);
      setTimeout(() => {
        setSave(false);
      }, 4000);
    }
  };

  return (
    <div className='flex flex-col h-full relative'>
      <section className='h-full p-10 flex flex-col gap-10'>
        <PageHeading
          heading='Profile Details'
          subheading='Add your details to create a personal touch to your profile.'
        />
        <form
          id='profileDetailsForm'
          onSubmit={handleSubmit(onSubmit)}
          className='h-[465px] w-full flex flex-col gap-6 self-stretch'
        >
          <div className='p-5 flex justify-between items-center bg-sec-lighter rounded-xl self-stretch'>
            <p className='w-60 text-dark-light leading-6'>Profile picture</p>
            <aside className='flex items-center gap-6 w-3/5'>
              <label
                htmlFor='imageUpload'
                className='py-[60px] h-48 w-48 rounded-xl bg-sec-light flex flex-col gap-2 items-center justify-center text-prim-default font-semibold leading-6 text-center cursor-pointer'
              >
                <input
                  {...register('imageUpload', {
                    validate: (value) => {
                      if (value && value.size > 1024 * 1024) {
                        return false;
                      }
                      const fileExt = value?.name
                        ?.split('.')
                        .pop()
                        ?.toLowerCase();
                      if (fileExt && !['png', 'jpg'].includes(fileExt)) {
                        return false;
                      }
                      return true;
                    },
                  })}
                  type='file'
                  id='imageUpload'
                  className='hidden'
                />
                <PiImageLight size={40} strokeWidth={3} />
                <span className=''>+ Upload Image</span>
              </label>
              <p className='text-sm text-dark-light leading-[150%]'>
                Image must be below 1024x1024px. <br />
                Use PNG or JPG format.
              </p>
            </aside>
          </div>

          <div className='p-5 flex flex-col gap-3 self-stretch rounded-xl bg-sec-lighter w-full'>
            <label
              htmlFor='firstName'
              className='flex justify-between items-center relative'
            >
              <p className='text-dark-light leading-6 w-60'>First name*</p>
              <input
                {...register('firstName', {
                  required: "Can't be empty",
                })}
                type='text'
                placeholder='e.g. John'
                className={cn(
                  'w-3/5 px-4 py-3 rounded-lg bg-white border border-sec-default leading-6 text-dark-default placeholder:text-dark-default/50  focus:outline-none focus:border-prim-default',
                  {
                    'focus:border-danger-default border-danger-default':
                      errors.firstName,
                    'focus:border-prim-default label-shadow': !errors.firstName,
                  }
                )}
              />
              {errors.firstName && (
                <p className='absolute right-3 text-danger-default text-sm leading-4'>{`${errors.firstName.message}`}</p>
              )}
            </label>

            <label
              htmlFor='lastName'
              className='flex justify-between items-center relative'
            >
              <p className='text-dark-light leading-6 w-60'>Last name*</p>
              <input
                {...register('lastName', {
                  required: "Can't be empty",
                })}
                type='text'
                placeholder='e.g. Appleseed'
                className={cn(
                  'w-3/5 px-4 py-3 rounded-lg bg-white border border-sec-default leading-6 text-dark-default placeholder:text-dark-default/50  focus:outline-none focus:border-prim-default',
                  {
                    'focus:border-danger-default border-danger-default':
                      errors.lastName,
                    'focus:border-prim-default label-shadow': !errors.lastName,
                  }
                )}
              />
              {errors.lastName && (
                <p className='absolute right-3 text-danger-default text-sm leading-4'>{`${errors.lastName.message}`}</p>
              )}
            </label>

            <label
              htmlFor='email'
              className='flex justify-between items-center '
            >
              <p className='text-dark-light leading-6 w-60'>Email</p>
              <input
                {...register('email')}
                type='email'
                placeholder='e.g. email@example.com'
                className={cn(
                  'w-3/5 px-4 py-3 rounded-lg bg-white border border-sec-default leading-6 text-dark-default placeholder:text-dark-default/50  focus:outline-none focus:border-prim-default label-shadow'
                )}
              />
            </label>
          </div>
        </form>
      </section>
      <Footer
        btnType='submit'
        formID='profileDetailsForm'
        addClass='bg-prim-default hover:bg-prim-light label-shadow'
        disabled={isSubmitting}
      />

      <SaveSuccess />
    </div>
  );
};
export default ProfilePage;
