import React from 'react';
import { Download, Play } from 'lucide-react';

interface VideoPreviewProps {
  originalVideo: File | null;
  processedVideoUrl: string | null;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  originalVideo,
  processedVideoUrl,
}) => {
  const [originalVideoUrl, setOriginalVideoUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (originalVideo) {
      const url = URL.createObjectURL(originalVideo);
      setOriginalVideoUrl(url);
      
      // تنظيف الذاكرة عند إلغاء المكون
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [originalVideo]);
  const downloadProcessedVideo = () => {
    if (processedVideoUrl) {
      const link = document.createElement('a');
      link.href = processedVideoUrl;
      link.download = 'processed_motion_analysis.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {originalVideo && originalVideoUrl && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
            <Play className="h-5 w-5 text-blue-500" style={{ color: '#334483' }}/>
            <h3 className="text-lg font-semibold text-gray-900">الفيديو الأصلي</h3>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <video
                controls
                preload="metadata"
                className="w-full h-64 object-contain"
                src={originalVideoUrl}
                onError={(e) => {
                  console.error('خطأ في تحميل الفيديو:', e);
                }}
              >
                <source src={originalVideoUrl} type="video/mp4" />
                <source src={originalVideoUrl} type="video/avi" />
                <source src={originalVideoUrl} type="video/mov" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p><strong>اسم الملف:</strong> {originalVideo.name}</p>
              <p><strong>الحجم:</strong> {(originalVideo.size / (1024 * 1024)).toFixed(2)} MB</p>
              <p><strong>النوع:</strong> {originalVideo.type}</p>
            </div>
          </div>
        </div>
      )}

      {processedVideoUrl && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Play className="h-5 w-5 text-green-500"style={{ color: '#334483' }} />
              <h3 className="text-lg font-semibold text-gray-900">فيديو التحليل</h3>
            </div>
            <button
  onClick={downloadProcessedVideo}
  className="flex items-center space-x-2 px-3 py-2 text-white rounded-lg transition-colors text-sm"
  style={{ backgroundColor: '#334483' }}
  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2a356d'}
  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#334483'}
>
  <Download className="h-4 w-4" />
  <span>تحميل</span>
</button>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <video
                controls
                preload="metadata"
                className="w-full h-64 object-contain"
                src={processedVideoUrl}
                onError={(e) => {
                  console.error('خطأ في تحميل الفيديو المعالج:', e);
                }}
              >
                <source src={processedVideoUrl} type="video/mp4" />
                <source src={processedVideoUrl} type="video/webm" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <p><strong>الحالة:</strong> تم التحليل بنجاح</p>
              <p><strong>يحتوي على:</strong> رسم المفاصل والاتصالات بين المفاصل</p>
              <p><strong>التقنية:</strong> محاكاة MediaPipe Pose Detection</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};