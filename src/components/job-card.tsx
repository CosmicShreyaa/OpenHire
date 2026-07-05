import { MapPin, Clock, Users, DollarSign } from "lucide-react";
import type { Job } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary font-display text-sm font-bold text-primary-foreground shadow-glow">
            {job.logo}
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
        </div>
        <Badge variant="secondary" className="shrink-0">
          {job.type}
        </Badge>
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> {job.location}
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5" /> {job.salary}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {job.posted}
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" /> {job.applicants} applied
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <Button className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90">
          Apply now
        </Button>
        <Button variant="outline" className="flex-1">
          Details
        </Button>
      </div>
    </article>
  );
}
