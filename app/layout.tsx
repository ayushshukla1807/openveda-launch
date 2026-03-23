import { PropsWithChildren } from 'react';
import '../styles/main.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer'; 

const meta = {
  title: 'OpenVeda | India\'s GSoC 2026 Launchpad',
  description: 'From Confusion to Contribution. Gain access to Platinum Playbooks, live "Good First Issues", and 1:1 mentorship from open-source veterans.',
  keywords: ['GSoC 2026', 'Open Source', 'India Developers', 'OpenVeda', 'Contributor Playbooks', 'GSoC Proposal Template'],
};

export const metadata = {
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

import CommandPalette from '@/components/ui/CommandPalette';

import { ThemeProvider } from '@/components/providers/ThemeProvider';

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