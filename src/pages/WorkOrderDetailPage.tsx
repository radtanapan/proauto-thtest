import { useParams, Link } from 'react-router-dom';
import { workOrders, customers } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { TimelineItem } from '@/components/TimelineItem';
import { PriceLineItem } from '@/components/PriceLineItem';
import { CustomerAvatar } from '@/components/CustomerAvatar';
import { ArrowLeft, Car, Calendar, User, Wrench } from 'lucide-react';

export default function WorkOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = workOrders.find((wo) => wo.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">ไม่พบงานซ่อม</p>
        <Link to="/work-orders" className="mt-4 text-primary hover:underline">กลับหน้ารายการ</Link>
      </div>
    );
  }

  const partsTotal = order.items.filter(i => i.type === 'part').reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const laborTotal = order.items.filter(i => i.type === 'labor').reduce((s, i) => s + i.quantity * i.unitPrice, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/work-orders" className="rounded-md p-1.5 hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">{order.id}</h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{order.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Vehicle & Customer Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <Car className="h-4 w-4" /> ข้อมูลรถ
              </div>
              <p className="text-base font-semibold text-foreground">{order.vehicleName}</p>
              <p className="mt-1 text-sm text-muted-foreground">ทะเบียน: <span className="font-medium text-foreground">{order.licensePlate}</span></p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                <User className="h-4 w-4" /> ข้อมูลลูกค้า
              </div>
              <div className="flex items-center gap-3">
                <CustomerAvatar name={order.customerName} size="md" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground">{order.customerId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service & Technician */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <Wrench className="h-4 w-4" /> ประเภทงาน
              </div>
              <p className="text-sm font-medium text-foreground">{order.serviceType}</p>
              <p className="mt-1 text-xs text-muted-foreground">ช่าง: {order.technicianName}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" /> กำหนดการ
              </div>
              <p className="text-sm text-muted-foreground">รับรถ: <span className="text-foreground">{order.createdAt}</span></p>
              <p className="mt-1 text-sm text-muted-foreground">คาดว่าเสร็จ: <span className="text-foreground">{order.estimatedCompletion}</span></p>
            </div>
          </div>

          {/* Items */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-card-foreground">รายการซ่อม / อะไหล่</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <PriceLineItem key={item.id} name={item.name} quantity={item.quantity} unitPrice={item.unitPrice} />
              ))}
            </div>
            <div className="mt-4 flex flex-col items-end gap-1 border-t border-border pt-4 text-sm">
              <div className="flex gap-8">
                <span className="text-muted-foreground">ค่าอะไหล่</span>
                <span className="font-medium text-foreground">฿{partsTotal.toLocaleString()}</span>
              </div>
              <div className="flex gap-8">
                <span className="text-muted-foreground">ค่าแรง</span>
                <span className="font-medium text-foreground">฿{laborTotal.toLocaleString()}</span>
              </div>
              <div className="flex gap-8 text-base font-semibold">
                <span className="text-foreground">รวมทั้งหมด</span>
                <span className="text-primary">฿{order.totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">สถานะงาน</h3>
          <div>
            {order.timeline.map((event, i) => (
              <TimelineItem key={i} event={event} isLast={i === order.timeline.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
