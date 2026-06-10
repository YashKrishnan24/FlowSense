'use client';

import React, { useCallback } from 'react';
import { UploadCloud, FileImage, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export function Dropzone() {
  const { file, previewUrl, setFile, isUploading } = useAnalysisStore();

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
      }
    }
  }, [setFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="w-12 h-12 bg-blue-50 text-accent rounded-full flex items-center justify-center mb-4">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-1">Click or drag screenshot here</h3>
          <p className="text-sm text-muted-foreground mb-6">Supports PNG, JPG, JPEG, WEBP</p>
          <Button variant="outline" type="button">Select File</Button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      ) : (
        <div className="border rounded-xl p-6 bg-white shadow-sm flex items-start gap-6">
          <div className="relative w-40 h-28 bg-gray-100 rounded-lg overflow-hidden border">
            {previewUrl && <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileImage className="w-5 h-5 text-accent" />
                <span className="font-medium text-sm text-primary">{file.name}</span>
              </div>
              <button 
                onClick={() => setFile(null)} 
                disabled={isUploading}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            {/* The analyze button will be rendered by the parent component or added here */}
          </div>
        </div>
      )}
    </div>
  );
}
