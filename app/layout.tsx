import { PropsWithChildren } from 'react';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
export const metadata = { title: 'OpenVeda', description: "India's Launchpad for Open Source" };
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en"><body className="bg-black"><Navbar />{children}</body></html>
  );
}