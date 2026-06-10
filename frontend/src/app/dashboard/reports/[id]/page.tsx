import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ReportClient from './ReportClient';

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Fetch the real analysis data from the database
  const analysis = await prisma.analysis.findUnique({
    where: { id },
    include: {
      report: true,
      recommendations: true,
    }
  });

  if (!analysis) {
    notFound();
  }

  // Transform Prisma model to match our UI component's expected structure
  const reportData = {
    id: analysis.id,
    imageUrl: analysis.screenshotUrl || '',
    scores: {
      overall: analysis.overallScore || 0,
      accessibility: analysis.accessibilityScore || 0,
      visualClarity: analysis.visualClarityScore || 0,
      conversion: analysis.conversionScore || 0
    },
    strengths: analysis.report?.strengths || [],
    weaknesses: analysis.report?.weaknesses || [],
    recommendations: analysis.recommendations.map(r => ({
      id: r.id,
      severity: r.severity as 'Critical' | 'Moderate' | 'Minor',
      impact: r.impact,
      category: r.category,
      description: r.description,
      suggestedFix: r.suggestedFix,
      marker_x: r.markerX !== null ? r.markerX : undefined,
      marker_y: r.markerY !== null ? r.markerY : undefined
    }))
  };

  return <ReportClient initialData={reportData} />;
}
