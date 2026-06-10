import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="w-5 h-5 bg-primary rounded-sm"></div>
          <span>FlowSense</span>
        </Link>
        <div className="flex-1" />
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-foreground">Projects</Link>
          <Link href="/dashboard/analyze" className="text-muted-foreground transition-colors hover:text-foreground">New Analysis</Link>
          <Link href="/dashboard/reports" className="text-muted-foreground transition-colors hover:text-foreground">Reports</Link>
          <Link href="/settings" className="text-muted-foreground transition-colors hover:text-foreground">Settings</Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      <main className="flex-1 bg-gray-50/50 p-8">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
