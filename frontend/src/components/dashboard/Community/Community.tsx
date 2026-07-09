import React from 'react';
import { CommunityProps } from './Community.types';

export const Community: React.FC<CommunityProps> = ({ data, className }) => {
  return (
    <div className={`flex flex-col bg-background-paper border border-divider rounded-xl p-6 h-full ${className || ''}`}>
      <h3 className="text-text-primary text-lg font-semibold mb-2">Community</h3>
      <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
        {data ? 'Data Loaded' : 'Widget Content'}
      </div>
    </div>
  );
};
