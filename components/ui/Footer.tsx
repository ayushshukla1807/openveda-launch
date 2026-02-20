import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center gap-6 mb-6">
            <Link href="/journey" className="text-sm text-gray-400 hover:text-white">
              The Journey
            </Link>
            <Link href="/orgs" className="text-sm text-gray-400 hover:text-white">
              Organizations
            </Link>
            {/* THIS IS THE NEW LINK */}
            <Link href="/founder" className="text-sm text-gray-400 hover:text-white">
              Founder's Corner
            </Link>
        </div>
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} OpenVeda. Built with passion in India.</p>
      </div>
    </footer>
  );
}
