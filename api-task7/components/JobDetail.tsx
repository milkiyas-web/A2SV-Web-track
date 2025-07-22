"use client";

import { useEffect } from "react";
import { Job } from "@/types/job";
import Sidebar from "./Sidebar";
import { CircleCheckBig, MapPin } from "lucide-react";

export default function JobDetail({ job }: { job: Job }) {
    useEffect(() => {
        console.log(job);
    }, [job]);
    const responsibilitiesList = job.responsibilities
        .split(/\. (?=[A-Z])/)
        .filter(Boolean)
        .map((sentence) => sentence.trim().endsWith(".") ? sentence.trim() : sentence.trim() + ".");

    return (
        <div className="p-6 flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">Description</h1>
                <p className="mb-4">{job.description}</p>

                <h2 className="text-xl font-bold mt-10 mb-3">Responsibilities</h2>
                <ul className="space-y-2 mt-2">
                    {/* {res
                        .split("/[\n\r.]+/")
                        .map((r, i) => r.trim())
                        .filter((r) => r.length > 0)
                        .map((r, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <CircleCheckBig className="text-green-500 mt-1" size={20} />
                                <span>{r}.</span>
                            </li>
                        ))} */}
                    {responsibilitiesList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>

                <div>
                    <h2 className="text-xl font-bold mt-10 mb-3">
                        Ideal Candidate we want
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {job.idealCandidate}
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mt-10 mb-3">When & Where</h2>
                    <div className="flex gap-1.5">
                        <MapPin
                            color="#26A4FF"
                            className="border-2 rounded-full text-9xl p-1"
                        />
                        <p>{job.whenAndWhere}</p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/3 xl:w-1/4 mt-8 lg:mt-0">

                <Sidebar
                    categories={job.categories}
                    location={job.location}
                    startDate={job.startDate}
                    endDate={job.endDate}
                    deadline={job.deadline}
                    postedOn={job.datePosted}
                    requiredSkills={job.requiredSkills}
                />
            </div>
        </div>
    );
}
