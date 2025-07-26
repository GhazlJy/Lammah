import React, { useState } from 'react';
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ResultsDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const maxTime = 30; // 30 seconds demo

  // Sample analysis results
  const analysisResults = {
    avgMotion: 0.020077,
    freezeRatio: 37.01,
    armClosure: 0.4529,
    shoulderSlope: 47.00,
    footDistance: 0.0858,
    handVelocity: 0.024413,
    stressLevel: 'متوسط',
    stressPercentage: 65
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Simulate time progression
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < maxTime) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= maxTime) {
            setIsPlaying(false);
            return maxTime;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime]);

  const getStressColor = (level: string) => {
    switch (level) {
      case 'منخفض': return 'text-green-600';
      case 'متوسط': return 'text-yellow-600';
      case 'مرتفع': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStressGradient = (level: string) => {
    switch (level) {
      case 'منخفض': return 'from-green-400 to-green-500';
      case 'متوسط': return 'from-yellow-400 to-orange-500';
      case 'مرتفع': return 'from-red-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            عرض توضيحي للنتائج
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            شاهد كيف يعمل النظام في الوقت الفعلي مع عرض مفصل للمؤشرات والنتائج
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video Demo Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-video relative">
                {/* Simulated video content */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-lg font-medium">محاكاة تحليل الحركة</p>
                    <p className="text-sm opacity-80 mt-2">
                      الوقت: {currentTime.toFixed(1)}s / {maxTime}s
                    </p>
                  </div>
                </div>

                {/* Skeleton overlay simulation */}
                {isPlaying && (
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      {/* Simulated skeleton points */}
                      <circle cx="200" cy="80" r="3" fill="#10B981" className="animate-pulse" />
                      <circle cx="180" cy="120" r="2" fill="#3B82F6" className="animate-pulse" />
                      <circle cx="220" cy="120" r="2" fill="#3B82F6" className="animate-pulse" />
                      <circle cx="160" cy="160" r="2" fill="#8B5CF6" className="animate-pulse" />
                      <circle cx="240" cy="160" r="2" fill="#8B5CF6" className="animate-pulse" />
                      <circle cx="190" cy="200" r="2" fill="#F59E0B" className="animate-pulse" />
                      <circle cx="210" cy="200" r="2" fill="#F59E0B" className="animate-pulse" />
                      <circle cx="185" cy="250" r="2" fill="#EF4444" className="animate-pulse" />
                      <circle cx="215" cy="250" r="2" fill="#EF4444" className="animate-pulse" />
                      
                      {/* Connecting lines */}
                      <line x1="200" y1="80" x2="200" y2="120" stroke="#10B981" strokeWidth="2" opacity="0.7" />
                      <line x1="200" y1="120" x2="180" y2="120" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
                      <line x1="200" y1="120" x2="220" y2="120" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Video Controls */}
              <div className="p-6 bg-gray-800">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <button
                    onClick={togglePlayback}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  
                  <button
                    onClick={resetDemo}
                    className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-xl transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>

                  <div className="flex-1">
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-100"
                        style={{ width: `${(currentTime / maxTime) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">حالة التحليل</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">استخراج المفاصل</span>
                  <span className="text-sm font-medium text-green-600">✓ مكتمل</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">تحليل الحركة</span>
                  <span className="text-sm font-medium text-green-600">✓ مكتمل</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">تقييم التوتر</span>
                  <span className="text-sm font-medium text-green-600">✓ مكتمل</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">نتائج التحليل المفصلة</h3>
              
              <div className="space-y-4">
                {/* Motion Analysis */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-800">🏃 متوسط الحركة الكلي</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <TrendingDown className="h-4 w-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-900">{analysisResults.avgMotion}</span>
                    </div>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>

                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-cyan-800">❄️ نسبة التجمّد</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <TrendingUp className="h-4 w-4 text-cyan-600" />
                      <span className="text-lg font-bold text-cyan-900">{analysisResults.freezeRatio}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-cyan-200 rounded-full h-2">
                    <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '37%' }}></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-800">👐 متوسط تقارب اليدين</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Minus className="h-4 w-4 text-purple-600" />
                      <span className="text-lg font-bold text-purple-900">{analysisResults.armClosure}</span>
                    </div>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-orange-800">🏋️ متوسط ميلان الأكتاف</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <span className="text-lg font-bold text-orange-900">{analysisResults.shoulderSlope}°</span>
                    </div>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '47%' }}></div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-800">🦶 متوسط تباعد القدمين</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-lg font-bold text-green-900">{analysisResults.footDistance}</span>
                    </div>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-800">✋ متوسط سرعة حركة اليدين</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="text-lg font-bold text-red-900">{analysisResults.handVelocity}</span>
                    </div>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                </div>

    {/* ✅ هذا الفيديو اللي طلبتيه يطلع بدل محاكاة تحليل الحركة */}
    <div className="rounded-2xl overflow-hidden bg-gray-900 shadow-xl">

    </div>


              </div>
            </div>







            {/* Stress Assessment */}
            <div className={`bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200`}>
              <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">تقييم مستوى التوتر النفسي</h4>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getStressColor(analysisResults.stressLevel)} mb-4`}>
                  {analysisResults.stressLevel}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className={`bg-gradient-to-r ${getStressGradient(analysisResults.stressLevel)} h-4 rounded-full transition-all duration-1000`}
                    style={{ width: `${analysisResults.stressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  بناءً على تحليل شامل لأنماط الحركة ولغة الجسد
                </p>
                <div className="bg-white/50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    يُظهر التحليل مستوى توتر متوسط مع مؤشرات على بعض القلق. 
                    يُنصح بممارسة تقنيات الاسترخاء والتنفس العميق.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDemo;