'use client';


import { useRouter } from 'next/navigation';
import { Dropzone } from '@/components/upload/Dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { Loader2 } from 'lucide-react';

export default function AnalyzePage() {
  const router = useRouter();
  const { file, isUploading, isAnalyzing, setUploading, setAnalyzing, setError, error } = useAnalysisStore();

  const uploadToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary configuration missing. Please check your .env variables.");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image to Cloudinary.");
    }

    const data = await res.json();
    return data.secure_url;
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      // 1. Upload to Cloudinary
      setUploading(true);
      setError(null);
      let imageUrl;
      
      try {
        imageUrl = await uploadToCloudinary(file);
      } catch (err: unknown) {
        // Fallback for MVP if cloudinary env vars aren't set
        console.warn("Cloudinary failed, falling back to local /api/upload MVP logic", err);
        const formData = new FormData();
        formData.append('file', file);
        const localRes = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!localRes.ok) throw new Error("Local upload failed as well.");
        const localData = await localRes.json();
        // Construct full URL for FastAPI
        imageUrl = `${window.location.origin}${localData.url}`;
      }
      
      setUploading(false);

      // 2. Trigger synchronous FastAPI AI Analysis
      setAnalyzing(true);
      
      const aiRes = await fetch('http://localhost:8000/api/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl })
      });

      if (!aiRes.ok) {
        throw new Error("AI Analysis failed. Make sure FastAPI is running and GEMINI_API_KEY is set.");
      }

      const reportData = await aiRes.json();

      // 3. Save the result to Next.js Prisma DB
      const saveRes = await fetch('/api/save-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, reportData })
      });

      if (!saveRes.ok) {
        throw new Error("Failed to persist analysis to the database.");
      }

      const { analysisId } = await saveRes.json();
      setAnalyzing(false);
      
      // 4. Redirect to the newly persisted report page
      router.push(`/dashboard/reports/${analysisId}`);
      
    } catch (err: unknown) {
      setUploading(false);
      setAnalyzing(false);
      const msg = err instanceof Error ? err.message : 'An error occurred during analysis.';
      setError(msg);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-primary">New Analysis</h1>
        <p className="text-muted-foreground mt-1 text-sm">Upload a screenshot of your digital product to receive an AI-powered UX audit.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Screenshot Upload</CardTitle>
          <CardDescription>We will analyze visual hierarchy, accessibility, and conversion bottlenecks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Dropzone />

          {error && (
            <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex justify-end border-t pt-6">
            <Button 
              size="lg" 
              onClick={handleAnalyze} 
              disabled={!file || isUploading || isAnalyzing}
              className="w-full md:w-auto"
            >
              {isUploading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
              ) : isAnalyzing ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing UX...</>
              ) : (
                'Generate UX Report'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
