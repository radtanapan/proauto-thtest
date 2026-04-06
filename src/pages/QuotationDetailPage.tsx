import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Printer, Mail, CheckCircle, XCircle, FileText, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { PriceLineItem } from '@/components/PriceLineItem';

type QuotationStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'converted';

interface QuotationItem {
  id: string;
  name: string;
  type: 'part' | 'labor';
  quantity: number;
  unitPrice: number;
}

interface Quotation {
  id: string;
  customerId: string;
  customerName: string;
  vehicleInfo: string;
  status: QuotationStatus;
  items: QuotationItem[];
  notes: string;
  createdAt: string;
  validUntil: string;
  createdBy: string;
}

// Mock quotation data
const mockQuotations: Quotation[] = [
  {
    id: 'QT-20260406-001',
    customerId: 'C001',
    customerName: 'สมชาย วงศ์สกุล',
    vehicleInfo: 'Toyota Camry 2022 (กก 1234)',
    status: 'approved',
    items: [
      { id: '1', name: 'สายพานไทม์มิ่ง', type: 'part', quantity: 1, unitPrice: 3500 },
      { id: '2', name: 'ค่าแรงเปลี่ยนสายพาน', type: 'labor', quantity: 1, unitPrice: 2000 },
    ],
    notes: 'ราคารวม VAT 7%',
    createdAt: '2026-04-01',
    validUntil: '2026-04-15',
    createdBy: 'ช่างสมศักดิ์'
  },
  {
    id: 'QT-20260405-002',
    customerId: 'C003',
    customerName: 'วิชัย ศรีสุข',
    vehicleInfo: 'Mazda CX-5 2021 (คค 9012)',
    status: 'sent',
    items: [
      { id: '1', name: 'ผ้าเบรกหน้า', type: 'part', quantity: 1, unitPrice: 2800 },
      { id: '2', name: 'จานเบรกหน้า', type: 'part', quantity: 2, unitPrice: 3200 },
      { id: '3', name: 'ค่าแรงเปลี่ยนเบรก', type: 'labor', quantity: 1, unitPrice: 1500 },
    ],
    notes: '',
    createdAt: '2026-04-05',
    validUntil: '2026-04-19',
    createdBy: 'ช่างอนุชา'
  }
];

const statusConfig: Record<QuotationStatus, { label: string; color: string; icon: any }> = {
  draft: { label: 'ร่าง', color: 'bg-gray-500', icon: FileText },
  sent: { label: 'ส่งแล้ว', color: 'bg-blue-500', icon: Mail },
  approved: { label: 'อนุมัติ', color: 'bg-green-500', icon: CheckCircle },
  rejected: { label: 'ปฏิเสธ', color: 'bg-red-500', icon: XCircle },
  converted: { label: 'แปลงเป็น WO', color: 'bg-purple-500', icon: FileText },
};

export default function QuotationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [quotation, setQuotation] = useState<Quotation | undefined>(
    mockQuotations.find(q => q.id === id)
  );

  if (!quotation) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">ไม่พบใบเสนอราคา</p>
        <Link to="/quotations" className="mt-4 text-primary hover:underline">กลับหน้ารายการ</Link>
      </div>
    );
  }

  const partsTotal = quotation.items.filter(i => i.type === 'part').reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const laborTotal = quotation.items.filter(i => i.type === 'labor').reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const subtotal = partsTotal + laborTotal;
  const vat = subtotal * 0.07;
  const total = subtotal + vat;

  const statusInfo = statusConfig[quotation.status];
  const StatusIcon = statusInfo.icon;

  const updateStatus = (newStatus: QuotationStatus) => {
    setQuotation(prev => prev ? { ...prev, status: newStatus } : undefined);
    toast.success(`อัปเดตสถานะเป็น "${statusConfig[newStatus].label}"`);
  };

  const convertToWorkOrder = () => {
    toast.success('แปลงเป็น Work Order สำเร็จ');
    navigate('/work-orders');
  };

  const sendEmail = () => {
    toast.success('ส่งอีเมลใบเสนอราคาแล้ว');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to="/quotations" className="rounded-md p-1.5 hover:bg-secondary transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-foreground">{quotation.id}</h1>
              <Badge className={statusInfo.color}>
                <StatusIcon className="h-3 w-3 mr-1" /> {statusInfo.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">สร้างเมื่อ {quotation.createdAt} โดย {quotation.createdBy}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {quotation.status === 'draft' && (
            <Button variant="outline" onClick={sendEmail}>
              <Mail className="h-4 w-4 mr-2" /> ส่งอีเมล
            </Button>
          )}
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" /> พิมพ์
          </Button>
          {quotation.status === 'approved' && (
            <Button onClick={convertToWorkOrder}>
              <CheckCircle className="h-4 w-4 mr-2" /> แปลงเป็น Work Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ข้อมูลลูกค้า</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">ชื่อลูกค้า</Label>
                  <p className="font-medium">{quotation.customerName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">ข้อมูลรถ</Label>
                  <p className="font-medium">{quotation.vehicleInfo}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">รายการเสนอราคา</CardTitle>
              {quotation.status === 'draft' && (
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> เพิ่มรายการ
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quotation.items.map((item) => (
                  <PriceLineItem 
                    key={item.id} 
                    name={item.name} 
                    quantity={item.quantity} 
                    unitPrice={item.unitPrice}
                    type={item.type === 'part' ? 'อะไหล่' : 'ค่าแรง'}
                  />
                ))}
              </div>
              
              {/* Summary */}
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ค่าอะไหล่</span>
                  <span>฿{partsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ค่าแรง</span>
                  <span>฿{laborTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">รวม (ก่อน VAT)</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT 7%</span>
                  <span>฿{vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>รวมทั้งสิ้น</span>
                  <span className="text-primary">฿{total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">หมายเหตุ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{quotation.notes || 'ไม่มีหมายเหตุ'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Actions */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">จัดการสถานะ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quotation.status === 'draft' && (
                <Button className="w-full" onClick={() => updateStatus('sent')}>
                  <Mail className="h-4 w-4 mr-2" /> ส่งใบเสนอราคา
                </Button>
              )}
              {quotation.status === 'sent' && (
                <>
                  <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => updateStatus('approved')}>
                    <CheckCircle className="h-4 w-4 mr-2" /> ลูกค้าอนุมัติ
                  </Button>
                  <Button className="w-full" variant="destructive" onClick={() => updateStatus('rejected')}>
                    <XCircle className="h-4 w-4 mr-2" /> ลูกค้าปฏิเสธ
                  </Button>
                </>
              )}
              {(quotation.status === 'approved' || quotation.status === 'converted') && (
                <Button className="w-full" onClick={convertToWorkOrder}>
                  <FileText className="h-4 w-4 mr-2" /> แปลงเป็น Work Order
                </Button>
              )}
              
              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground mb-2">อื่นๆ</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-2" /> แก้ไข
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" /> ลบ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ข้อมูลอ้างอิง</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">วันที่สร้าง:</span>
                <p>{quotation.createdAt}</p>
              </div>
              <div>
                <span className="text-muted-foreground">ใช้ได้จนถึง:</span>
                <p>{quotation.validUntil}</p>
              </div>
              <div>
                <span className="text-muted-foreground">ผู้สร้าง:</span>
                <p>{quotation.createdBy}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
