'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnnotatedScreenshot } from '@/components/analysis/AnnotatedScreenshot';
import { Download, AlertCircle, CheckCircle2, ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePdfExport } from '@/hooks/usePdfExport';

interface Recommendation {
  id: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  impact: string;
  category: string;
  description: string;
  suggestedFix: string;
  marker_x?: number;
  marker_y?: number;
}

interface ReportData {
  id: string;
  imageUrl: string;
  scores: {
    overall: number;
    accessibility: number;
    visualClarity: number;
    conversion: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: Recommendation[];
}

export default function ReportClient({ initialData }: { initialData: ReportData }) {
  const [activeRecId, setActiveRecId] = useState<string | null>(null);
  const { exportPdf, isExporting } = usePdfExport();

  const handleExportPDF = () => {
    exportPdf('report-container', `FlowSense_UX_Audit_${initialData.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="p-2 border rounded-md hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary">UX Analysis Report</h1>
            <p className="text-sm text-muted-foreground mt-1">Report ID: {initialData.id}</p>
          </div>
        </div>
        <Button onClick={handleExportPDF} variant="outline" className="flex items-center gap-2" disabled={isExporting}>
          {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {isExporting ? 'Generating PDF...' : 'Export PDF'}
        </Button>
      </div>

      <div id="report-container">
        {/* Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ScoreCard title="Overall UX" score={initialData.scores.overall} />
          <ScoreCard title="Accessibility" score={initialData.scores.accessibility} />
          <ScoreCard title="Visual Clarity" score={initialData.scores.visualClarity} />
          <ScoreCard title="Conversion" score={initialData.scores.conversion} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Image and Annotations */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Annotated Screenshot</CardTitle>
                <CardDescription>Visual map of identified issues.</CardDescription>
              </CardHeader>
              <CardContent>
                <AnnotatedScreenshot 
                  imageUrl={initialData.imageUrl} 
                  recommendations={initialData.recommendations}
                  activeRecommendationId={activeRecId}
                  onMarkerClick={setActiveRecId}
                />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {initialData.strengths.map((str, i) => <li key={i}>• {str}</li>)}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" /> Weaknesses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {initialData.weaknesses.map((weak, i) => <li key={i}>• {weak}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column: Recommendations List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight mb-4">Actionable Recommendations</h2>
            {initialData.recommendations.map((rec, index) => {
              const isCritical = rec.severity === 'Critical';
              return (
                <div 
                  key={rec.id}
                  onMouseEnter={() => setActiveRecId(rec.id)}
                  onMouseLeave={() => setActiveRecId(null)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${activeRecId === rec.id ? 'ring-2 ring-primary border-primary bg-blue-50/30' : 'bg-white hover:border-gray-300'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${isCritical ? 'bg-red-500' : rec.severity === 'Moderate' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                        {index + 1}
                      </span>
                      <span className="font-semibold text-sm">{rec.category}</span>
                    </div>
                    <Badge variant={isCritical ? 'destructive' : 'secondary'}>{rec.severity}</Badge>
                  </div>
                  <p className="text-sm text-primary font-medium mb-2">{rec.description}</p>
                  <div className="bg-gray-50 rounded-md p-3 text-sm text-muted-foreground border">
                    <span className="font-semibold text-primary block mb-1">Suggested Fix:</span>
                    {rec.suggestedFix}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ title, score }: { title: string, score: number }) {
  let color = 'text-green-600';
  if (score < 80) color = 'text-amber-600';
  if (score < 60) color = 'text-red-600';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-sm font-medium text-muted-foreground mb-2">{title}</div>
        <div className={`text-3xl font-bold ${color}`}>{score}<span className="text-lg text-muted-foreground font-normal">/100</span></div>
      </CardContent>
    </Card>
  );
}
