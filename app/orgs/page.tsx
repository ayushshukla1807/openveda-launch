// app/orgs/page.tsx

'use client'; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client'; // Uses the browser client

const supabase = createBrowserSupabaseClient(); 

interface OrgData {
    name: string;
    slug: string;
    logo_url: string | null;
    tech_stack: string[];
}

export default function OrgsPage() {
    const [organizations, setOrganizations] = useState<OrgData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterProgram, setFilterProgram] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterTechStack, setFilterTechStack] = useState('');

    const getOrganizations = async () => {
        setIsLoading(true);
        
        let query = supabase
            .from('organizations')
            .select('name, slug, logo_url, tech_stack')
            .order('name');
        
        if (filterProgram) { query = query.eq('program', filterProgram); }
        if (filterCategory) { query = query.eq('category', filterCategory); }
        if (filterTechStack) { query = query.eq('tech_stack', [filterTechStack]); }

        const { data, error } = await query;
        
        if (error) {
            console.error("Error fetching organizations:", error); 
            setOrganizations([]);
        } else {
            setOrganizations(data as OrgData[] || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getOrganizations();
    }, [filterProgram, filterCategory, filterTechStack]); 

    return (
        <main className="p-8 min-h-screen bg-black text-white">
            <div className="text-center py-12">
                <h1 className="text-2xl font-semibold text-gray-300">
                    Find your perfect project. Filter by program, category, or tech stack.
                </h1>
            </div>

            <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8">
                {/* Filters Sidebar */}
                <div className="w-full md:w-1/4 space-y-6">
                    <div><h3 className="text-lg font-medium mb-2">Filter by Program</h3>
                        <input type="text" placeholder="All Programs" className="w-full p-2 rounded bg-gray-800 border border-gray-700" value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)} />
                    </div>
                    <div><h3 className="text-lg font-medium mb-2">Filter by Category</h3>
                        <input type="text" placeholder="All Categories" className="w-full p-2 rounded bg-gray-800 border border-gray-700" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} />
                    </div>
                    <div><h3 className="text-lg font-medium mb-2">Filter by Tech Stack</h3>
                        <input type="text" placeholder="e.g., React" className="w-full p-2 rounded bg-gray-800 border border-gray-700" value={filterTechStack} onChange={(e) => setFilterTechStack(e.target.value)} />
                    </div>
                </div>

                {/* Organizations List */}
                <div className="w-full md:w-3/4">
                    {isLoading ? (<p className="text-center text-xl pt-10">Loading organizations...</p>) 
                    : organizations.length === 0 ? (<p className="text-center text-xl pt-10">No organizations found matching your filters.</p>) 
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {organizations.map((org) => (
                                // FIX: Updated Link href to match the desired folder structure
                                <Link href={`/orgs/playbook/${org.slug}`} key={org.slug}> 
                                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-colors">
                                        <h4 className="text-xl font-bold">{org.name}</h4>
                                        <p className="text-sm text-gray-400">{org.tech_stack.join(', ')}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
// // app/orgs/page.tsx

// 'use client'; 

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client'; // Uses the browser client

// const supabase = createBrowserSupabaseClient(); 

// interface OrgData {
//     name: string;
//     slug: string;
//     logo_url: string | null;
//     tech_stack: string[];
// }

// export default function OrgsPage() {
//     const [organizations, setOrganizations] = useState<OrgData[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [filterProgram, setFilterProgram] = useState('');
//     const [filterCategory, setFilterCategory] = useState('');
//     const [filterTechStack, setFilterTechStack] = useState('');

//     const getOrganizations = async () => {
//         setIsLoading(true);
        
//         let query = supabase
//             .from('organizations')
//             .select('name, slug, logo_url, tech_stack')
//             .order('name');
        
//         if (filterProgram) { query = query.eq('program', filterProgram); }
//         if (filterCategory) { query = query.eq('category', filterCategory); }
//         if (filterTechStack) { query = query.cs('tech_stack', [filterTechStack]); }

//         const { data, error } = await query;
        
//         if (error) {
//             console.error("Error fetching organizations:", error); 
//             setOrganizations([]);
//         } else {
//             setOrganizations(data as OrgData[] || []);
//         }
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         getOrganizations();
//     }, [filterProgram, filterCategory, filterTechStack]); 

//     return (
//         <main className="p-8 min-h-screen bg-black text-white">
//             <div className="text-center py-12">
//                 <h1 className="text-2xl font-semibold text-gray-300">
//                     Find your perfect project. Filter by program, category, or tech stack.
//                 </h1>
//             </div>

//             <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8">
//                 {/* Filters Sidebar */}
//                 <div className="w-full md:w-1/4 space-y-6">
//                     <div><h3 className="text-lg font-medium mb-2">Filter by Program</h3>
//                         <input type="text" placeholder="All Programs" className="w-full p-2 rounded bg-gray-800 border border-gray-700" value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)} />
//                     </div>
//                     <div><h3 className="text-lg font-medium mb-2">Filter by Category</h3>
//                         <input type="text" placeholder="All Categories" className="w-full p-2 rounded bg-gray-800 border border-gray-700" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} />
//                     </div>
//                     <div><h3 className="text-lg font-medium mb-2">Filter by Tech Stack</h3>
//                         <input type="text" placeholder="e.g., React" className="w-full p-2 rounded bg-gray-800 border border-gray-700" value={filterTechStack} onChange={(e) => setFilterTechStack(e.target.value)} />
//                     </div>
//                 </div>

//                 {/* Organizations List */}
//                 <div className="w-full md:w-3/4">
//                     {isLoading ? (<p className="text-center text-xl pt-10">Loading organizations...</p>) 
//                     : organizations.length === 0 ? (<p className="text-center text-xl pt-10">No organizations found matching your filters.</p>) 
//                     : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {organizations.map((org) => (
//                                 // FIX: Updated Link href to match the desired folder structure
//                                 <Link href={`/orgs/playbook/${org.slug}`} key={org.slug}> 
//                                     <div className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-colors">
//                                         <h4 className="text-xl font-bold">{org.name}</h4>
//                                         <p className="text-sm text-gray-400">{org.tech_stack.join(', ')}</p>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </main>
//     );
// }


// // app/orgs/page.tsx

// 'use client'; 

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client'; 

// // Import your OrgCard component if you use it (using simple div here for completeness)
// // import OrgCard from '@/components/ui/OrgCard'; 

// const supabase = createBrowserSupabaseClient(); 

// interface OrgData {
//     name: string;
//     slug: string;
//     logo_url: string | null;
//     tech_stack: string[]; // Assuming this is a list of strings
// }

// export default function OrgsPage() {
//     // State for Organizations and Filters
//     const [organizations, setOrganizations] = useState<OrgData[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [filterProgram, setFilterProgram] = useState('');
//     const [filterCategory, setFilterCategory] = useState('');
//     const [filterTechStack, setFilterTechStack] = useState('');

//     // Data Fetching Logic (applies filters)
//     const getOrganizations = async () => {
//         setIsLoading(true);
        
//         let query = supabase
//             .from('organizations')
//             .select('name, slug, logo_url, tech_stack')
//             .order('name');
        
//         // Apply Filters
//         if (filterProgram) {
//              query = query.eq('program', filterProgram); 
//         }
//         if (filterCategory) {
//              query = query.eq('category', filterCategory); 
//         }
//         if (filterTechStack) {
//             // Using 'cs' for 'contains' on a JSONB/TEXT array column (common Supabase pattern)
//             query = query.cs('tech_stack', [filterTechStack]); 
//         }

//         const { data, error } = await query;
        
//         if (error) {
//             console.error("Error fetching organizations:", error); 
//             setOrganizations([]);
//         } else {
//             setOrganizations(data as OrgData[] || []);
//         }
//         setIsLoading(false);
//     };

//     // Re-fetch data whenever filter states change
//     useEffect(() => {
//         getOrganizations();
//     }, [filterProgram, filterCategory, filterTechStack]); 

//     // Final JSX with Clickable Cards and Bound Inputs
//     return (
//         <main className="p-8 min-h-screen bg-black text-white">
//             <div className="text-center py-12">
//                 <h1 className="text-2xl font-semibold text-gray-300">
//                     Find your perfect project. Filter by program, category, or tech stack.
//                 </h1>
//             </div>

//             <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8">
//                 {/* Filters Sidebar */}
//                 <div className="w-full md:w-1/4 space-y-6">
//                     <div>
//                         <h3 className="text-lg font-medium mb-2">Filter by Program</h3>
//                         <input 
//                             type="text" 
//                             placeholder="All Programs" 
//                             className="w-full p-2 rounded bg-gray-800 border border-gray-700" 
//                             value={filterProgram}
//                             onChange={(e) => setFilterProgram(e.target.value)} // Binds input to state
//                         />
//                     </div>
//                     <div>
//                         <h3 className="text-lg font-medium mb-2">Filter by Category</h3>
//                         <input 
//                             type="text" 
//                             placeholder="All Categories" 
//                             className="w-full p-2 rounded bg-gray-800 border border-gray-700" 
//                             value={filterCategory}
//                             onChange={(e) => setFilterCategory(e.target.value)} // Binds input to state
//                         />
//                     </div>
//                     <div>
//                         <h3 className="text-lg font-medium mb-2">Filter by Tech Stack</h3>
//                         <input 
//                             type="text" 
//                             placeholder="e.g., React" 
//                             className="w-full p-2 rounded bg-gray-800 border border-gray-700" 
//                             value={filterTechStack}
//                             onChange={(e) => setFilterTechStack(e.target.value)} // Binds input to state
//                         />
//                     </div>
//                 </div>

//                 {/* Organizations List */}
//                 <div className="w-full md:w-3/4">
//                     {isLoading ? (
//                         <p className="text-center text-xl pt-10">Loading organizations...</p>
//                     ) : organizations.length === 0 ? (
//                         <p className="text-center text-xl pt-10">No organizations found matching your filters.</p>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {organizations.map((org) => (
//                                 // FIX: Updated Link href to match the desired folder structure
//                                 <Link href={`/orgs/playbook/${org.slug}`} key={org.slug}> 
//                                     {/* Placeholder for OrgCard content */}
//                                     <div className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-colors">
//                                         <h4 className="text-xl font-bold">{org.name}</h4>
//                                         <p className="text-sm text-gray-400">{org.tech_stack.join(', ')}</p>
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </main>
//     );
// }

// // app/orgs/page.tsx

// 'use client'; 

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // Import Link for navigation
// import { createBrowserSupabaseClient } from '@/lib/supabase/browser-client'; 
// // Assuming you have an OrgCard component:
// // import OrgCard from '@/components/ui/OrgCard'; 

// const supabase = createBrowserSupabaseClient(); 

// // Placeholder for your organization data type
// interface OrgData {
//     name: string;
//     slug: string;
//     logo_url: string | null;
//     tech_stack: string[];
// }

// export default function OrgsPage() {
//     // 1. New State for Organizations and Filters
//     const [organizations, setOrganizations] = useState<OrgData[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [filterProgram, setFilterProgram] = useState(''); // State for Program Input
//     const [filterCategory, setFilterCategory] = useState(''); // State for Category Input
//     const [filterTechStack, setFilterTechStack] = useState(''); // State for Tech Stack Input

//     // 2. Updated Data Fetching Logic (to apply filters)
//     const getOrganizations = async () => {
//         setIsLoading(true);
        
//         let query = supabase
//             .from('organizations')
//             .select('name, slug, logo_url, tech_stack')
//             .order('name');
        
//         // Apply Filters: Only filter if the state is not empty
//         if (filterProgram) {
//              // Example: Assumes an 'program' column in your organizations table
//              query = query.eq('program', filterProgram); 
//         }
//         if (filterCategory) {
//              // Example: Assumes an 'category' column in your organizations table
//              query = query.eq('category', filterCategory); 
//         }
//         // Tech stack filtering logic is more complex (e.g., using 'cs' for contains)
//         if (filterTechStack) {
//             // Example: Assumes a JSONB column 'tech_stack' and uses 'cs' (contained in)
//             query = query.cs('tech_stack', [filterTechStack]); 
//         }


//         const { data, error } = await query;
        
//         if (error) {
//             console.error("Error fetching organizations:", error); 
//             setOrganizations([]);
//         } else {
//             setOrganizations(data as OrgData[] || []);
//         }
//         setIsLoading(false);
//     };

//     // 3. Update useEffect to run when filter states change
//     useEffect(() => {
//         // Debounce or immediate fetch based on your needs. Fetching immediately here:
//         getOrganizations();
//     }, [filterProgram, filterCategory, filterTechStack]); // Re-fetch whenever a filter changes

//     // 4. Final JSX with Clickable Cards and Bound Inputs
//     return (
//         <main className="p-8 min-h-screen bg-black text-white">
//             <div className="text-center py-12">
//                 <h1 className="text-2xl font-semibold text-gray-300">
//                     Find your perfect project. Filter by program, category, or tech stack.
//                 </h1>
//             </div>

//             <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8">
//                 {/* Filters Sidebar */}
//                 <div className="w-full md:w-1/4 space-y-6">
//                     <div>
//                         <h3 className="text-lg font-medium mb-2">Filter by Program</h3>
//                         <input 
//                             type="text" 
//                             placeholder="All Programs" 
//                             className="w-full p-2 rounded bg-gray-800 border border-gray-700" 
//                             value={filterProgram}
//                             onChange={(e) => setFilterProgram(e.target.value)} // Binds input to state
//                         />
//                     </div>
//                     <div>
//                         <h3 className="text-lg font-medium mb-2">Filter by Category</h3>
//                         <input 
//                             type="text" 
//                             placeholder="All Categories" 
//                             className="w-full p-2 rounded bg-gray-800 border border-gray-700" 
//                             value={filterCategory}
//                             onChange={(e) => setFilterCategory(e.target.value)} // Binds input to state
//                         />
//                     </div>
//                     <div>
//                         <h3 className="text-lg font-medium mb-2">Filter by Tech Stack</h3>
//                         <input 
//                             type="text" 
//                             placeholder="e.g., React" 
//                             className="w-full p-2 rounded bg-gray-800 border border-gray-700" 
//                             value={filterTechStack}
//                             onChange={(e) => setFilterTechStack(e.target.value)} // Binds input to state
//                         />
//                     </div>
//                 </div>

//                 {/* Organizations List */}
//                 <div className="w-full md:w-3/4">
//                     {isLoading ? (
//                         <p className="text-center text-xl pt-10">Loading organizations...</p>
//                     ) : organizations.length === 0 ? (
//                         <p className="text-center text-xl pt-10">No organizations found matching your filters.</p>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {organizations.map((org) => (
//                                 // FIX: Use <Link> for click navigation
//                                 <Link href={`/orgs/${org.slug}`} key={org.slug}> 
//                                     {/* This is the card element */}
//                                     <div className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-colors">
//                                         <h4 className="text-xl font-bold">{org.name}</h4>
//                                         <p className="text-sm text-gray-400">{org.tech_stack.join(', ')}</p>
//                                     </div>
//                                     {/* If you use a separate OrgCard component: <OrgCard key={org.slug} {...org} /> */}
//                                 </Link>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </main>
//     );
// }


