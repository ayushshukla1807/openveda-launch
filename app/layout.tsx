import { PropsWithChildren } from 'react';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer'; // <-- IMPORT THE NEW FOOTER

const meta = {
  title: 'OpenVeda',
  description: "India's Launchpad for Open Source Developers.",
};

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-black">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> {/* <-- ADD THE FOOTER COMPONENT HERE */}
        </div>
      </body>
    </html>
  );
}