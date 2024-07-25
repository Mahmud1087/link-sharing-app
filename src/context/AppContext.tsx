'use client';

import { auth, firestore } from '@/firebase/config';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { collection, getDocs } from 'firebase/firestore';

type DataType = {
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
  data: [{ link: '', provider: '' }],
  setData: () => [{ link: '', provider: '' }],
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

  const getData = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    const linksData = querySnapshot.docs.map((doc, i) => ({
      link: doc.data().links[i].link,
      provider: doc.data().links[i].provider,
    }));
    setData(linksData);
    console.log(linksData);
  };

  // useEffect(() => {
  //   getData();
  // }, []);

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
