
import { CalendarCheck2, CircleFadingPlus, Flame, MapPin } from 'lucide-react'
import React from 'react'
import { CalendarClock } from 'lucide-react'
import { Badge } from './ui/badge'
import { formatDate } from '../utils/formDate' // adjust the path based on your structure

interface SlugType {
    categories: string[]
    endDate: string
    startDate: string
    deadline: string
    location: string
    postedOn: string
    requiredSkills: string[]
}

const Sidebar = ({
    categories,
    endDate,
    startDate,
    deadline,
    location,
    postedOn,
    requiredSkills,
}: SlugType) => {
    return (
        <div className="p-5 text-sm text-gray-800 dark:text-white space-y-6">
            <div>
                <h2 className="text-lg font-bold mb-4">About</h2>
                <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                        <CircleFadingPlus className="text-blue-500 mt-1" />
                        <p>
                            <span className="font-bold">Posted On</span>
                            <br />
                            {formatDate(postedOn)}
                        </p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <Flame className="text-orange-500 mt-1" />
                        <p>
                            <span className="font-bold">Deadline</span>
                            <br />
                            {formatDate(deadline)}
                        </p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <MapPin className="text-sky-500 mt-1" />
                        <p>
                            <span className="font-bold">Location</span>
                            <br />
                            {location}
                        </p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <CalendarClock className="text-purple-500 mt-1" />
                        <p>
                            <span className="font-bold">Start Date</span>
                            <br />
                            {formatDate(startDate)}
                        </p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <CalendarCheck2 className="text-green-500 mt-1" />
                        <p>
                            <span className="font-bold">End Date</span>
                            <br />
                            {formatDate(endDate)}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-3 border-t pt-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat, idx) => (
                        <Badge key={idx} variant="outline" className="capitalize">
                            {cat}
                        </Badge>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-3 border-t pt-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {requiredSkills.map((skill, idx) => (
                        <Badge
                            key={idx}
                            className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
