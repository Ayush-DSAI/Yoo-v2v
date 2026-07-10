export const threatLevels = {
  low: {
    label: 'Low',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    value: 1,
  },
  moderate: {
    label: 'Moderate',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    value: 2,
  },
  high: {
    label: 'High',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    value: 3,
  },
  severe: {
    label: 'Severe',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    value: 4,
  },
} as const;

export const reportCategories = [
  { id: 'harassment', label: 'Harassment', icon: 'alert-triangle' },
  { id: 'assault', label: 'Assault', icon: 'alert-circle' },
  { id: 'theft', label: 'Theft', icon: 'lock' },
  { id: 'suspicious_activity', label: 'Suspicious Activity', icon: 'eye' },
  { id: 'unsafe_area', label: 'Unsafe Area', icon: 'map-pin' },
  { id: 'lighting', label: 'Poor Lighting', icon: 'lightbulb' },
  { id: 'other', label: 'Other', icon: 'more-horizontal' },
] as const;

export const safeSpaceTypes = [
  { id: 'hospital', label: 'Hospital', icon: 'hospital' },
  { id: 'police', label: 'Police Station', icon: 'shield' },
  { id: 'pharmacy', label: 'Pharmacy', icon: 'pill' },
  { id: 'hostel', label: 'Hostel', icon: 'home' },
  { id: 'women_help', label: 'Women Help Center', icon: 'heart' },
] as const;
