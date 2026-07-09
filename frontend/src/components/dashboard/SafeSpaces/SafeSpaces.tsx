import React from 'react';
import { SafeSpacesProps } from './SafeSpaces.types';

export const SafeSpaces: React.FC<SafeSpacesProps> = ({ data, className }) => {
  return (
    <div className={`flex flex-col bg-background-paper border border-divider rounded-xl p-6 h-full ${className || ''}`}>
      <h3 className="text-text-primary text-lg font-semibold mb-2">SafeSpaces</h3>
      <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
        {data ? 'Data Loaded' : 'Widget Content'}
      </div>
    </div>
  );
};
