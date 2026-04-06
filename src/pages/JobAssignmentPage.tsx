import { useState } from 'react';
import { workOrders, customers } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Wrench, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  specialty: string;
  currentJobs: number;
  maxCapacity: number;
  workload: number;
}

const technicians: Technician[] = [
  { id: 'T1', name: 'ช่างสมศักดิ์', specialty: 'เครื่องยนต์/แอร์', currentJobs: 3, maxCapacity: 5, workload: 60 },
  { id: 'T2', name: 'ช่างวีระ', specialty: 'เปลี่ยนน้ำมัน/ตรวจเช็ค', currentJobs: 2, maxCapacity: 6, workload: 33 },
  { id: 'T3', name: 'ช่างอนุชา', specialty: 'ระบบเบรก/ช่วงล่าง', currentJobs: 4, maxCapacity: 4, workload: 100 },
  { id: 'T4', name: 'ช่างประสิทธิ์', specialty: 'ช่วงล่าง/โช้ค', currentJobs: 1, maxCapacity: 5, workload: 20 },
  { id: 'T5', name: 'ช่างสุรชัย', specialty: 'ระบบไฟฟ้า', currentJobs: 2, maxCapacity: 5, workload: 40 },
];

const getWorkloadColor = (workload: number) => {
  if (workload >= 90) return 'bg-red-500';
  if (workload >= 70) return 'bg-orange-500';
  if (workload >= 40) return 'bg-yellow-500';
  return 'bg-green-500';
};

const getWorkloadText = (workload: number) => {
  if (workload >= 90) return 'ไม่ว่าง';
  if (workload >= 70) return 'ยุ่ง';
  if (workload >= 40) return 'ปานกลาง';
  return 'ว่าง';
};

export default function JobAssignmentPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [draggedWO, setDraggedWO] = useState<string | null>(null);

  const unassignedOrders = workOrders.filter(wo => !wo.technicianName || wo.technicianName === '');

  const handleDragStart = (woId: string) => {
    setDraggedWO(woId);
  };

  const handleDrop = (techId: string) => {
    if (draggedWO) {
      toast.success(`จัดสรรงาน ${draggedWO} ให้ ${technicians.find(t => t.id === techId)?.name}`);
      setDraggedWO(null);
    }
  };

  const getOrdersForTech = (techName: string) => {
    return workOrders.filter(wo => wo.technicianName === techName && ['รับรถ', 'กำลังซ่อม', 'รอชิ้นส่วน'].includes(wo.status));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">จัดสรรงานช่าง</h1>
          <p className="text-sm text-muted-foreground">Job Board & Workload Management</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" /> ว่าง
          </Badge>
          <Badge variant="outline" className="bg-yellow-50">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" /> ปานกลาง
          </Badge>
          <Badge variant="outline" className="bg-orange-50">
            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2" /> ยุ่ง
          </Badge>
          <Badge variant="outline" className="bg-red-50">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2" /> ไม่ว่าง
          </Badge>
        </div>
      </div>

      {/* Technicians Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {technicians.map((tech) => (
          <Card 
            key={tech.id} 
            className={`cursor-pointer transition-all ${selectedTech === tech.id ? 'ring-2 ring-primary' : 'hover:bg-secondary/50'}`}
            onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm bg-primary text-primary-foreground">
                    {tech.name.slice(2, 4)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.specialty}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Workload</span>
                  <span className={tech.workload >= 90 ? 'text-red-600' : tech.workload >= 70 ? 'text-orange-600' : 'text-green-600'}>
                    {tech.workload}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${getWorkloadColor(tech.workload)}`} style={{ width: `${tech.workload}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {tech.currentJobs}/{tech.maxCapacity} งาน
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unassigned Jobs */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                งานรอจัดสรร ({unassignedOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {unassignedOrders.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-green-500/50" />
                  <p className="mt-2 text-sm text-muted-foreground">ไม่มีงานรอจัดสรร</p>
                </div>
              ) : (
                unassignedOrders.map((wo) => (
                  <div 
                    key={wo.id} 
                    className="rounded-lg border border-border p-3 cursor-move hover:bg-secondary/50 transition-colors"
                    draggable
                    onDragStart={() => handleDragStart(wo.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{wo.id}</span>
                      <Badge variant="outline">{wo.serviceType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{wo.customerName}</p>
                    <p className="text-xs text-muted-foreground">{wo.vehicleName}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Technician Jobs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                {selectedTech ? `งานของ${technicians.find(t => t.id === selectedTech)?.name}` : 'งานตามช่าง'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTech ? (
                <div className="space-y-3">
                  {getOrdersForTech(technicians.find(t => t.id === selectedTech)!.name).map((wo) => (
                    <div key={wo.id} className="rounded-lg border border-border p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{wo.id}</span>
                        <Badge variant={wo.status === 'กำลังซ่อม' ? 'default' : 'secondary'}>
                          {wo.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{wo.customerName} — {wo.serviceType}</p>
                      <p className="text-xs text-muted-foreground">{wo.vehicleName}</p>
                    </div>
                  ))}
                  {getOrdersForTech(technicians.find(t => t.id === selectedTech)!.name).length === 0 && (
                    <p className="text-center text-muted-foreground py-8">ไม่มีงานที่กำลังดำเนินการ</p>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {technicians.map((tech) => {
                    const techOrders = getOrdersForTech(tech.name);
                    if (techOrders.length === 0) return null;
                    return (
                      <div key={tech.id}>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{tech.name.slice(2, 4)}</AvatarFallback>
                          </Avatar>
                          {tech.name}
                          <span className="text-xs text-muted-foreground">({techOrders.length} งาน)</span>
                        </h4>
                        <div className="space-y-2">
                          {techOrders.map((wo) => (
                            <div key={wo.id} className="rounded-lg border border-border p-3">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm">{wo.id}</span>
                                <Badge variant="outline">{wo.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{wo.customerName} — {wo.serviceType}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
