import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, TrendingUp, Users, Calendar, ArrowUpRight, 
  ArrowDownRight, Download, Wallet, Target 
} from 'lucide-react';

interface CommissionData {
  personId: string;
  name: string;
  role: string;
  thisMonth: number;
  lastMonth: number;
  ytd: number;
  target: number;
  jobs: number;
}

const commissionData: CommissionData[] = [
  { personId: 'E001', name: 'สมศักดิ์ ใจดี', role: 'ช่างซ่อม', thisMonth: 28500, lastMonth: 26200, ytd: 156000, target: 300000, jobs: 45 },
  { personId: 'E002', name: 'วีระ พงษ์พิพัฒน์', role: 'ช่างซ่อม', thisMonth: 19800, lastMonth: 21500, ytd: 128000, target: 250000, jobs: 52 },
  { personId: 'E003', name: 'อนุชา รัตนากร', role: 'ช่างซ่อม', thisMonth: 31200, lastMonth: 28900, ytd: 175000, target: 350000, jobs: 38 },
  { personId: 'E004', name: 'ประสิทธิ์ วงศ์ใหญ่', role: 'ช่างซ่อม', thisMonth: 24500, lastMonth: 22800, ytd: 142000, target: 280000, jobs: 41 },
  { personId: 'E005', name: 'สุรชัย มีชัย', role: 'ช่างซ่อม', thisMonth: 19800, lastMonth: 17500, ytd: 108000, target: 220000, jobs: 35 },
  { personId: 'E006', name: 'นภา สายสมร', role: 'ที่ปรึกษาลูกค้า', thisMonth: 15000, lastMonth: 18000, ytd: 95000, target: 200000, jobs: 28 },
];

export default function CommissionPage() {
  const [period, setPeriod] = useState('thisMonth');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredData = commissionData.filter(d => selectedRole === 'all' || d.role === selectedRole);
  
  const totalCommission = filteredData.reduce((sum, d) => sum + d.thisMonth, 0);
  const totalYTD = filteredData.reduce((sum, d) => sum + d.ytd, 0);
  const avgGrowth = filteredData.reduce((sum, d) => sum + ((d.thisMonth - d.lastMonth) / d.lastMonth * 100), 0) / filteredData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Commission Overview</h1>
          <p className="text-sm text-muted-foreground">สรุปค่าคอมมิชชั่นรายบุคคล</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">เดือนนี้</SelectItem>
              <SelectItem value="lastMonth">เดือนที่แล้ว</SelectItem>
              <SelectItem value="quarter">ไตรมาสนี้</SelectItem>
              <SelectItem value="year">ปีนี้</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">ค่าคอมมิชชั่นรวม (เดือนนี้)</p>
                <p className="text-2xl font-bold">฿{totalCommission.toLocaleString()}</p>
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
                <p className="text-xs text-muted-foreground">YTD สะสม</p>
                <p className="text-2xl font-bold">฿{totalYTD.toLocaleString()}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-2">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">เติบโตจากเดือนที่แล้ว</p>
                <p className="text-2xl font-bold">{avgGrowth > 0 ? '+' : ''}{avgGrowth.toFixed(1)}%</p>
                <div className={`flex items-center text-xs ${avgGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {avgGrowth >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {avgGrowth >= 0 ? 'เพิ่มขึ้น' : 'ลดลง'}
                </div>
              </div>
              <div className="rounded-full bg-orange-100 p-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">จำนวนพนักงาน</p>
                <p className="text-2xl font-bold">{filteredData.length}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-2">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Button 
          variant={selectedRole === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedRole('all')}
        >
          ทั้งหมด
        </Button>
        <Button 
          variant={selectedRole === 'ช่างซ่อม' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedRole('ช่างซ่อม')}
        >
          ช่างซ่อม
        </Button>
        <Button 
          variant={selectedRole === 'ที่ปรึกษาลูกค้า' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setSelectedRole('ที่ปรึกษาลูกค้า')}
        >
          ที่ปรึกษาลูกค้า
        </Button>
      </div>

      {/* Commission Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">รายละเอียดค่าคอมมิชชั่น</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">พนักงาน</th>
                  <th className="px-4 py-3 font-medium">ตำแหน่ง</th>
                  <th className="px-4 py-3 font-medium text-right">เดือนนี้</th>
                  <th className="px-4 py-3 font-medium text-right">เดือนที่แล้ว</th>
                  <th className="px-4 py-3 font-medium text-right">เปลี่ยนแปลง</th>
                  <th className="px-4 py-3 font-medium text-right">YTD</th>
                  <th className="px-4 py-3 font-medium text-right">เป้าหมาย</th>
                  <th className="px-4 py-3 font-medium text-center">ความคืบหน้า</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((person) => {
                  const change = ((person.thisMonth - person.lastMonth) / person.lastMonth * 100);
                  const progress = (person.ytd / person.target * 100);
                  return (
                    <tr key={person.personId} className="border-b border-border last:border-0 hover:bg-secondary/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            {person.name.slice(0, 2)}
                          </div>
                          <span className="font-medium">{person.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{person.role}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">฿{person.thisMonth.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">฿{person.lastMonth.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">฿{person.ytd.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">฿{person.target.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${progress >= 100 ? 'bg-green-500' : progress >= 75 ? 'bg-blue-500' : progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                              style={{ width: `${Math.min(progress, 100)}%` }} 
                            />
                          </div>
                          <span className="text-xs w-10 text-right">{progress.toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Individual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.slice(0, 6).map((person) => (
          <Card key={person.personId}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium">
                  {person.name.slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.role} • {person.jobs} งาน</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">เดือนนี้</p>
                  <p className="text-lg font-bold">฿{person.thisMonth.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">เดือนที่แล้ว</p>
                  <p className="text-lg font-medium text-muted-foreground">฿{person.lastMonth.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">เป้าหมายปีนี้</span>
                  <span>{(person.ytd / person.target * 100).toFixed(0)}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-primary" 
                    style={{ width: `${Math.min((person.ytd / person.target * 100), 100)}%` }} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
