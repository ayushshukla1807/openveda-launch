import Link from 'next/link';
import Image from 'next/image';
interface OrgCardProps { name: string; slug: string; logo_url: string | null; tech_stack: string[] | null; }
export default function OrgCard({ name, slug, logo_url, tech_stack }: OrgCardProps) {
  return (
    <Link href={`/playbook/${slug}`} className="group block bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center mb-4">
        {logo_url && ( <div className="relative h-10 w-10 mr-4 flex-shrink-0"> <Image src={logo_url} alt={`${name} logo`} fill sizes="40px" className="rounded-md object-contain" /> </div> )}
        <h2 className="text-2xl font-semibold text-white group-hover:text-green-400 transition-colors">{name}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tech_stack && tech_stack.slice(0, 5).map((tech: string) => ( <span key={tech} className="bg-gray-700 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span> ))}
      </div>
    </Link>
  );
}