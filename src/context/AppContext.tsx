'use client';

import { auth, firestore } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type DataType = {
  id: number | string;
  link: string;
  provider: string;
};

type AppContextType = {
  save: boolean;
  displayName: string;
  email: string;
  data: DataType[];
  setSave: Dispatch<SetStateAction<boolean>>;
  setDisplayName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<DataType[]>>;
};

type Props = {
  children: React.ReactNode;
};

const appContextDefaultValues: AppContextType = {
  save: false,
  setSave: () => false,
  displayName: '',
  setDisplayName: () => '',
  email: '',
  setEmail: () => '',
  data: [{ id: '', link: '', provider: '' }],
  setData: () => [{ id: '', link: '', provider: '' }],
};

const AppContext = createContext<AppContextType>(appContextDefaultValues);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: Props) => {
  const [save, setSave] = useState(appContextDefaultValues.save);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState(appContextDefaultValues.displayName);
  const [data, setData] = useState<DataType[]>([]);

  // Function to get data from a Firestore document
  async function getDataFromFirestore(
    collectionName: string,
    documentId: string
  ) {
    try {
      const docRef = doc(firestore, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return null;
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      getDataFromFirestore('users', user.uid).then((data) => {
        if (data) {
          setData(data.links);
          setDisplayName(`${data.firstName} ${data.lastName}`);
          setEmail(data.email);
        }
      });
    }
  });

  return (
    <AppContext.Provider
      value={{
        save,
        displayName,
        email,
        data,
        setData,
        setDisplayName,
        setSave,
        setEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
