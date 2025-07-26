import { VideoProcessor } from './videoProcessor';

// محاكاة تحليل الحركة - في التطبيق الحقيقي، ستكون هذه العملية على الخادم
export interface MotionData {
  frame: number;
  motion: number;
  armClosure: number;
  shoulderSlope: number;
  footDistance: number;
  handVelocity: number;
}

export const simulateMotionAnalysis = async (
  videoFile: File,
  onProgress: (progress: number, frame: number, totalFrames: number) => void
): Promise<{ data: MotionData[]; processedVideoUrl: string }> => {
  // محاكاة عدد الإطارات (في التطبيق الحقيقي، سيتم استخراجها من الفيديو)
  const totalFrames = Math.floor(Math.random() * 200) + 100; // 100-300 إطار
  const data: MotionData[] = [];
  
  // إنشاء معالج الفيديو
  const processor = new VideoProcessor();

  // محاكاة معالجة الإطارات
  for (let frame = 0; frame < totalFrames; frame++) {
    // توليد بيانات عشوائية تحاكي التحليل الحقيقي
    const motionData: MotionData = {
      frame,
      motion: Math.random() * 0.1 + Math.sin(frame * 0.1) * 0.02,
      armClosure: Math.random() * 0.5 + 0.2 + Math.cos(frame * 0.05) * 0.1,
      shoulderSlope: Math.random() * 20 + 80 + Math.sin(frame * 0.03) * 5,
      footDistance: Math.random() * 0.3 + 0.15 + Math.cos(frame * 0.08) * 0.05,
      handVelocity: Math.random() * 0.2 + Math.sin(frame * 0.15) * 0.1,
    };

    data.push(motionData);

    // تحديث التقدم
    const progress = ((frame + 1) / totalFrames) * 100;
    onProgress(progress, frame + 1, totalFrames);

    // محاكاة زمن المعالجة
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  // إنشاء فيديو معالج مع رسم المفاصل
  let processedVideoUrl: string;
  try {
    processedVideoUrl = await processor.processVideoWithPose(videoFile);
  } catch (error) {
    console.warn('فشل في إنشاء فيديو معالج، استخدام الفيديو الأصلي:', error);
    processedVideoUrl = URL.createObjectURL(videoFile);
  }

  return { data, processedVideoUrl };
};

export const generateSampleData = (frames: number = 100): MotionData[] => {
  const data: MotionData[] = [];
  
  for (let i = 0; i < frames; i++) {
    data.push({
      frame: i,
      motion: Math.random() * 0.1 + Math.sin(i * 0.1) * 0.02,
      armClosure: Math.random() * 0.5 + 0.2 + Math.cos(i * 0.05) * 0.1,
      shoulderSlope: Math.random() * 20 + 80 + Math.sin(i * 0.03) * 5,
      footDistance: Math.random() * 0.3 + 0.15 + Math.cos(i * 0.08) * 0.05,
      handVelocity: Math.random() * 0.2 + Math.sin(i * 0.15) * 0.1,
    });
  }
  
  return data;
};