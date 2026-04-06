import { useState } from 'react';
import { customers, workOrders, serviceTypeDistribution } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { 
  TrendingUp, Users, Wrench, DollarSign, Clock, FileText, 
  Download, Calendar, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

// Top customers data
const topCustomers = customers.map(c => {
  const customerWOs = workOrders.filter(wo => wo.customerId === c.id && wo.status === 'ส่งมอบ');
  const totalSpent = customerWOs.reduce((sum, wo) => sum + wo.totalCost, 0);
  return { name: c.name, visits: customerWOs.length, spent: totalSpent };
}).sort((a, b) => b.spent - a.spent).slice(0, 10);

// Top services data
const serviceStats = serviceTypeDistribution.map(s => ({
  name: s.name,
  count: Math.round(s.value * 1.5),
  revenue: Math.round(s.value * 15000)
})).sort((a, b) => b.revenue - a.revenue);

// Technician performance
const technicianPerf = [
  { name: 'ช่างสมศักดิ์', jobs: 45, revenue: 285000, avgTime: 2.3 },
  { name: 'ช่างวีระ', jobs: 52, revenue: 198000, avgTime: 1.5 },
  { name: 'ช่างอนุชา', jobs: 38, revenue: 312000, avgTime: 2.8 },
  { name: 'ช่างประสิทธิ์', jobs: 41, revenue: 245000, avgTime: 2.1 },
  { name: 'ช่างสุรชัย', jobs: 35, revenue: 198000, avgTime: 2.5 },
];

// Aging work orders
const agingData = [
  { range: '1-3 วัน', count: 12, value: 85000 },
  { range: '4-7 วัน', count: 8, value: 125000 },
  { range: '8-14 วัน', count: 5, value: 98000 },
  { range: '15+ วัน', count: 3, value: 65000 },
];

// QT Conversion
const conversionData = [
  { month: 'ม.ค.', sent: 45, approved: 38, rate: 84 },
  { month: 'ก.พ.', sent: 52, approved: 44, rate: 85 },
  { month: 'มี.ค.', sent: 48, approved: 41, rate: 85 },
  { month: 'เม.ย.', sent: 38, approved: 32, rate: 84 },
];

const COLORS = ['hsl(211, 66%, 32%)', 'hsl(38, 92%, 50%)', 'hsl(160, 60%, 40%)', 'hsl(25, 95%, 53%)', 'hsl(280, 60%, 50%)'];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">รายงานเชิงลึก</h1>
          <p className="text-sm text-muted-foreground">Analytics & Business Intelligence</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">สัปดาห์นี้</SelectItem>
              <SelectItem value="month">เดือนนี้</SelectItem>
              <SelectItem value="quarter">ไตรมาสนี้</SelectItem>
              <SelectItem value="year">ปีนี้</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">รายได้รวม</p>
                <p className="text-2xl font-bold">฿1.24M</p>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5%
                </div>
              </div>
              <div className="rounded-full bg-green-100 p-2">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">งานเสร็จสิ้น</p>
                <p className="text-2xl font-bold">211</p>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +8.2%
                </div>
              </div>
              <div className="rounded-full bg-blue-100 p-2">
                <Wrench className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">ลูกค้าใหม่</p>
                <p className="text-2xl font-bold">28</p>
                <div className="flex items-center text-xs text-red-600">
                  <ArrowDownRight className="h-3 w-3 mr-1" /> -5.1%
                </div>
              </div>
              <div className="rounded-full bg-orange-100 p-2">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">QT Conversion</p>
                <p className="text-2xl font-bold">84.5%</p>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +2.3%
                </div>
              </div>
              <div className="rounded-full bg-purple-100 p-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 lg:w-auto">
          <TabsTrigger value="customers">Top ลูกค้า</TabsTrigger>
          <TabsTrigger value="services">Top บริการ</TabsTrigger>
          <TabsTrigger value="technicians">ประสิทธิภาพช่าง</TabsTrigger>
          <TabsTrigger value="aging">Aging งานค้าง</TabsTrigger>
          <TabsTrigger value="conversion">QT Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top 10 ลูกค้า (ตามมูลค่า)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCustomers} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={(v) => `฿${(v/1000).toFixed(0)}k`} />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value: number) => [`฿${value.toLocaleString()}`, 'ใช้จ่าย']} />
                    <Bar dataKey="spent" fill="hsl(211, 66%, 32%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
                {topCustomers.slice(0, 5).map((c, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xs text-muted-foreground truncate">{c.name}</p>
                    <p className="font-semibold">{c.visits} ครั้ง</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">สัดส่วนรายได้ตามบริการ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={serviceStats} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="revenue">
                        {serviceStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value: number) => [`฿${value.toLocaleString()}`, 'รายได้']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top 5 บริการ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceStats.slice(0, 5).map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-muted-foreground">#{i + 1}</span>
                        <span>{s.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">฿{s.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{s.count} งาน</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technicians" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ประสิทธิภาพช่าง</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={technicianPerf}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" tickFormatter={(v) => `฿${(v/1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" name="รายได้" fill="hsl(211, 66%, 32%)" />
                    <Bar yAxisId="right" dataKey="jobs" name="จำนวนงาน" fill="hsl(38, 92%, 50%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs text-muted-foreground">
                      <th className="py-2">ช่าง</th>
                      <th className="py-2 text-right">งาน</th>
                      <th className="py-2 text-right">รายได้</th>
                      <th className="py-2 text-right">เวลาเฉลี่ย (วัน)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicianPerf.map((t) => (
                      <tr key={t.name} className="border-b last:border-0">
                        <td className="py-2">{t.name}</td>
                        <td className="py-2 text-right">{t.jobs}</td>
                        <td className="py-2 text-right">฿{t.revenue.toLocaleString()}</td>
                        <td className="py-2 text-right">{t.avgTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aging งานค้าง (Work Order ที่ยังไม่เสร็จ)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `฿${(v/1000).toFixed(0)}k`} />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="count" name="จำนวนงาน" fill="hsl(211, 66%, 32%)" />
                      <Bar yAxisId="right" dataKey="value" name="มูลค่า" fill="hsl(25, 95%, 53%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {agingData.map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium">{a.range}</p>
                        <p className="text-xs text-muted-foreground">{a.count} งาน</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-600">฿{a.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">มูลค่างานค้าง</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <div className="flex justify-between font-bold">
                      <span>รวม</span>
                      <span className="text-red-600">฿{agingData.reduce((s, a) => s + a.value, 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quotation Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sent" name="ส่ง QT" fill="hsl(211, 66%, 32%)" />
                    <Bar yAxisId="left" dataKey="approved" name="อนุมัติ" fill="hsl(160, 60%, 40%)" />
                    <Line yAxisId="right" type="monotone" dataKey="rate" name="Conversion %" stroke="hsl(25, 95%, 53%)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
