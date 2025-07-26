// types/job.ts
export interface Job {
  id: string;
  eventID: string;
  title: string;
  orgName: string;
  logoUrl: string;
  opType: string;
  description: string;
  responsibilities: string;
  idealCandidate: string;
  whenAndWhere: string;
  datePosted: string;
  deadline: string;
  startDate: string;
  endDate: string;
  // categories: string[];
  requiredSkills: string[];

  company: string;
  location: string;
  image: string;
  position_type: string[];
  work_type: string;
  slug: string;
  categories: string[];
}

export interface JobList {
  job_postings: Job[];
}
