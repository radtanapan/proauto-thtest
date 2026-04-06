import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, FileText, Mail, CheckCircle, XCircle, Clock } from 'lucide-react';

type QuotationStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'converted';

interface Quotation {
  id: string;
  customerName: string;
  vehicleInfo: string;
  status: QuotationStatus;
  total: number;
  createdAt: string;
  validUntil: string;
  itemCount: number;
}

// Mock data
const mockQuotations: Quotation[] = [
  { id: 'QT-20260406-001', customerName: 'สมชาย วงศ์สกุล', vehicleInfo: 'Toyota Camry (กก 1234)', status: 'approved', total: 5500, createdAt: '2026-04-01', validUntil: '2026-04-15', itemCount: 2 },
  { id: 'QT-20260405-002', customerName: 'วิชัย ศรีสุข', vehicleInfo: 'Mazda CX-5 (คค 9012)', status: 'sent', total: 10700, createdAt: '2026-04-05', validUntil: '2026-04-19', itemCount: 3 },
  { id: 'QT-20260404-003', customerName: 'สุดา แสงทอง', vehicleInfo: 'Honda Civic (ขข 5678)', status: 'draft', total: 2650, createdAt: '2026-04-04', validUntil: '2026-04-18', itemCount: 3 },
  { id: 'QT-20260403-004', customerName: 'นภา พรหมมา', vehicleInfo: 'BMW 320i (งง 3456)', status: 'converted', total: 11500, createdAt: '2026-03-28', validUntil: '2026-04-11', itemCount: 2 },
  { id: 'QT-20260402-005', customerName: 'ประเสริฐ จันทร์เพ็ญ', vehicleInfo: 'Mercedes C200 (จจ 7890)', status: 'rejected', total: 6000, createdAt: '2026-04-02', validUntil: '2026-04-16', itemCount: 2 },
  { id: 'QT-20260401-006', customerName: 'อรุณี สายลม', vehicleInfo: 'Nissan X-Trail (ฉฉ 2345)', status: 'draft', total: 2100, createdAt: '2026-04-01', validUntil: '2026-04-15', itemCount: 2 },
];

const statusConfig: Record<QuotationStatus, { label: string; color: string; icon: any }> = {
  draft: { label: 'ร่าง', color: 'bg-gray-500', icon: FileText },
  sent: { label: 'ส่งแล้ว', color: 'bg-blue-500', icon: Mail },
  approved: { label: 'อนุมัติ', color: 'bg-green-500', icon: CheckCircle },
  rejected: { label: 'ปฏิเสธ', color: 'bg-red-500', icon: XCircle },
  converted: { label: 'แปลงเป็น WO', color: 'bg-purple-500', icon: CheckCircle },
};

export default function QuotationListPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | 'all'>('all');

  const filtered = mockQuotations.filter(q => {
    const matchesSearch = q.customerName.includes(search) || q.id.includes(search) || q.vehicleInfo.includes(search);
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    all: mockQuotations.length,
    draft: mockQuotations.filter(q => q.status === 'draft').length,
    sent: mockQuotations.filter(q => q.status === 'sent').length,
    approved: mockQuotations.filter(q => q.status === 'approved').length,
    rejected: mockQuotations.filter(q => q.status === 'rejected').length,
    converted: mockQuotations.filter(q => q.status === 'converted').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">รายการใบเสนอราคา</h1>
        <Button asChild>
          <Link to="/quotations/create">
            <Plus className="h-4 w-4 mr-2" /> สร้างใบเสนอราคา
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {(['all', 'draft', 'sent', 'approved', 'rejected', 'converted'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-lg border p-3 text-left transition-colors ${
              statusFilter === status 
                ? 'border-primary bg-primary/5' 
                : 'border-border bg-card hover:bg-secondary/50'
            }`}
          >
            <p className="text-xs text-muted-foreground">
              {status === 'all' ? 'ทั้งหมด' : statusConfig[status as QuotationStatus].label}
            </p>
            <p className="text-xl font-bold">{stats[status]}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="ค้นหาเลขที่, ชื่อลูกค้า, ทะเบียน..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 rounded-lg border border-border bg-card">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">ไม่พบใบเสนอราคา</p>
          </div>
        ) : (
          filtered.map((quotation) => {
            const StatusIcon = statusConfig[quotation.status].icon;
            return (
              <Link key={quotation.id} to={`/quotations/${quotation.id}`}>
                <Card className="hover:bg-secondary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-foreground">{quotation.id}</span>
                          <Badge className={statusConfig[quotation.status].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[quotation.status].label}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm font-medium">{quotation.customerName}</p>
                        <p className="text-sm text-muted-foreground">{quotation.vehicleInfo}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            สร้าง: {quotation.createdAt}
                          </span>
                          <span>ใช้ได้จนถึง: {quotation.validUntil}</span>
                          <span>{quotation.itemCount} รายการ</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">฿{quotation.total.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">รวม VAT</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
