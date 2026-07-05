import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { JobCard } from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchJobs } from "@/lib/api";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Browse jobs — OpenHire" },
      { name: "description", content: "Browse open roles from top companies on OpenHire." },
    ],
  }),
  component: JobsPage,
});

const filters = ["All", "Remote", "Full-time", "Contract", "Part-time"];

function JobsPage() {
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const filtered = jobs.filter(
    (j) =>
      (f === "All" || j.type === f) &&
      (q === "" ||
        j.title.toLowerCase().includes(q.toLowerCase()) ||
        j.company.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-4xl font-bold">Open roles</h1>
          <p className="text-muted-foreground">
            {filtered.length} of {jobs.length} roles matching your filters.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-card md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2 px-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title or company"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {filters.map((k) => (
              <Button
                key={k}
                variant={f === k ? "default" : "ghost"}
                size="sm"
                onClick={() => setF(k)}
                className={f === k ? "bg-gradient-primary text-primary-foreground" : ""}
              >
                {k}
              </Button>
            ))}
            <Button variant="outline" size="sm">
              <Filter className="mr-1 h-3.5 w-3.5" /> More
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </div>
    </div>
  );
}
