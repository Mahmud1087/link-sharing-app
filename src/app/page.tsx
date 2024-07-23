'use client';

import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { LoaderCircle } from 'lucide-react';

const HomePage = () => {
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      router.push(`/dashboard`);
      // ...
    } else {
      // User is signed out
      // ...
      router.push('/login');
    }
  });
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <LoaderCircle
        className='animate-spin w-16 h-16'
        strokeWidth={1}
        color='purple'
      />
      <p className='mt-2 font-semibold'>Please wait...</p>
    </div>
  );
};
export default HomePage;
