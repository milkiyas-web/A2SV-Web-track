"use client"
import React, { useEffect, useState } from 'react'
// import JobCard from './JobCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
// import jobsData from '../data/jobs.json'
import type { Job, JobList } from '@/types/job'
import { join } from 'path'
import JobCard from './JobCard'
// const jobsDataTyped = jobsData as JobList

const JobList = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/opportunities/search`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    // body: 
                })
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const jobOpportunities = await res.json();
                console.log(jobOpportunities);
                setJobs(jobOpportunities.data)

            } catch (err) {
                console.log(err)
            }
        }
        getJobs()
    }, [])

    return (
        <div className="max-w-4xl w-full mx-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Opportunities</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{`Showing ${jobs.length} results`}</p>
                </div>
                <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Sort by:</span>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Most Relevant" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="date">By date</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-4">
                {jobs.map((job, idx) => (
                    <JobCard
                        key={idx}
                        id={job.id}
                        image={job.logoUrl}
                        title={job.title}
                        description={job.description}
                        responsibilities={job.responsibilities}
                        company={job.orgName}
                        location={job.location}
                        work_type={job.opType}
                        position_type={job.categories}
                        slug={job.slug}
                    />
                ))}
            </div>
            <h1>Test</h1>
        </div>
    );
}

export default JobList