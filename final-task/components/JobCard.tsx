import { Job } from '@/types/job'
import React, { useState } from 'react'
import { Badge } from './ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Toggle } from './ui/toggle';
import { Bookmark } from 'lucide-react';
import { BookmarkChecker } from './BookmarkChecker';

interface JobCardProps {
    id?: string
    title: string;
    description?: string;
    responsibilities: string;
    company: string;
    location: string;
    image: string;
    position_type?: string[]
    work_type: string
    eventID: string
    initialIsBookmarked: boolean
}

const JobCard = ({ title, id, description, work_type, position_type, company, location, image, eventID }: JobCardProps) => {
    const getWorkTypeStyles = (type: string) => {
        switch (type.toLowerCase()) {
            case 'inPerson':
                return 'bg-green-100 text-green-600';
            case 'virtual':
                return 'bg-blue-200 text-blue-600';
            default:
                return 'bg-green-100 text-green-600e';
        }
    };

    const getPositionTypeStyles = (type: string) => {
        switch (type.toLowerCase()) {
            case 'it':
                return 'text-purple-600 border-purple-600';
            case 'development':
                return 'text-blue-600 border-blue-600';
            case 'marketing':
                return 'text-emerald-600 border-emerald-600';
            case 'event':
                return 'text-pink-600 border-pink-600';
            case 'design':
                return 'text-orange-600 border-orange-600';
            case 'art':
                return 'text-red-600 border-red-600';
            case 'Education Access and Quality Improvement':
                return 'text-cyan-600 border-cyan-600';
            case 'analytics':
                return 'text-teal-600 border-teal-600';
            case 'customer service':
                return 'text-indigo-600 border-indigo-600';
            case 'volunteer':
                return 'text-lime-600 border-lime-600';
            default:
                return 'text-gray-600 border-gray-600';
        }
    };

    return (
        <div data-testid="job-card" className="bg-white dark:bg-gray-900 border-1 border-gray-300 rounded-2xl p-6 flex gap-4 items-start">

            <Image
                unoptimized
                src={image || "/placeholder.png"}
                alt={`${company} logo`}
                className="rounded-full object-cover"
                width={54}
                height={54}
            />
            <div className="flex-1">
                <div className="mb-2">
                    <div className='flex'>
                        <Link href={`/jobs/${id}`} className="text-xl flex-1 font-semibold text-gray-800 dark:text-white">{title}</Link>
                        <BookmarkChecker id={id} initialIsBookmarked={false} />

                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{company} • {location}</p>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {description ? description : ""}
                </p>

                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={`text-xs  ${getWorkTypeStyles(work_type)}`}>{work_type}</Badge> {work_type && position_type?.length > 0 && <span>|</span>}
                    {position_type?.filter(Boolean).map((r, i) => (
                        <Badge
                            key={i}
                            className={`text-xs border ${getPositionTypeStyles(r)}`}
                            variant="outline"
                        >
                            {r}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default JobCard



