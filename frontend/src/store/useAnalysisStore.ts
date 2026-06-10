import { create } from 'zustand';

interface AnalysisState {
  file: File | null;
  previewUrl: string | null;
  isUploading: boolean;
  isAnalyzing: boolean;
  analysisId: string | null;
  error: string | null;
  setFile: (file: File | null) => void;
  setUploading: (status: boolean) => void;
  setAnalyzing: (status: boolean) => void;
  setAnalysisId: (id: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  file: null,
  previewUrl: null,
  isUploading: false,
  isAnalyzing: false,
  analysisId: null,
  error: null,
  setFile: (file) => set({ file, previewUrl: file ? URL.createObjectURL(file) : null }),
  setUploading: (status) => set({ isUploading: status }),
  setAnalyzing: (status) => set({ isAnalyzing: status }),
  setAnalysisId: (id) => set({ analysisId: id }),
  setError: (error) => set({ error }),
  reset: () => set({ file: null, previewUrl: null, isUploading: false, isAnalyzing: false, analysisId: null, error: null })
}));
