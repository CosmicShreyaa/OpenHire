export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  tags: string[];
  posted: string;
  applicants: number;
  description: string;
};

export type Application = {
  id: string;
  jobId: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  applied: string;
};

export type RecruiterPosting = {
  id: string;
  title: string;
  applicants: number;
  views: number;
  status: "Active" | "Draft";
};

const API_BASE = import.meta.env?.VITE_API_BASE_URL ?? "/api";

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API request failed: ${res.status} ${res.statusText} ${body}`);
  }
  return res.json();
}

export const fetchJobs = () => fetchJson<Job[]>("/jobs");
export const fetchJob = (id: string) => fetchJson<Job>(`/jobs/${id}`);
export const createJob = (payload: Omit<Job, "id">) =>
  fetchJson<Job>("/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const fetchApplications = () => fetchJson<Application[]>("/applications");
export const createApplication = (payload: Omit<Application, "id">) =>
  fetchJson<Application>("/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const fetchRecruiterPostings = () => fetchJson<RecruiterPosting[]>("/recruiter-postings");
export const createRecruiterPosting = (payload: Omit<RecruiterPosting, "id">) =>
  fetchJson<RecruiterPosting>("/recruiter-postings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
