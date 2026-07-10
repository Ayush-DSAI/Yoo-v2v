export const styles = {
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8',
  cardBase: 'bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
  cardStatus: {
    safe: 'border-emerald-100 bg-emerald-50/10 hover:border-emerald-300',
    warning: 'border-amber-100 bg-amber-50/10 hover:border-amber-300',
    danger: 'border-red-100 bg-red-50/10 hover:border-red-300',
    info: 'border-blue-100 bg-blue-50/10 hover:border-blue-300'
  },
  header: 'flex items-start justify-between mb-4',
  iconWrapper: 'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-md',
  trend: 'flex items-center gap-1 text-sm font-medium',
  value: 'text-3xl font-bold text-gray-900',
  title: 'text-sm text-gray-500 mt-1',
  subtitle: 'text-xs text-gray-400 mt-2'
};
