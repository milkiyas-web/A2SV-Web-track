import { notFound } from 'next/navigation'
import JobDetail from '@/components/JobDetail'
import type { Job } from '@/types/job'

interface Params {
    params: { id: string }
}

export default async function JobDetailPage({ params }: Params) {
    const id = await params.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opportunities/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) return notFound();

    const data = await res.json();
    const job: Job | null = data.data;

    if (!job) return notFound();

    return <JobDetail job={job} />
}
