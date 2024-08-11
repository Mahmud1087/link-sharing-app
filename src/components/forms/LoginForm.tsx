'use client';

import { FieldValues, useForm } from 'react-hook-form';
import Button from '../common/Button';
import Link from 'next/link';
import Image from 'next/image';
import envelopeIcon from '~/public/envelopeIcon.png';
import lockIcon from '~/public/lockIcon.png';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '@/firebase/config';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const LoginForm = () => {
  const successNotify = () =>
    toast.success('Login successfully', {
      position: 'top-center',
    });

  const errorNotify = (msg: string) =>
    toast.error(msg, {
      position: 'top-center',
    });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials.user;
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          const linkObj = { id: uuidv4(), link: '', provider: '' };
          await setDoc(docRef, {
            firstName: '',
            lastName: '',
            links: [{ ...linkObj }],
            email: '',
          });
        }
        successNotify();
        router.push('/dashboard');

        reset();
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            errorNotify('Invalid email or password');
            break;
          default:
            errorNotify('An error occurred');
            break;
        }
      } else {
        new Error('Unknown error encountered');
      }
    }
    //sleep for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <p
          className={cn('text-sm leading-[18px] text-dark-default', {
            'text-danger-default': errors.email,
            'text-dark-default': !errors.email,
          })}
        >
          Email address
        </p>
        <label
          htmlFor='email'
          className={cn(
            `relative flex gap-3 bg-transparent items-center px-4 py-3 rounded-lg border border-sec-default`,
            {
              'focus-within:border-danger-default': errors.email,
              'focus-within:border-prim-default label-shadow': !errors.email,
            }
          )}
        >
          <aside>
            <Image src={envelopeIcon} alt='Envelope Icon' />
          </aside>
          <input
            {...register('email', { required: "Can't be empty" })}
            type='email'
            placeholder='e.g. alex@email.com'
            className='bg-transparent leading-6 text-dark-default placeholder:text-dark-default/50 border-none focus:outline-none w-full h-full'
          />
          {errors.email && (
            <p className='absolute right-3 text-danger-default text-sm leading-4'>{`${errors.email.message}`}</p>
          )}
        </label>
      </div>

      <div className='flex flex-col gap-1'>
        <p
          className={cn('text-sm leading-[18px] text-dark-default', {
            'text-danger-default': errors.password,
            'text-dark-default': !errors.password,
          })}
        >
          Password
        </p>
        <label
          htmlFor='password'
          className={cn(
            `relative flex gap-3 bg-transparent items-center px-4 py-3 rounded-lg border border-sec-default`,
            {
              'border-danger-default': errors.password,
              'focus-within:border-prim-default label-shadow': !errors.password,
            }
          )}
        >
          <aside>
            <Image src={lockIcon} alt='Padlock Icon' />
          </aside>
          <input
            {...register('password', {
              required: 'Please check again',
              minLength: {
                value: 8,
                message: 'Please check again',
              },
            })}
            type='password'
            placeholder='Enter your password'
            className='bg-transparent leading-6 text-dark-default placeholder:text-dark-default/50 border-none focus:outline-none w-full h-full'
          />
          {errors.password && (
            <p className='absolute right-3 text-danger-default text-sm leading-4'>{`${errors.password.message}`}</p>
          )}
        </label>
      </div>

      <Button
        type='submit'
        disabled={isSubmitting}
        btnClassName='bg-prim-default w-full text-white btn-shadow hover:bg-prim-light'
      >
        Login
      </Button>

      <div className='flex items-center justify-center gap-2 leading-6 text-center w-full'>
        <p className='text-dark-light'>Don&apos;t have an account? </p>
        <Link href='/register' className='text-prim-default'>
          Create account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
