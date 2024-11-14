import React from 'react';

interface StatCardProps {
  title: string;
  count: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, highlighted = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-20 rounded-lg shadow-md
        ${highlighted ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
    >
      <div className="text-2xl">{count}</div>
      <div className="text-sm flex items-center">
        {icon} <span className="ml-1">{title}</span>
      </div>
    </div>
  );
};

export default StatCard;
