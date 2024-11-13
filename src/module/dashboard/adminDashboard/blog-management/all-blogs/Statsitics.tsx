import React from 'react';
import { BiLogIn } from 'react-icons/bi';
import { DisLikeIcon, LikeIcon } from '../../../../../assets/icons';
import { CommentIcon } from '../../../../../assets/icons/Icons';
import { Notebook } from 'lucide-react';

const Statsitics = () => {
  const stats = [
    { title: 'Total Blogs', count: '80', icon: <Notebook className='size-5 text-[gray]'/> },
    { title: 'Total Comments', count: '284', icon: <CommentIcon className='text-deepPink'/>, highlighted: true },
    { title: 'Total Likes', count: '7,842', icon: <LikeIcon className='text-primaryColor shadow-primaryColor    size-6'/> },
    { title: 'Total Dislikes', count: '2,842', icon: <DisLikeIcon className='size-6 text-deepPink font-bold shadow-primaryPink '/> },
  ];

  return (
    <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center w-full h-20 rounded-lg shadow-md
            ${stat.highlighted ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}
          `}
        >
          <div className="text-2xl">{stat.count}</div>
          <div className="text-sm flex items-center">
            {stat.icon} <span className="ml-1">{stat.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statsitics;
