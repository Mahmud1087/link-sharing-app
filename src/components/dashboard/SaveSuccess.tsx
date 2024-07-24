'use client';

import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import saveIcon from '~/public/save-icon.png';

const SaveSuccess = () => {
  const { save } = useAppContext();

  return (
    <div>
      {save && (
        <section className='px-6 py-4 flex items-center gap-2 absolute bottom-3 -left-20 rounded-xl bg-dark-default save-shadow'>
          <aside>
            <Image src={saveIcon} alt='Save Icon' />
          </aside>
          <p className='font-semibold text-sec-lighter leading-6'>
            Your changes have been successfully saved!
          </p>
        </section>
      )}
    </div>
  );
};
export default SaveSuccess;
