import { Link } from "@tanstack/react-router";
import { Briefcase, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";

export function SiteHeader({ showPostJob = true }: { showPostJob?: boolean }) {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Open<span className="text-gradient">Hire</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { to: "/", label: "Home" },
            { to: "/jobs", label: "Jobs" },
            { to: "/recruiter", label: "Recruiter" },
            { to: "/applicant", label: "Applicant" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&.active]:text-foreground [&.active]:bg-muted"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {showPostJob && (
            <Button className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              <Sparkles className="mr-2 h-4 w-4" />
              Post a job
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
