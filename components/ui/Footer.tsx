import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-700 mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-6 mb-4">
            <Link href="/founder" className="hover:text-white">Founder's Corner</Link>
            {/* Add other footer links here later */}
        </div>
        <p>&copy; {new Date().getFullYear()} OpenVeda. All rights reserved.</p>
      </div>
    </footer>
  );
}