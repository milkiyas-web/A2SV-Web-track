// "use client"
// import { notFound } from 'next/navigation'
// // import jobsData from '@/data/jobs.json'
// import type { Job } from '@/types/job'
// import Sidebar from '@/components/Sidebar'
// import { CircleCheckBig, MapPin } from 'lucide-react'
// import { useParams } from 'next/navigation'
// import { useEffect, useState } from 'react'

// interface Params {
//     params: {
//         id: string
//     }
// }

// export default function JobDetailPage() {

//     const params = useParams();
//     const id = params.id;

//     const [job, setJob] = useState<Job | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!id) return;
//         const getJob = async () => {
//             try {
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opprtunities/${id}`)
//                 const data = await res.json()
//                 setJob(data.data)
//                 console.log(job)
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//         getJob()
//     }, [id])
//     if (!job) return <h1>Nothing found 404</h1>

//     return (
//         <div className="p-6 flex sm:gap-8 md:gap-4 max-w-6xl mx-auto">
//             <div className='flex-1'>
//                 <h1 className="text-3xl font-bold mb-4">Description</h1>
//                 <p className="mb-4">{job.description}</p>

//                 <h2 className="text-xl font-bold mt-10 mb-3">Responsibilities</h2>
//                 <ul className="space-y-2 mt-2">
//                     {job.responsibilities
//                         .split(".")
//                         .map((r, i) => r.trim())
//                         .filter((r) => r.length > 0)
//                         .map((r, i) => (
//                             <li key={i} className="flex items-start gap-2">
//                                 <CircleCheckBig className="text-green-500 mt-1" size={20} />
//                                 <span>{r}.</span>
//                             </li>
//                         ))}
//                 </ul>

//                 <div>
//                     <h2 className="text-xl font-bold mt-10 mb-3">Ideal Candidate we want</h2>
//                     {/* <ul className="list-disc pl-5 space-y-3">
//                         {job.requirements.map((c, i) => (
//                             <li key={i} dangerouslySetInnerHTML={{ __html: c }} />
//                         ))}
//                     </ul> */}
//                     <p className="text-gray-700 leading-relaxed">
//                         {job.idealCandidate}
//                     </p>
//                 </div>
//                 <div>
//                     <h2 className='text-xl font-bold mt-10 mb-3'>When & Where</h2>
//                     <div className='flex gap-1.5'>
//                         <MapPin color='#26A4FF' className='border-2 rounded-full text-9xl p-1' />
//                         <p>{job.when_where}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className='w-full lg:w-1/3 xl:w-1/4'>
//                 <Sidebar
//                     categories={job.about.categories}
//                     location={job.about.location}
//                     startDate={job.about.start_date}
//                     endDate={job.about.end_date}
//                     deadline={job.about.deadline}
//                     postedOn={job.about.posted_on}
//                     requiredSkills={job.about.required_skills}
//                 />
//             </div>
//         </div>
//     )
// }
// app/jobs/[id]/page.tsx

import { notFound } from 'next/navigation'
import JobDetail from '@/components/JobDetail'
import type { Job } from '@/types/job'

interface Params {
    params: { id: string }
}

export default async function JobDetailPage({ params }: Params) {
    const id = await params.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opportunities/${id}`, {
        cache: 'no-store', // or revalidate if needed
    });

    if (!res.ok) return notFound();

    const data = await res.json();
    const job: Job | null = data.data;

    if (!job) return notFound();

    return <JobDetail job={job} />
}
