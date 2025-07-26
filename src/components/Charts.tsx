import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MotionData {
  frame: number;
  motion: number;
  armClosure: number;
  shoulderSlope: number;
  footDistance: number;
  handVelocity: number;
}

interface ChartsProps {
  data: MotionData[];
}

export const Charts: React.FC<ChartsProps> = ({ data }) => {
  if (data.length === 0) return null;

  const frames = data.map(d => d.frame);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const motionData = {
    labels: frames,
    datasets: [
      {
        label: 'الحركة العامة',
        data: data.map(d => d.motion),
        borderColor: '#334483',
        backgroundColor: 'rgba(0, 92, 240, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const armClosureData = {
    labels: frames,
    datasets: [
      {
        label: 'تقارب اليدين',
        data: data.map(d => d.armClosure),
        borderColor: '#23A4BE',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const shoulderSlopeData = {
    labels: frames,
    datasets: [
      {
        label: 'ميل الكتف (درجة)',
        data: data.map(d => d.shoulderSlope),
        borderColor: '#2f22ddff',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const footDistanceData = {
    labels: frames,
    datasets: [
      {
        label: 'تباعد القدمين',
        data: data.map(d => d.footDistance),
        borderColor: '#22DDAB',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.1,
      },
    ],
  };

  const handVelocityData = {
    labels: frames,
    datasets: [
      {
        label: 'سرعة اليدين',
        data: data.map(d => d.handVelocity),
        borderColor: '#23A4BE',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-gray-900 text-center">الرسوم البيانية للتحليل</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">الحركة العامة</h4>
          <Line options={options} data={motionData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">تقارب اليدين</h4>
          <Line options={options} data={armClosureData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">ميل الكتف</h4>
          <Line options={options} data={shoulderSlopeData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">تباعد القدمين</h4>
          <Line options={options} data={footDistanceData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 lg:col-span-2">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">سرعة حركة اليدين</h4>
          <Line options={options} data={handVelocityData} />
        </div>
      </div>
    </div>
  );
};