import { workOrders } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Camera, CheckCircle, Wrench, Clock } from 'lucide-react';
import { useState } from 'react';
import type { WorkOrderStatus } from '@/data/mockData';

const technicianOrders = workOrders.filter(
  (wo) => wo.technicianName === 'ช่างสมศักดิ์' && ['รับรถ', 'กำลังซ่อม', 'รอชิ้นส่วน'].includes(wo.status)
);

const nextStatus: Partial<Record<WorkOrderStatus, WorkOrderStatus>> = {
  'รับรถ': 'กำลังซ่อม',
  'กำลังซ่อม': 'เสร็จแล้ว',
  'รอชิ้นส่วน': 'กำลังซ่อม',
};

export default function TechnicianViewPage() {
  const [orders, setOrders] = useState(technicianOrders);

  const updateStatus = (id: string) => {
    setOrders(orders.map(o => {
      if (o.id === id && nextStatus[o.status]) {
        return { ...o, status: nextStatus[o.status]! };
      }
      return o;
    }));
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">งานของฉัน</h1>
          <p className="text-sm text-muted-foreground">ช่างสมศักดิ์ — {orders.length} งาน</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{order.licensePlate}</span>
                  <StatusBadge status={order.status} />
                </div>
                <p className="mt-1 text-sm text-foreground">{order.vehicleName}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{order.customerName}</p>
              </div>
              <span className="text-xs text-muted-foreground">{order.id}</span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">{order.description}</p>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>คาดว่าเสร็จ: {order.estimatedCompletion}</span>
            </div>

            {/* Big Action Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {nextStatus[order.status] && (
                <button
                  onClick={() => updateStatus(order.id)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-success py-3 text-sm font-semibold text-success-foreground min-h-[48px] hover:bg-success/90 transition-colors"
                >
                  {order.status === 'กำลังซ่อม' ? <CheckCircle className="h-5 w-5" /> : <Wrench className="h-5 w-5" />}
                  {order.status === 'กำลังซ่อม' ? 'ซ่อมเสร็จ' : 'เริ่มซ่อม'}
                </button>
              )}
              <button className="flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground min-h-[48px] hover:bg-primary/90 transition-colors">
                <Camera className="h-5 w-5" />
                ถ่ายรูป
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="flex flex-col items-center py-16 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mb-3" />
            <p className="text-lg font-medium">ไม่มีงานค้าง</p>
          </div>
        )}
      </div>
    </div>
  );
}
