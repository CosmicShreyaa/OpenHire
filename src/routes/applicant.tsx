import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { Bookmark, CheckCircle2, Clock, XCircle, Send } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchApplications, fetchJobs } from "@/lib/api";
import { useTheme } from "@/lib/theme";

ChartJS.register(CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend, Filler);

export const Route = createFileRoute("/applicant")({
  head: () => ({
    meta: [
      { title: "Applicant dashboard — OpenHire" },
      { name: "description", content: "Track your job applications, saved roles, and hiring pipeline progress." },
    ],
  }),
  component: ApplicantPage,
});

const statusMeta: Record<string, { icon: any; color: string }> = {
  Applied: { icon: Send, color: "text-muted-foreground" },
  Interview: { icon: Clock, color: "text-primary" },
  Offer: { icon: CheckCircle2, color: "text-primary" },
  Rejected: { icon: XCircle, color: "text-destructive" },
};

function ApplicantPage() {
  const { theme } = useTheme();
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
  const { data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
  const [, force] = useState(0);
  useEffect(() => {
    force((n) => n + 1);
  }, [theme]);

  const colors = useMemo(() => {
    const isDark = theme === "dark";
    return {
      grid: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      text: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
      primary: isDark ? "rgba(120, 220, 180, 1)" : "rgba(40, 170, 120, 1)",
      primaryFill: isDark ? "rgba(120, 220, 180, 0.15)" : "rgba(40, 170, 120, 0.12)",
    };
  }, [theme]);

  const activity = {
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    datasets: [
      {
        label: "Applications sent",
        data: [2, 4, 3, 6, 5, 8, 4, 7],
        borderColor: colors.primary,
        backgroundColor: colors.primaryFill,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.primary,
        borderWidth: 2,
      },
    ],
  };

  const status = {
    labels: ["Applied", "Interview", "Offer", "Rejected"],
    datasets: [
      {
        data: [12, 4, 1, 3],
        backgroundColor: [
          "rgba(150,180,255,0.9)",
          "rgba(255,200,120,0.9)",
          "rgba(120,220,180,0.9)",
          "rgba(255,120,140,0.9)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader showPostJob={false} />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Applicant dashboard</div>
            <h1 className="font-display text-4xl font-bold">Hi Alex — 3 updates today</h1>
          </div>
          <Link to="/jobs">
            <Button className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              Find new roles
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            { label: "Applications", value: "20" },
            { label: "Interviews", value: "4" },
            { label: "Offers", value: "1" },
            { label: "Saved jobs", value: "9" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="mt-2 font-display text-3xl font-bold">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
            <h3 className="font-display text-lg font-semibold">Application activity</h3>
            <p className="text-sm text-muted-foreground">Weekly applications sent over the last 8 weeks</p>
            <div className="mt-4 h-64">
              <Line
                data={activity}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { labels: { color: colors.text } } },
                  scales: {
                    x: { grid: { color: colors.grid }, ticks: { color: colors.text } },
                    y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
                  },
                }}
              />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold">Status breakdown</h3>
            <div className="mt-4 h-64">
              <Doughnut
                data={status}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom", labels: { color: colors.text, boxWidth: 10 } } },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Your applications</h3>
            <Bookmark className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-4 divide-y divide-border">
            {applications.map((a) => {
              const job = jobs.find((j) => j.id === a.jobId)!;
              const meta = statusMeta[a.status];
              const Icon = meta.icon;
              return (
                <div key={a.id} className="flex items-center gap-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary font-display text-sm font-bold text-primary-foreground shadow-glow">
                    {job.logo}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {job.company} · {job.location}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm ${meta.color}`}>
                    <Icon className="h-4 w-4" />
                    <Badge variant="secondary">{a.status}</Badge>
                  </div>
                  <div className="hidden text-xs text-muted-foreground md:block">{a.applied}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
