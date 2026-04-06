import { KPICard } from '@/components/KPICard';
import { StatusBadge } from '@/components/StatusBadge';
import { DollarSign, TrendingUp as TrendingUpIcon, Car, CheckCircle } from 'lucide-react';
import { workOrders, dailySales, serviceTypeDistribution } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function DashboardPage() {
  const todaySales = 45200;
  const monthSales = 892400;
  const repairing = workOrders.filter(w => ['รับรถ', 'กำลังซ่อม', 'รอชิ้นส่วน'].includes(w.status)).length;
  const delivered = workOrders.filter(w => w.status === 'ส่งมอบ').length;
  const recentOrders = workOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard icon={DollarSign} label="ยอดขายวันนี้" value={`฿${todaySales.toLocaleString()}`} change={12.5} />
        <KPICard icon={TrendingUpIcon} label="ยอดขายเดือนนี้" value={`฿${monthSales.toLocaleString()}`} change={8.2} changeLabel="จากเดือนที่แล้ว" />
        <KPICard icon={Car} label="รถกำลังซ่อม" value={String(repairing)} change={-5} changeLabel="จากสัปดาห์ที่แล้ว" />
        <KPICard icon={CheckCircle} label="รถส่งมอบแล้ว" value={String(delivered)} change={15} changeLabel="จากเดือนที่แล้ว" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <div className="col-span-1 rounded-lg border border-border bg-card p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-card-foreground">ยอดขาย 30 วันย้อนหลัง</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} stroke="hsl(215, 10%, 52%)" />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} stroke="hsl(215, 10%, 52%)" />
              <Tooltip formatter={(value: number) => [`฿${value.toLocaleString()}`, 'ยอดขาย']} />
              <Line type="monotone" dataKey="amount" stroke="hsl(211, 66%, 32%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="mb-4 text-base font-semibold text-card-foreground">ประเภทบริการ</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={serviceTypeDistribution} cx="50%" cy="45%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                {serviceTypeDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'สัดส่วน']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Work Orders */}
      <div className="rounded-lg border border-border bg-card">
        <div className="border-b border-border p-5">
          <h2 className="text-base font-semibold text-card-foreground">งานซ่อมล่าสุด</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">เลขที่</th>
                <th className="px-5 py-3 font-medium">ทะเบียน</th>
                <th className="px-5 py-3 font-medium">ลูกค้า</th>
                <th className="px-5 py-3 font-medium">ประเภท</th>
                <th className="px-5 py-3 font-medium">สถานะ</th>
                <th className="px-5 py-3 font-medium text-right">ราคา</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{order.id}</td>
                  <td className="px-5 py-3">
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium">{order.licensePlate}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{order.customerName}</td>
                  <td className="px-5 py-3 text-muted-foreground">{order.serviceType}</td>
                  <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-3 text-right text-foreground">฿{order.totalCost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
