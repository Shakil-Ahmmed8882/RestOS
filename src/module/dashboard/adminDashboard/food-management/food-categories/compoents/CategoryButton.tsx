// src/components/CategoryButton.tsx
import React from 'react';
import { IceCream, Coffee, Sandwich, Pizza } from 'lucide-react';

interface CategoryButtonProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ id, label, icon: Icon, isActive, onClick }) => {
  return (
    <button
      key={id}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-xl transition-colors ${
        isActive ? '!bg-gradient-to-r from-[#e2ffe471] to-[#dbffde71] text-primaryColor' : 'hover:bg-default-100 text-light-gray'
      }`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive ? 'bg-[white]' : 'bg-default-100'}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm">{label}</span>
    </button>
  );
};

export default CategoryButton;
