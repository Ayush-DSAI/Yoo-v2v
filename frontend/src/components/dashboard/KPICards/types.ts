import React from 'react';

export type CardStatus = 'safe' | 'warning' | 'danger' | 'info';

export interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  color: string;
  status?: CardStatus;
}

export interface KPICardsProps {
  stats?: StatCardProps[];
  loading?: boolean;
  error?: string;
  empty?: boolean;
}
