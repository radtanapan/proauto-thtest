import { useParams, Link } from 'react-router-dom';
import { customers, workOrders } from '@/data/mockData';
import { CustomerAvatar } from '@/components/CustomerAvatar';
import { StatusBadge } from '@/components/StatusBadge';
import { TimelineItem } from '@/components/TimelineItem';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, Car, MapPin, Calendar, Edit, Plus, FileText } from 'lucide-react';

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const customer = customers.find((c) => c.id === id);
  const customerOrders = workOrders.filter((wo) => wo.customerId === id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalSpent = customerOrders.reduce((sum, wo) => sum + wo.totalCost, 0);
  const completedOrders = customerOrders.filter(wo => wo.status === 'ส่งมอบ').length;

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">ไม่พบข้อมูลลูกค้า</p>
        <Link to="/customers" className="mt-4 text-primary hover:underline">กลับหน้ารายชื่อ</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/customers" className="rounded-md p-1.5 hover:bg-secondary transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">โปรไฟล์ลูกค้า</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/customers/${id}/edit`}>
              <Edit className="h-4 w-4 mr-2" /> แก้ไขข้อมูล
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to={`/work-orders/create?customerId=${id}`}>
              <Plus className="h-4 w-4 mr-2" /> สร้าง Work Order
            </Link>
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <CustomerAvatar name={customer.name} size="lg" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{customer.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">รหัสลูกค้า: {customer.id}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Phone className="h-4 w-4" />{customer.phone}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Mail className="h-4 w-4" />{customer.email}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-4 w-4" />สมัครเมื่อ {customer.createdAt}
              </span>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm text-muted-foreground">ยอดใช้จ่ายรวม</p>
            <p className="text-2xl font-bold text-foreground">฿{totalSpent.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{completedOrders} งานที่เสร็จสิ้น</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Vehicles */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                <Car className="h-4 w-4" /> รถยนต์ที่ผูกไว้
              </h3>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {customer.vehicles.map((v) => (
                <div key={v.id} className="rounded-md border border-border p-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-secondary px-2 py-0.5 text-sm font-semibold">{v.licensePlate}</span>
                    <span className="text-xs text-muted-foreground">{v.color}</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">{v.brand} {v.model}</p>
                  <p className="text-xs text-muted-foreground">ปี {v.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-card-foreground mb-4">สถิติการใช้บริการ</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">งานทั้งหมด</span>
                <span className="font-medium">{customerOrders.length} รายการ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">เสร็จสิ้น</span>
                <span className="font-medium text-green-600">{completedOrders} รายการ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">กำลังซ่อม</span>
                <span className="font-medium text-blue-600">
                  {customerOrders.filter(wo => ['รับรถ', 'กำลังซ่อม', 'รอชิ้นส่วน'].includes(wo.status)).length} รายการ
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ยอดเฉลี่ยต่องาน</span>
                <span className="font-medium">
                  ฿{customerOrders.length > 0 ? Math.round(totalSpent / customerOrders.length).toLocaleString() : '0'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: History Timeline */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-card-foreground">ประวัติการซ่อม</h3>
              <span className="text-xs text-muted-foreground">{customerOrders.length} รายการ</span>
            </div>
            {customerOrders.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">ยังไม่มีประวัติการซ่อม</p>
              </div>
            ) : (
              <div className="space-y-3">
                {customerOrders.map((wo) => (
                  <Link 
                    key={wo.id} 
                    to={`/work-orders/${wo.id}`}
                    className="block rounded-md border border-border p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{wo.id}</span>
                          <StatusBadge status={wo.status} />
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{wo.serviceType} — {wo.vehicleName}</p>
                        <p className="text-xs text-muted-foreground mt-1">{wo.createdAt}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">฿{wo.totalCost.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{wo.technicianName}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
