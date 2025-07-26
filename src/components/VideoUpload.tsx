import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  selectedVideo: File | null;
  onClearVideo: () => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({
  onVideoSelect,
  selectedVideo,
  onClearVideo,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        onVideoSelect(file);
      }
    }
  }, [onVideoSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // التحقق من نوع الملف بشكل أكثر دقة
      const validTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'video/x-msvideo'];
      if (file.type.startsWith('video/') || validTypes.includes(file.type)) {
        onVideoSelect(file);
      } else {
        alert('يرجى اختيار ملف فيديو صالح (MP4, AVI, MOV)');
      }
    }
  }, [onVideoSelect]);

  return (
    <div className="w-full">
      {!selectedVideo ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="video/mp4,video/avi,video/mov,video/quicktime,video/x-msvideo"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            اختر فيديو MP4 أو اسحبه هنا
          </p>
          <p className="text-sm text-gray-500">
            يدعم الصيغ: MP4, AVI, MOV, QuickTime (الحد الأقصى: 100MB)
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="h-8 w-8 text-blue-500" style={{ color: '#334483' }}/>
              <div>
                <p className="font-medium text-gray-900">{selectedVideo.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={onClearVideo}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};