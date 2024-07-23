import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
