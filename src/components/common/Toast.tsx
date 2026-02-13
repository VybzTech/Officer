import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

const ICONS: Record<string, React.ReactNode> = {
  success: <CheckCircle size={20} className="text-green-600" />,
  error: <XCircle size={20} className="text-red-600" />,
  warning: <AlertTriangle size={20} className="text-yellow-600" />,
  info: <Info size={20} className="text-blue-600" />,
};
const BGS: Record<string, string> = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200',
};

export default function Toast() {
  const { snackbar, hideSnackbar } = useUIStore();
  useEffect(() => { if (snackbar.visible) { const t = setTimeout(hideSnackbar, 4000); return () => clearTimeout(t); } }, [snackbar.visible, hideSnackbar]);

  return (
    <AnimatePresence>
      {snackbar.visible && (
        <motion.div initial={{ opacity: 0, y: -60, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: -60, x: '-50%' }}
          className={`fixed top-4 left-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[300px] max-w-[500px] ${BGS[snackbar.type]}`}>
          {ICONS[snackbar.type]}
          <p className="flex-1 text-sm font-medium text-[#1A1A1A]">{snackbar.message}</p>
          <button onClick={hideSnackbar} className="text-[#999] hover:text-[#1A1A1A] cursor-pointer"><X size={16} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
