import { WorkOrder } from '@/data/mockData';
import { StatusBadge } from './StatusBadge';
import { CustomerAvatar } from './CustomerAvatar';
import { Wrench } from 'lucide-react';

interface WorkOrderCardProps {
  order: WorkOrder;
  onClick?: () => void;
}

export function WorkOrderCard({ order, onClick }: WorkOrderCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-muted-foreground">{order.id}</span>
        <StatusBadge status={order.status} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded bg-secondary px-2 py-0.5 text-sm font-semibold text-foreground">
          {order.licensePlate}
        </span>
      </div>
      <p className="mt-2 text-sm text-foreground">{order.vehicleName}</p>
      <div className="mt-3 flex items-center gap-2">
        <CustomerAvatar name={order.customerName} size="sm" />
        <span className="text-sm text-muted-foreground">{order.customerName}</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Wrench className="h-3 w-3" />
        <span>{order.serviceType}</span>
        <span className="mx-1">•</span>
        <span>{order.technicianName}</span>
      </div>
    </div>
  );
}
