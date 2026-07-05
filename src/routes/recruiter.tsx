import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Eye, Users, TrendingUp, Briefcase } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchRecruiterPostings } from "@/lib/api";
import { useTheme } from "@/lib/theme";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

export const Route = createFileRoute("/recruiter")({
  head: () => ({
    meta: [
      { title: "Recruiter dashboard — OpenHire" },
      { name: "description", content: "Track your job postings, applicants, and hiring analytics." },
    ],
  }),
  component: RecruiterPage,
});

function RecruiterPage() {
  const { theme } = useTheme();
  const { data: recruiterPostings = [] } = useQuery({
    queryKey: ["recruiterPostings"],
    queryFn: fetchRecruiterPostings,
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
      accent: isDark ? "rgba(150, 180, 255, 1)" : "rgba(80, 120, 220, 1)",
    };
  }, [theme]);

  const commonOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: colors.text } },
    },
    scales: {
      x: { grid: { color: colors.grid }, ticks: { color: colors.text } },
      y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
    },
  };

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Applications",
        data: [12, 19, 24, 31, 42, 28, 35],
        borderColor: colors.primary,
        backgroundColor: colors.primaryFill,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.primary,
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ["Frontend", "Backend", "Design", "ML", "DevOps", "PM"],
    datasets: [
      {
        label: "Applicants",
        data: [42, 31, 18, 118, 19, 12],
        backgroundColor: colors.primary,
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Applied", "Screening", "Interview", "Offer", "Rejected"],
    datasets: [
      {
        data: [124, 68, 32, 8, 41],
        backgroundColor: [
          "rgba(120,220,180,0.9)",
          "rgba(150,180,255,0.9)",
          "rgba(255,200,120,0.9)",
          "rgba(180,120,220,0.9)",
          "rgba(255,120,140,0.9)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const stats = [
    { label: "Active postings", value: "8", icon: Briefcase, delta: "+2" },
    { label: "Total applicants", value: "273", icon: Users, delta: "+42" },
    { label: "Profile views", value: "5.6k", icon: Eye, delta: "+18%" },
    { label: "Conversion", value: "4.2%", icon: TrendingUp, delta: "+0.6%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Recruiter dashboard</div>
            <h1 className="font-display text-4xl font-bold">Welcome back, Sarah</h1>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" /> New job posting
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between">
                <s.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium text-primary">{s.delta}</span>
              </div>
              <div className="mt-4 font-display text-3xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
            <h3 className="font-display text-lg font-semibold">Applications this week</h3>
            <p className="text-sm text-muted-foreground">Daily inbound applications across all postings</p>
            <div className="mt-4 h-64">
              <Line data={lineData} options={commonOpts} />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold">Pipeline</h3>
            <p className="text-sm text-muted-foreground">Candidate stages</p>
            <div className="mt-4 h-64">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom", labels: { color: colors.text, boxWidth: 10 } } },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
            <h3 className="font-display text-lg font-semibold">Your postings</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Applicants</th>
                    <th className="pb-3 font-medium">Views</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recruiterPostings.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/40">
                      <td className="py-3 font-medium">{p.title}</td>
                      <td className="py-3 text-muted-foreground">{p.applicants}</td>
                      <td className="py-3 text-muted-foreground">{p.views.toLocaleString()}</td>
                      <td className="py-3">
                        <Badge variant={p.status === "Active" ? "default" : "secondary"}>{p.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold">Applicants by role</h3>
            <div className="mt-4 h-64">
              <Bar data={barData} options={commonOpts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
