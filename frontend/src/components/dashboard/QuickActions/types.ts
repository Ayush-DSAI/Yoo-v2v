import { LucideIcon } from 'lucide-react';

export type ActionType = 'primary' | 'danger' | 'safe' | 'secondary';

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  type: ActionType;
  glowColor: string;
}

export interface QuickActionsProps {
  actions?: QuickAction[];
  className?: string;
}
