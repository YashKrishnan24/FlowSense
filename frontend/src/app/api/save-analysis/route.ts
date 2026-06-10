import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    // For MVP if clerk isn't fully set up, we'll fallback to a demo user
    const actualUserId = userId || 'demo-user-id';

    const body = await request.json();
    const { imageUrl, reportData } = body;

    if (!imageUrl || !reportData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure a user exists (MVP fallback logic)
    let user = await prisma.user.findUnique({ where: { id: actualUserId } });
    if (!user) {
      user = await prisma.user.create({
        data: { id: actualUserId, email: `demo-${Date.now()}@example.com` }
      });
    }

    // Ensure a default project exists for this user
    let project = await prisma.project.findFirst({ where: { userId: user.id } });
    if (!project) {
      project = await prisma.project.create({
        data: { name: 'Default Project', userId: user.id }
      });
    }

    // Create the analysis record and all nested relationships
    const analysis = await prisma.analysis.create({
      data: {
        projectId: project.id,
        type: 'screenshot',
        status: 'COMPLETED',
        screenshotUrl: imageUrl,
        overallScore: reportData.overall_score,
        accessibilityScore: reportData.accessibility_score,
        visualClarityScore: reportData.visual_clarity_score,
        conversionScore: reportData.conversion_score,
        
        report: {
          create: {
            strengths: reportData.strengths,
            weaknesses: reportData.weaknesses,
          }
        },
        
        recommendations: {
          create: reportData.recommendations.map((rec: Record<string, unknown>) => ({
            severity: String(rec.severity),
            impact: String(rec.impact),
            category: String(rec.category),
            description: String(rec.description),
            suggestedFix: String(rec.suggested_fix),
            markerX: Number(rec.marker_x),
            markerY: Number(rec.marker_y),
          }))
        },

        history: {
          create: {
            scoreSnapshot: {
              overall: reportData.overall_score,
              accessibility: reportData.accessibility_score,
              visualClarity: reportData.visual_clarity_score,
              conversion: reportData.conversion_score,
            }
          }
        }
      }
    });

    return NextResponse.json({ success: true, analysisId: analysis.id });
  } catch (error: unknown) {
    console.error('Error saving analysis:', error);
    const msg = error instanceof Error ? error.message : 'Failed to save analysis';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
