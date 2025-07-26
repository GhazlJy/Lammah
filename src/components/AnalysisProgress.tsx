import React from 'react';
import { Activity, Clock, CheckCircle } from 'lucide-react';

interface AnalysisProgressProps {
  isAnalyzing: boolean;
  progress: number;
  currentFrame: number;
  totalFrames: number;
  isComplete: boolean;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  isAnalyzing,
  progress,
  currentFrame,
  totalFrames,
  isComplete,
}) => {
  if (!isAnalyzing && !isComplete) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isComplete ? (
            <CheckCircle className="h-6 w-6 text-green-500" style={{ color: '#23BCB6' }}  />
          ) : (
            <Activity className="h-6 w-6 text-blue-500 animate-pulse" />
          )}
          <h3 className="text-lg font-semibold text-gray-900">
            {isComplete ? 'تم التحليل بنجاح' : 'جاري تحليل الحركة...'}
          </h3>
        </div>
        {!isComplete && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>الإطار {currentFrame} من {totalFrames}</span>
          </div>
        )}
      </div>
<div className="space-y-3">
  <div className="flex justify-between text-sm text-gray-600">
    <span>التقدم</span>
    <span>{Math.round(progress)}%</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%`, backgroundColor: '#23BCB6' }}
    />
  </div>
</div>

      {isComplete && (
<div className="mt-4 p-3 bg-[#E0F8F7] rounded-lg border border-[#23BCB6]">
  <p className="text-sm text-[#23BCB6]">
            تم تحليل الفيديو بنجاح مع رسم المفاصل! يمكنك الآن عرض النتائج وتحميل الملفات.
          </p>
        </div>
      )}
    </div>
  );
};