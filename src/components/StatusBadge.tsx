import { WorkOrderStatus } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusConfig: Record<WorkOrderStatus, { label: string; className: string }> = {
  'รับรถ': { label: 'รับรถ', className: 'bg-status-received/15 text-status-received border-status-received/30' },
  'กำลังซ่อม': { label: 'กำลังซ่อม', className: 'bg-status-repairing/15 text-status-repairing border-status-repairing/30' },
  'รอชิ้นส่วน': { label: 'รอชิ้นส่วน', className: 'bg-status-waiting/15 text-status-waiting border-status-waiting/30' },
  'เสร็จแล้ว': { label: 'เสร็จแล้ว', className: 'bg-status-completed/15 text-status-completed border-status-completed/30' },
  'ส่งมอบ': { label: 'ส่งมอบ', className: 'bg-status-delivered/15 text-status-delivered border-status-delivered/30' },
};

export function StatusBadge({ status }: { status: WorkOrderStatus }) {
  const config = statusConfig[status];
  return (
    <span className={cn('inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border', config.className)}>
      {config.label}
    </span>
  );
}
