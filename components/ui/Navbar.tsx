import Link from 'next/link';
export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex items-center justify-between h-16"><div className="flex-shrink-0"><Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">OpenVeda</Link></div><div className="hidden md:block"><div className="ml-10 flex items-baseline space-x-4"><Link href="/orgs" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Organizations</Link></div></div></div></div></nav>
  );
}