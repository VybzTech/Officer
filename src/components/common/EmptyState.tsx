import Button from '@/components/ui/Button';

export default function EmptyState({ icon = '📭', title, message, actionLabel, onAction }: { icon?: string; title: string; message?: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{title}</h3>
      {message && <p className="text-sm text-[#666] max-w-sm mb-6">{message}</p>}
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
