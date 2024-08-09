'use client';

import { auth, firestore } from '@/firebase/config';
import { cn } from '@/utils/cn';
import { dropdownList, valUrl } from '@/utils/helper';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ChevronDown, Equal, Link } from 'lucide-react';
import { useState } from 'react';
import { TbBrandGithubFilled } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useAppContext } from '@/context/AppContext';

interface Poperties {
  index: number;
  id: number | string;
  provider: string;
  link: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  name: string;
}

const AddNewLinkComponent = (props: Poperties) => {
  const { save, setSave } = useAppContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [selected, setSelected] = useState({
    icon: <TbBrandGithubFilled />,
    provider: 'Github',
  });

  const [open, setOpen] = useState(false);

  const { index, id, provider, link, register, errors, name } = props;

  async function updateFirestore(userId: string) {
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

        const findindex = currentLinks.findIndex((link) => link.id === id);
        // replace the data in the findindex
        currentLinks[findindex] = { id, link, provider: selected.provider };

        await updateDoc(docRef, {
          links: currentLinks,
        });
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  const update = onAuthStateChanged(auth, (user) => {
    if (user) {
      updateFirestore(user.uid);
    }
  });

  async function deleteLinkFromFirestore(userId: string) {
    setIsDeleting(true);
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

        const newLinks = currentLinks.filter((link) => link.id !== id);

        await updateDoc(docRef, {
          links: newLinks,
        });
      }
      setIsDeleting(false);
      toast.success('Link deleted successfully', {
        position: 'top-center',
      });
    } catch (error) {
      setIsDeleting(false);
      console.error('Error updating document:', error);
    }
  }

  const deleteLink = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        deleteLinkFromFirestore(user.uid);
      }
    });
  };

  return (
    <section className='p-5 self-stretch bg-sec-lighter rounded-xl'>
      <header className='flex justify-between items-center w-full'>
        <div className='flex gap-2'>
          <Equal
            color='#737373'
            size={22}
            strokeWidth={1.5}
            className='font-bold'
          />
          <p className='text-dark-light font-bold leading-6'>{`Link #${index}`}</p>
        </div>
        <button
          type='button'
          className={cn('text-dark-light leading-6', {
            'cursor-wait': isDeleting,
          })}
          onClick={deleteLink}
        >
          Remove
        </button>
      </header>
      <div className='flex flex-col gap-5 w-full'>
        <section className='flex flex-col gap-1 w-full'>
          <p className='text-sm leading-5 text-dark-default'>Platform</p>
          <div className='flex flex-col gap-5 w-full relative'>
            <article
              className={cn(
                'w-full flex py-3 px-4 self-stretch gap-3 items-center rounded-lg border border-sec-default bg-white cursor-pointer hover:border-prim-default dropdown-shadow transition-all',
                {
                  'border-prim-default open-dropdown-shadow ': open,
                }
              )}
              onClick={() => setOpen(!open)}
            >
              <aside className='flex items-center gap-3 w-full'>
                <p className='text-dark-light'>{selected.icon}</p>
                <p className='text-dark-default leading-6 font-medium'>
                  {selected.provider}
                </p>
              </aside>
              <p
                className={cn('rotate-0 transition-all', {
                  'rotate-180': open,
                })}
              >
                <ChevronDown color='#633CFF' width={25} />
              </p>
            </article>
            <ul
              className={cn(
                'w-full bg-white border border-sec-default rounded-lg save-shadow flex-col py-1 px-4 justify-center absolute top-16 left-0 z-50',
                {
                  flex: open,
                  hidden: !open,
                }
              )}
            >
              {dropdownList.map((list) => {
                return (
                  <li
                    key={uuidv4()}
                    className={`flex items-center gap-3 w-full py-4 border-b border-b-sec-default last:border-none cursor-pointer group transition-all`}
                    onClick={() => {
                      setSelected({ icon: list.icon, provider: list.provider });
                      setOpen(false);
                      update();
                    }}
                  >
                    <p
                      className={`text-dark-light group-hover:text-prim-default`}
                    >
                      {list.icon}
                    </p>
                    <p
                      className={`text-dark-default leading-6 font-medium text-base group-hover:text-prim-default`}
                    >
                      {list.provider}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <aside className='flex flex-col gap-1 w-full'>
          <p className='text-sm leading-5 text-dark-default'>Link</p>
          <label
            htmlFor={name}
            className={cn(
              `relative flex gap-3 bg-white items-center px-4 py-3 rounded-lg border border-sec-default`,
              {
                'border-danger-default': errors[name],
                'focus-within:border-prim-default label-shadow': !errors[name],
              }
            )}
          >
            <Link size={14} color='#737373' />
            <input
              {...register(name, {
                required: true,
                pattern: valUrl,
              })}
              type='link'
              placeholder='e.g. https://www.github.com/johnappleseed'
              className='bg-transparent leading-6 text-dark-default placeholder:text-dark-default/50 border-none focus:outline-none w-full h-full'
            />
            {errors[name] && errors[name].type === 'required' && (
              <p className='absolute right-3 text-danger-default text-sm leading-4'>
                {"Can't be empty"}
              </p>
            )}
            {errors[name] && errors[name].type === 'pattern' && (
              <p className='absolute right-3 text-danger-default text-sm leading-4'>
                Please check the URL
              </p>
            )}
          </label>
        </aside>
      </div>
    </section>
  );
};
export default AddNewLinkComponent;
