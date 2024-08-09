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
  displayName: string | null;
  email: string | null;
  data: DataType[];
  setSave: Dispatch<SetStateAction<boolean>>;
  setDisplayName: Dispatch<SetStateAction<string | null>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<SetStateAction<DataType[]>>;
};

type Props = {
  children: React.ReactNode;
};

const user = auth.currentUser;
const appContextDefaultValues: AppContextType = {
  save: false,
  setSave: () => false,
  displayName: user !== null ? user?.displayName : null,
  setDisplayName: () => (user !== null ? user?.displayName : null),
  email: user !== null ? user?.email : null,
  setEmail: () => (user !== null ? user?.email : null),
  data: [{ id: '', link: '', provider: '' }],
  setData: () => [{ id: '', link: '', provider: '' }],
};

const AppContext = createContext<AppContextType>(appContextDefaultValues);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: Props) => {
  const [save, setSave] = useState(appContextDefaultValues.save);
  const [displayName, setDisplayName] = useState(
    appContextDefaultValues.displayName
  );
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
        return docSnap.data(); // Return the document data
      } else {
        return null; // Return null if the document doesn't exist
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return null; // Return null if there's an error
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      getDataFromFirestore('users', user.uid).then((data) => {
        if (data) {
          setData(data.links);
          setDisplayName(data.firstName + data.lastName);
          setEmail(data.email);
        } else {
          console.log('no data found');
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
