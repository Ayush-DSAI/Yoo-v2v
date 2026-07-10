export const styles = {
  container: 'bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col',
  title: 'text-lg font-semibold text-gray-900 mb-4',
  grid: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 flex-1',
  btnBase: 'flex flex-col items-center justify-center p-5 rounded-2xl font-semibold transition-all text-xs gap-3 border text-center cursor-pointer relative overflow-hidden h-32',
  iconWrapper: 'p-3 rounded-xl bg-white border shadow-sm transition-transform duration-300',
  labelText: 'text-gray-700 tracking-wide font-medium',
  
  variants: {
    primary: {
      btn: 'bg-blue-50/50 border-blue-100 hover:border-blue-300 text-blue-600',
      icon: 'text-blue-500 border-blue-100'
    },
    danger: {
      btn: 'bg-red-50/50 border-red-100 hover:border-red-300 text-red-600',
      icon: 'text-red-500 border-red-100'
    },
    safe: {
      btn: 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 text-emerald-600',
      icon: 'text-emerald-500 border-emerald-100'
    },
    secondary: {
      btn: 'bg-gray-50/50 border-gray-100 hover:border-gray-300 text-gray-700',
      icon: 'text-gray-500 border-gray-100'
    }
  }
};
