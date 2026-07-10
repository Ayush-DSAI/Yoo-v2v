export const styles = {
  container: 'lg:col-span-2 bg-[#0d1222] rounded-2xl shadow-lg border border-gray-800 overflow-hidden flex flex-col',
  header: 'p-6 border-b border-gray-800 bg-[#0d1222]/80 backdrop-blur-md z-10',
  headerContent: 'flex items-center justify-between',
  title: 'text-lg font-semibold text-white',
  subtitle: 'text-sm text-gray-400 mt-0.5',
  controls: 'flex items-center gap-2',
  btnSecondary: 'px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/80 rounded-lg hover:bg-gray-700 hover:text-white transition-colors border border-gray-700',
  btnPrimary: 'px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20',
  mapViewport: 'relative h-80 lg:h-96 bg-[#070a13] overflow-hidden flex-1',
  loadingOverlay: 'absolute inset-0 z-40 bg-[#070a13] flex items-center justify-center transition-opacity duration-700',
  zoomControls: 'absolute bottom-4 right-4 flex flex-col gap-2 z-20',
  controlBtn: 'w-10 h-10 bg-gray-800/90 border border-gray-700 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-700 text-gray-300 hover:text-white transition-colors backdrop-blur-sm'
};
