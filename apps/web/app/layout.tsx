import { PropsWithChildren } from 'react';
import '../styles/main.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer'; 
import CommandPalette from '@/components/ui/CommandPalette';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const meta = {
  title: 'OpenVeda | The Contribution Engine',
  description: 'Year-Round Open Source Mastery. Bridge the gap from student to engineer with industry-grade playbooks, contribution tracking, and verified credentials.',
  keywords: ['The Contribution Engine', 'Open Source Careers', 'LFX Mentorship', 'Industry Readiness', 'OpenVeda', 'Developer Impact'],
};

export const metadata = {
  metadataBase: new URL('https://openveda.in'),
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: 'https://openveda.in',
    siteName: 'OpenVeda',
    images: [{ url: '/og-image.png' }],
    locale: 'en_US',
    type: 'website',
  },
};



export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CommandPalette />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}