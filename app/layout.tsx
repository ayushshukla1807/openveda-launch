import './globals.css';
import Navbar from '@/components/ui/Navbar'; // <-- ADD THIS IMPORT BACK
import Footer from '@/components/ui/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Navbar /> {/* <-- ADD THE COMPONENT HERE */}
        {children}
      </body>
    </html>
  );
}