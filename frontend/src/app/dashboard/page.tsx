import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, BarChart3, Activity } from 'lucide-react';

export default async function DashboardPage() {
  const { userId } = auth();
  const actualUserId = userId || 'demo-user-id';

  const userProjects = await prisma.project.findMany({
    where: { userId: actualUserId },
    include: {
      analyses: {
        orderBy: { id: 'desc' },
        take: 5
      }
    }
  });

  const allAnalyses = userProjects.flatMap(p => p.analyses);
  const totalAnalyses = allAnalyses.length;
  const avgScore = totalAnalyses > 0 
    ? Math.round(allAnalyses.reduce((acc, curr) => acc + (curr.overallScore || 0), 0) / totalAnalyses)
    : 0;

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your projects and view UX insights.</p>
        </div>
        <Link href="/dashboard/analyze">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> New Analysis
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Analyses</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAnalyses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. UX Score</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgScore > 0 ? `${avgScore}/100` : '-'}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Analyses</h2>
      <div className="bg-white border rounded-xl overflow-hidden">
        {allAnalyses.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No analyses found. Run your first UX audit to see history here!
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Overall Score</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {allAnalyses.map(analysis => (
                <tr key={analysis.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">{analysis.id}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {analysis.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{analysis.overallScore || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/dashboard/reports/${analysis.id}`}>
                      <Button variant="ghost" size="sm">View Report</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
