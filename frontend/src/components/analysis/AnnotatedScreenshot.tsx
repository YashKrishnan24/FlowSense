import React from 'react';

interface Recommendation {
  id: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  category: string;
  description: string;
  marker_x?: number;
  marker_y?: number;
}

interface AnnotatedScreenshotProps {
  imageUrl: string;
  recommendations: Recommendation[];
  activeRecommendationId?: string | null;
  onMarkerClick?: (id: string) => void;
}

export function AnnotatedScreenshot({ imageUrl, recommendations, activeRecommendationId, onMarkerClick }: AnnotatedScreenshotProps) {
  // Only show markers that have X and Y coordinates
  const markers = recommendations.filter(r => r.marker_x !== undefined && r.marker_y !== undefined);

  return (
    <div className="relative rounded-lg overflow-hidden border shadow-sm bg-gray-100 flex items-center justify-center min-h-[300px]">
      <div className="relative inline-block max-w-full">
        <img 
          src={imageUrl} 
          alt="Analyzed Screenshot" 
          className="max-w-full h-auto block"
        />
        
        {/* Render Markers Overlay */}
        {markers.map((rec, index) => {
          const isActive = activeRecommendationId === rec.id;
          const isCritical = rec.severity === 'Critical';
          const isModerate = rec.severity === 'Moderate';
          
          let bgColor = 'bg-blue-500'; // Minor
          if (isCritical) bgColor = 'bg-red-500';
          if (isModerate) bgColor = 'bg-amber-500';

          return (
            <button
              key={rec.id}
              onClick={() => onMarkerClick && onMarkerClick(rec.id)}
              className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-md transform transition-transform ${bgColor} ${isActive ? 'scale-125 ring-4 ring-white shadow-lg z-10' : 'hover:scale-110 z-0'}`}
              style={{ 
                left: `${(rec.marker_x as number) * 100}%`, 
                top: `${(rec.marker_y as number) * 100}%` 
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
