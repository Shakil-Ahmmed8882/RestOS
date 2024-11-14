import React from 'react';
import StatCard from './StatCard';

interface StatData {
  title: string;
  count: string;
  icon: React.ReactNode;
  highlighted?: boolean;
}

interface StatisticsProps {
  stats: StatData[];
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          count={stat.count}
          icon={stat.icon}
          highlighted={stat.highlighted}
        />
      ))}
    </div>
  );
};

export default Statistics;
