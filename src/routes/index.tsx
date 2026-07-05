import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Search, Building2, Users, TrendingUp, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchJobs } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OpenHire — Where great teams meet great talent" },
      { name: "description", content: "A lightweight job board connecting recruiters and applicants. Post roles, discover jobs, and hire faster." },
      { property: "og:title", content: "OpenHire — Where great teams meet great talent" },
      { property: "og:description", content: "Post roles, discover jobs, and hire faster on OpenHire." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              12,483 open roles this week
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Where great teams
              <br />
              meet <span className="text-gradient">great talent.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              OpenHire is a lightweight job board built for modern teams. Post a role in minutes, or find your
              next opportunity from top companies.
            </p>

            <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-card/70 p-2 backdrop-blur sm:flex-row">
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                  placeholder="Job title, keyword or company"
                />
              </div>
              <Button className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                Search jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              Popular:
              {["React", "Product Design", "Remote", "Backend", "Marketing"].map((t) => (
                <span key={t} className="rounded-full border border-border bg-card px-2.5 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Building2, label: "Companies", value: "2,400+" },
              { icon: Users, label: "Applicants", value: "180k" },
              { icon: TrendingUp, label: "Hires / mo", value: "3.2k" },
              { icon: ShieldCheck, label: "Verified", value: "98%" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
                <s.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 font-display text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Featured openings</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked roles from teams hiring right now.</p>
          </div>
          <Link to="/jobs" className="hidden text-sm font-medium text-primary hover:underline md:block">
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.slice(0, 6).map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </section>

      {/* Two paths */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/recruiter"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-card transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-primary opacity-20 blur-3xl transition group-hover:opacity-40" />
            <Building2 className="h-8 w-8 text-primary" />
            <h3 className="mt-6 font-display text-2xl font-bold">I'm hiring</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Post roles, track applicants, and see live analytics on your open positions.
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">
              Open recruiter dashboard <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>

          <Link
            to="/applicant"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-card transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-primary opacity-20 blur-3xl transition group-hover:opacity-40" />
            <Users className="h-8 w-8 text-primary" />
            <h3 className="mt-6 font-display text-2xl font-bold">I'm looking</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Track applications, monitor progress, and get notified when recruiters respond.
            </p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">
              Open applicant dashboard <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          © 2026 OpenHire. A lightweight job board.
        </div>
      </footer>
    </div>
  );
}
