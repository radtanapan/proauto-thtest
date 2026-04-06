import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileSpreadsheet, FileText, Search, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface CommissionRecord {
  id: string;
  personId: string;
  name: string;
  role: string;
  month: string;
  baseCommission: number;
  bonus: number;
  deduction: number;
  total: number;
  workOrders: number;
  details: string[];
}

const mockRecords: CommissionRecord[] = [
  { id: '1', personId: 'E001', name: 'สมศักดิ์ ใจดี', role: 'ช่างซ่อม', month: '2026-04', baseCommission: 28500, bonus: 1500, deduction: 0, total: 30000, workOrders: 45, details: ['ซ่อมเครื่อง: 15 งาน', 'เบรก: 12 งาน', 'ช่วงล่าง: 8 งาน'] },
  { id: '2', personId: 'E002', name: 'วีระ พงษ์พิพัฒน์', role: 'ช่างซ่อม', month: '2026-04', baseCommission: 19800, bonus: 800, deduction: 0, total: 20600, workOrders: 52, details: ['เปลี่ยนน้ำมัน: 35 งาน', 'ตรวจเช็ค: 17 งาน'] },
  { id: '3', personId: 'E003', name: 'อนุชา รัตนากร', role: 'ช่างซ่อม', month: '2026-04', baseCommission: 31200, bonus: 2000, deduction: 500, total: 32700, workOrders: 38, details: ['เบรก: 18 งาน', 'ช่วงล่าง: 15 งาน', 'งานด่วน: 5 งาน'] },
  { id: '4', personId: 'E004', name: 'ประสิทธิ์ วงศ์ใหญ่', role: 'ช่างซ่อม', month: '2026-04', baseCommission: 24500, bonus: 1000, deduction: 0, total: 25500, workOrders: 41, details: ['ช่วงล่าง: 22 งาน', 'โช้ค: 12 งาน', 'อื่นๆ: 7 งาน'] },
  { id: '5', personId: 'E005', name: 'สุรชัย มีชัย', role: 'ช่างซ่อม', month: '2026-04', baseCommission: 19800, bonus: 0, deduction: 0, total: 19800, workOrders: 35, details: ['ไฟฟ้า: 25 งาน', 'แอร์: 10 งาน'] },
  { id: '6', personId: 'E006', name: 'นภา สายสมร', role: 'ที่ปรึกษาลูกค้า', month: '2026-04', baseCommission: 15000, bonus: 500, deduction: 0, total: 15500, workOrders: 28, details: ['ขายบริการใหม่: 12 ราย', 'Upsell: 16 ราย'] },
];

const months = ['2026-04', '2026-03', '2026-02', '2026-01', '2025-12', '2025-11'];

export default function CommissionReportPage() {
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('2026-04');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = mockRecords.filter(r => {
    const matchesSearch = r.name.includes(search) || r.personId.includes(search);
    const matchesPeriod = r.month === period;
    const matchesRole = roleFilter === 'all' || r.role === roleFilter;
    return matchesSearch && matchesPeriod && matchesRole;
  });

  const totalCommission = filtered.reduce((sum, r) => sum + r.total, 0);
  const totalBonus = filtered.reduce((sum, r) => sum + r.bonus, 0);
  const totalWorkOrders = filtered.reduce((sum, r) => sum + r.workOrders, 0);

  const exportExcel = () => {
    toast.success('Export รายงาน Commission เป็น Excel แล้ว');
  };

  const exportPDF = () => {
    toast.success('Export รายงาน Commission เป็น PDF แล้ว');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">รายงาน Commission</h1>
          <p className="text-sm text-muted-foreground">รายงานค่าคอมมิชชั่นรายบุคคล รายเดือน/ไตรมาส</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" /> Excel
          </Button>
          <Button variant="outline" onClick={exportPDF}>
            <FileText className="h-4 w-4 mr-2" /> PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อพนักงาน..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[150px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="ตำแหน่ง" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="ช่างซ่อม">ช่างซ่อม</SelectItem>
                <SelectItem value="ที่ปรึกษาลูกค้า">ที่ปรึกษาลูกค้า</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">ค่าคอมมิชชั่นรวม</p>
            <p className="text-2xl font-bold">฿{totalCommission.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Bonus รวม</p>
            <p className="text-2xl font-bold text-green-600">฿{totalBonus.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">จำนวนงาน</p>
            <p className="text-2xl font-bold">{totalWorkOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">เฉลี่ยต่อคน</p>
            <p className="text-2xl font-bold">฿{filtered.length > 0 ? Math.round(totalCommission / filtered.length).toLocaleString() : '0'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">รายละเอียด Commission รายบุคคล</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>พนักงาน</TableHead>
                  <TableHead>ตำแหน่ง</TableHead>
                  <TableHead className="text-right">Base</TableHead>
                  <TableHead className="text-right">Bonus</TableHead>
                  <TableHead className="text-right">หัก</TableHead>
                  <TableHead className="text-right">รวม</TableHead>
                  <TableHead className="text-center">งาน</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {record.name.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{record.name}</p>
                          <p className="text-xs text-muted-foreground">{record.personId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.role}</Badge>
                    </TableCell>
                    <TableCell className="text-right">฿{record.baseCommission.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">+฿{record.bonus.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600">-฿{record.deduction.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">฿{record.total.toLocaleString()}</TableCell>
                    <TableCell className="text-center">{record.workOrders}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      ไม่พบข้อมูล
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.slice(0, 4).map((record) => (
          <Card key={record.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                    {record.name.slice(0, 2)}
                  </div>
                  <div>
                    <CardTitle className="text-sm">{record.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{record.role}</p>
                  </div>
                </div>
                <p className="text-lg font-bold">฿{record.total.toLocaleString()}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                {record.details.map((d, i) => (
                  <p key={i} className="text-muted-foreground">• {d}</p>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t flex justify-between text-sm">
                <span className="text-muted-foreground">Base: ฿{record.baseCommission.toLocaleString()}</span>
                <span className="text-green-600">Bonus: +฿{record.bonus.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
