import { AEGIS_COLORS } from '../contents/colors';

export const THEME_CONFIG = {
  defaultTheme: 'dark' as const,
  storageKey: 'aegis-theme' as const,
  themes: ['light', 'dark'] as const,
  colors: AEGIS_COLORS.themes,
} as const;
