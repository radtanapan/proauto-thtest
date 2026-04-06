import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { customers, workOrders } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar, Clock, AlertCircle, Car, User, Wrench } from 'lucide-react';
import { toast } from 'sonner';

const technicianNames = ['ช่างสมศักดิ์', 'ช่างวีระ', 'ช่างอนุชา', 'ช่างประสิทธิ์', 'ช่างสุรชัย'];
const serviceTypes = ['ซ่อมเครื่องยนต์', 'เปลี่ยนน้ำมันเครื่อง', 'ซ่อมระบบเบรก', 'ซ่อมช่วงล่าง', 'ซ่อมระบบไฟฟ้า', 'ซ่อมแอร์', 'ตรวจเช็คระยะ'];
const urgencyLevels = [
  { value: 'normal', label: 'ปกติ', color: 'text-blue-600' },
  { value: 'urgent', label: 'เร่งด่วน', color: 'text-orange-600' },
  { value: 'critical', label: 'ด่วนที่สุด', color: 'text-red-600' }
];

export default function WorkOrderCreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedCustomerId = searchParams.get('customerId');
  
  const preselectedCustomer = preselectedCustomerId 
    ? customers.find(c => c.id === preselectedCustomerId) 
    : null;

  const generateWONumber = () => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `WO-${dateStr}-${randomNum}`;
  };

  const [formData, setFormData] = useState({
    woNumber: generateWONumber(),
    customerId: preselectedCustomer?.id || '',
    vehicleId: '',
    serviceType: '',
    technicianName: '',
    urgency: 'normal',
    description: '',
    estimatedCompletion: '',
    notes: ''
  });

  const selectedCustomer = customers.find(c => c.id === formData.customerId);
  const availableVehicles = selectedCustomer?.vehicles || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerId || !formData.vehicleId || !formData.serviceType) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // Simulate API call
    toast.success(`สร้าง Work Order ${formData.woNumber} สำเร็จ`);
    navigate('/work-orders');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/work-orders" className="rounded-md p-1.5 hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">สร้าง Work Order ใหม่</h1>
          <p className="text-sm text-muted-foreground">เลขที่: {formData.woNumber}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer & Vehicle */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" /> ข้อมูลลูกค้าและรถ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>ลูกค้า *</Label>
                  <Select 
                    value={formData.customerId} 
                    onValueChange={(value) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        customerId: value, 
                        vehicleId: '' 
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกลูกค้า" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name} ({c.phone})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCustomer && (
                  <div className="rounded-md bg-secondary/50 p-3 text-sm">
                    <p className="font-medium">{selectedCustomer.name}</p>
                    <p className="text-muted-foreground">{selectedCustomer.phone} • {selectedCustomer.email}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>รถยนต์ *</Label>
                  <Select 
                    value={formData.vehicleId} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleId: value }))}
                    disabled={!selectedCustomer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedCustomer ? "เลือกรถ" : "กรุณาเลือกลูกค้าก่อน"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVehicles.map(v => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.licensePlate} - {v.brand} {v.model} {v.year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="h-4 w-4" /> รายละเอียดงาน
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>ประเภทบริการ *</Label>
                    <Select 
                      value={formData.serviceType} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทบริการ" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>ช่างผู้รับผิดชอบ</Label>
                    <Select 
                      value={formData.technicianName} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, technicianName: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกช่าง (ถ้ามี)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">ยังไม่ระบุ</SelectItem>
                        {technicianNames.map(name => (
                          <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>อาการ/สาเหตุที่แจ้ง *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="อธิบายอาการหรือสาเหตุที่ลูกค้าแจ้ง..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>หมายเหตุเพิ่มเติม</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="บันทึกเพิ่มเติม..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Priority & Schedule */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" /> ระดับความเร่งด่วน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {urgencyLevels.map(level => (
                    <label 
                      key={level.value} 
                      className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                        formData.urgency === level.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:bg-secondary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={formData.urgency === level.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                        className="sr-only"
                      />
                      <div className={`w-3 h-3 rounded-full ${
                        level.value === 'normal' ? 'bg-blue-500' :
                        level.value === 'urgent' ? 'bg-orange-500' : 'bg-red-500'
                      }`} />
                      <span className={`text-sm font-medium ${level.color}`}>{level.label}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> กำหนดการ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>วันที่คาดว่าเสร็จ</Label>
                  <Input
                    type="date"
                    value={formData.estimatedCompletion}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedCompletion: e.target.value }))}
                  />
                </div>
                <div className="rounded-md bg-secondary/50 p-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>สร้างเมื่อ: {new Date().toLocaleDateString('th-TH')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button type="submit" className="w-full">
                สร้าง Work Order
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate('/work-orders')}>
                ยกเลิก
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
