import { useState } from 'react';
import { workOrders, WorkOrderStatus } from '@/data/mockData';
import { WorkOrderCard } from '@/components/WorkOrderCard';
import { useNavigate } from 'react-router-dom';

const columns: { status: WorkOrderStatus; label: string; color: string }[] = [
  { status: 'รับรถ', label: 'รับรถ', color: 'border-t-status-received' },
  { status: 'กำลังซ่อม', label: 'กำลังซ่อม', color: 'border-t-status-repairing' },
  { status: 'รอชิ้นส่วน', label: 'รอชิ้นส่วน', color: 'border-t-status-waiting' },
  { status: 'เสร็จแล้ว', label: 'เสร็จแล้ว', color: 'border-t-status-completed' },
];

export default function WorkOrderKanbanPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">งานซ่อม — Kanban Board</h1>
      </div>

      {/* Mobile: stacked, Desktop: columns */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {columns.map((col) => {
          const items = workOrders.filter((wo) => wo.status === col.status);
          return (
            <div key={col.status} className={`rounded-lg border border-border bg-secondary/30 border-t-4 ${col.color}`}>
              <div className="flex items-center justify-between p-4 pb-2">
                <h3 className="text-sm font-semibold text-foreground">{col.label}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <div className="space-y-3 p-4 pt-2">
                {items.map((order) => (
                  <WorkOrderCard
                    key={order.id}
                    order={order}
                    onClick={() => navigate(`/work-orders/${order.id}`)}
                  />
                ))}
                {items.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">ไม่มีรายการ</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
