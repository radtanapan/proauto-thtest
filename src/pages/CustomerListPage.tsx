import { useState } from 'react';
import { customers } from '@/data/mockData';
import { CustomerAvatar } from '@/components/CustomerAvatar';
import { workOrders } from '@/data/mockData';
import { TimelineItem } from '@/components/TimelineItem';
import { StatusBadge } from '@/components/StatusBadge';
import { Search, Phone, Mail, Car, ArrowLeft } from 'lucide-react';

export default function CustomerListPage() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = customers.filter(
    (c) => c.name.includes(search) || c.phone.includes(search) || c.vehicles.some((v) => v.licensePlate.includes(search))
  );

  const selectedCustomer = selectedId ? customers.find((c) => c.id === selectedId) : null;
  const customerOrders = selectedId ? workOrders.filter((wo) => wo.customerId === selectedId) : [];

  if (selectedCustomer) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> กลับหน้ารายชื่อ
        </button>

        {/* Profile Card */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <CustomerAvatar name={selectedCustomer.name} size="lg" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">{selectedCustomer.name}</h2>
              <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{selectedCustomer.phone}</span>
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{selectedCustomer.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-card-foreground flex items-center gap-2"><Car className="h-4 w-4" /> รถที่ผูกไว้</h3>
          <div className="space-y-2">
            {selectedCustomer.vehicles.map((v) => (
              <div key={v.id} className="flex items-center gap-3 rounded-md border border-border p-3">
                <span className="rounded bg-secondary px-2 py-0.5 text-sm font-semibold">{v.licensePlate}</span>
                <span className="text-sm text-foreground">{v.brand} {v.model} {v.year}</span>
                <span className="text-xs text-muted-foreground">({v.color})</span>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">ประวัติซ่อม</h3>
          {customerOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">ยังไม่มีประวัติ</p>
          ) : (
            <div className="space-y-3">
              {customerOrders.map((wo) => (
                <div key={wo.id} className="flex items-center justify-between rounded-md border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{wo.id} — {wo.serviceType}</p>
                    <p className="text-xs text-muted-foreground">{wo.createdAt} • {wo.vehicleName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={wo.status} />
                    <span className="text-sm font-medium text-foreground">฿{wo.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">ลูกค้า / CRM</h1>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="ค้นหาชื่อ, เบอร์โทร, ทะเบียนรถ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-5 py-3 font-medium">ลูกค้า</th>
              <th className="px-5 py-3 font-medium">เบอร์โทร</th>
              <th className="px-5 py-3 font-medium">ทะเบียนรถ</th>
              <th className="px-5 py-3 font-medium">ยี่ห้อ/รุ่น</th>
              <th className="px-5 py-3 font-medium">สมัครเมื่อ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <CustomerAvatar name={c.name} size="sm" />
                    <span className="font-medium text-foreground">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{c.phone}</td>
                <td className="px-5 py-3">
                  {c.vehicles.map((v) => (
                    <span key={v.id} className="rounded bg-secondary px-2 py-0.5 text-xs font-medium">{v.licensePlate}</span>
                  ))}
                </td>
                <td className="px-5 py-3 text-muted-foreground">{c.vehicles.map((v) => `${v.brand} ${v.model}`).join(', ')}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
