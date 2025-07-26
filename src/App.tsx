import React, { useState } from 'react';
import { VideoUpload } from './components/VideoUpload';
import { AnalysisProgress } from './components/AnalysisProgress';
import { DataTable } from './components/DataTable';
import { Charts } from './components/Charts';
import { VideoPreview } from './components/VideoPreview';
import logo from './logo.jpeg';
import { simulateMotionAnalysis, MotionData } from './utils/motionAnalysis';
import { Activity, BarChart3, FileText, Video, Sparkles } from 'lucide-react';

function App() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [motionData, setMotionData] = useState<MotionData[]>([]);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'table' | 'charts' | 'videos'>('table');

  const handleVideoSelect = (file: File) => {
    setSelectedVideo(file);
    setAnalysisComplete(false);
    setMotionData([]);
    setProcessedVideoUrl(null);
    setProgress(0);
  };

  const handleClearVideo = () => {
    setSelectedVideo(null);
    setAnalysisComplete(false);
    setMotionData([]);
    setProcessedVideoUrl(null);
    setProgress(0);
  };

  const startAnalysis = async () => {
    if (!selectedVideo) return;

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setProgress(0);

    try {
      const result = await simulateMotionAnalysis(
        selectedVideo,
        (progress, frame, total) => {
          setProgress(progress);
          setCurrentFrame(frame);
          setTotalFrames(total);
        }
      );

      setMotionData(result.data);
      setProcessedVideoUrl(result.processedVideoUrl);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('خطأ في التحليل:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const tabs = [
    { id: 'table', label: 'الجدول', icon: FileText },
    { id: 'charts', label: 'الرسوم البيانية', icon: BarChart3 },
    { id: 'videos', label: 'الفيديوهات', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
    
       <img src={logo} alt="شعار لمّاح" className="h-24 w-auto object-contain" />

          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            لمّاح: منصة تحليل الحركة بدقة وذكاء
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            قم برفع فيديو MP4 وسيتم تحليل الحركة باستخدام تقنية MediaPipe لاستخراج بيانات مفصلة حول حركة الجسم
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <VideoUpload
            onVideoSelect={handleVideoSelect}
            selectedVideo={selectedVideo}
            onClearVideo={handleClearVideo}
          />

          {selectedVideo && !isAnalyzing && !analysisComplete && (
            <div className="mt-6 text-center">
              <button
                onClick={startAnalysis}
                className="inline-flex items-center px-8 py-3 text-white font-semibold rounded-lg hover:brightness-110 transition-all duration-200 transform hover:scale-105 shadow-lg"
  style={{ backgroundColor: '#23BCB6' }}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                بدء تحليل الحركة
              </button>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <AnalysisProgress
            isAnalyzing={isAnalyzing}
            progress={progress}
            currentFrame={currentFrame}
            totalFrames={totalFrames}
            isComplete={analysisComplete}
          />
        </div>

        {/* Results Section */}
        {analysisComplete && motionData.length > 0 && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي الإطارات</p>
                    <p className="text-2xl font-bold text-gray-900">{motionData.length}</p>
                  </div>
                  <div className="p-3 bg-black-100 rounded-full">
                    <Video className="h-6 w-6 text-blue-600"style={{ color: '#23BCB6' }} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">متوسط الحركة</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(motionData.reduce((sum, d) => sum + d.motion, 0) / motionData.length).toFixed(4)}
                    </p>
                  </div>
                  <div className="p-3 bg-black-100 rounded-full">
                    <Activity className="h-6 w-6 text-green-600"style={{ color: '#23BCB6' }} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">متوسط ميل الكتف</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(motionData.reduce((sum, d) => sum + d.shoulderSlope, 0) / motionData.length).toFixed(1)}°
                    </p>
                  </div>
                  <div className="p-3 bg-black-100 rounded-full">
                    <BarChart3 className="h-6 w-6 text-orange-600"style={{ color: '#23BCB6' }} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">متوسط سرعة اليدين</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(motionData.reduce((sum, d) => sum + d.handVelocity, 0) / motionData.length).toFixed(4)}
                    </p>
                  </div>
                  <div className="p-3 bg-black-100 rounded-full">
                    <Sparkles className="h-6 w-6 text-purple-600" style={{ color: '#23BCB6' }}/>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'table' && <DataTable data={motionData} />}
                {activeTab === 'charts' && <Charts data={motionData} />}
                {activeTab === 'videos' && (
                  <VideoPreview
                    originalVideo={selectedVideo}
                    processedVideoUrl={processedVideoUrl}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;