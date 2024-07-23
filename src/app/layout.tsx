import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const instrumentSans = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link Sharing App',
  description: 'Developed by enesi_dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${instrumentSans.className} bg-sec-lighter`}>
        <ToastContainer autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
