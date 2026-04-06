import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { workOrders } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Camera, CheckCircle, AlertTriangle, XCircle, Save, FileText } from 'lucide-react';
import { toast } from 'sonner';

type InspectionStatus = 'pass' | 'recommend' | 'urgent' | null;

interface InspectionItem {
  id: string;
  name: string;
  status: InspectionStatus;
  notes: string;
  photos: string[];
}

interface InspectionCategory {
  id: string;
  name: string;
  icon: string;
  items: InspectionItem[];
}

const defaultCategories: InspectionCategory[] = [
  {
    id: 'engine',
    name: 'เครื่องยนต์',
    icon: '🔧',
    items: [
      { id: 'e1', name: 'ระดับน้ำมันเครื่อง', status: null, notes: '', photos: [] },
      { id: 'e2', name: 'สายพานหน้าเครื่อง', status: null, notes: '', photos: [] },
      { id: 'e3', name: 'หม้อน้ำ/น้ำหล่อเย็น', status: null, notes: '', photos: [] },
      { id: 'e4', name: 'แบตเตอรี่', status: null, notes: '', photos: [] },
      { id: 'e5', name: 'ระบบสตาร์ท', status: null, notes: '', photos: [] },
    ]
  },
  {
    id: 'brake',
    name: 'ระบบเบรก',
    icon: '🛑',
    items: [
      { id: 'b1', name: 'ผ้าเบรกหน้า', status: null, notes: '', photos: [] },
      { id: 'b2', name: 'ผ้าเบรกหลัง', status: null, notes: '', photos: [] },
      { id: 'b3', name: 'จานเบรก', status: null, notes: '', photos: [] },
      { id: 'b4', name: 'น้ำมันเบรก', status: null, notes: '', photos: [] },
      { id: 'b5', name: 'ระบบ ABS', status: null, notes: '', photos: [] },
    ]
  },
  {
    id: 'suspension',
    name: 'ช่วงล่าง',
    icon: '⚙️',
    items: [
      { id: 's1', name: 'โช้คอัพหน้า', status: null, notes: '', photos: [] },
      { id: 's2', name: 'โช้คอัพหลัง', status: null, notes: '', photos: [] },
      { id: 's3', name: 'ลูกหมาก', status: null, notes: '', photos: [] },
      { id: 's4', name: 'ยางแท่นเครื่อง', status: null, notes: '', photos: [] },
      { id: 's5', name: 'ระบบพวงมาลัย', status: null, notes: '', photos: [] },
    ]
  },
  {
    id: 'electrical',
    name: 'ระบบไฟฟ้า',
    icon: '⚡',
    items: [
      { id: 'el1', name: 'ไฟหน้า', status: null, notes: '', photos: [] },
      { id: 'el2', name: 'ไฟท้าย', status: null, notes: '', photos: [] },
      { id: 'el3', name: 'ไฟเลี้ยว', status: null, notes: '', photos: [] },
      { id: 'el4', name: 'ไฟเบรก', status: null, notes: '', photos: [] },
      { id: 'el5', name: 'ระบบแอร์', status: null, notes: '', photos: [] },
    ]
  },
  {
    id: 'body',
    name: 'ตัวถัง',
    icon: '🚗',
    items: [
      { id: 'bd1', name: 'สภาพสี/รอยขีดข่วน', status: null, notes: '', photos: [] },
      { id: 'bd2', name: 'กระจกรอบคัน', status: null, notes: '', photos: [] },
      { id: 'bd3', name: 'กระจกมองข้าง', status: null, notes: '', photos: [] },
      { id: 'bd4', name: 'ประตู/ฝากระโปรง', status: null, notes: '', photos: [] },
      { id: 'bd5', name: 'ที่ปัดน้ำฝน', status: null, notes: '', photos: [] },
    ]
  },
  {
    id: 'tires',
    name: 'ยางและล้อ',
    icon: '🛞',
    items: [
      { id: 't1', name: 'ดอกยางหน้า', status: null, notes: '', photos: [] },
      { id: 't2', name: 'ดอกยางหลัง', status: null, notes: '', photos: [] },
      { id: 't3', name: 'แรงดันลมยาง', status: null, notes: '', photos: [] },
      { id: 't4', name: 'สภาพล้อแม็กซ์', status: null, notes: '', photos: [] },
      { id: 't5', name: 'น็อตล้อ', status: null, notes: '', photos: [] },
    ]
  },
];

export default function InspectionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workOrder = workOrders.find((wo) => wo.id === id);
  
  const [categories, setCategories] = useState<InspectionCategory[]>(defaultCategories);
  const [generalNotes, setGeneralNotes] = useState('');

  if (!workOrder) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-muted-foreground">ไม่พบ Work Order</p>
        <Link to="/work-orders" className="mt-4 text-primary hover:underline">กลับหน้ารายการ</Link>
      </div>
    );
  }

  const updateItemStatus = (categoryId: string, itemId: string, status: InspectionStatus) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => 
          item.id === itemId ? { ...item, status } : item
        )
      };
    }));
  };

  const updateItemNotes = (categoryId: string, itemId: string, notes: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => 
          item.id === itemId ? { ...item, notes } : item
        )
      };
    }));
  };

  const getStatusBadge = (status: InspectionStatus) => {
    switch (status) {
      case 'pass':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> ปกติ</Badge>;
      case 'recommend':
        return <Badge variant="default" className="bg-yellow-500"><AlertTriangle className="h-3 w-3 mr-1" /> แนะนำ</Badge>;
      case 'urgent':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> ด่วน</Badge>;
      default:
        return <Badge variant="outline">ยังไม่ตรวจ</Badge>;
    }
  };

  const getCompletionStats = () => {
    const allItems = categories.flatMap(c => c.items);
    const checked = allItems.filter(i => i.status !== null).length;
    const urgent = allItems.filter(i => i.status === 'urgent').length;
    const recommend = allItems.filter(i => i.status === 'recommend').length;
    return { total: allItems.length, checked, urgent, recommend };
  };

  const stats = getCompletionStats();

  const handleSave = () => {
    toast.success('บันทึกผลตรวจสอบสำเร็จ');
    navigate(`/work-orders/${id}`);
  };

  const handleCreateQuotation = () => {
    toast.success('สร้างใบเสนอราคาจากผลตรวจสอบ');
    navigate(`/quotation/create?fromInspection=${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/work-orders/${id}`} className="rounded-md p-1.5 hover:bg-secondary transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">ตรวจสอบสภาพรถ</h1>
            <p className="text-sm text-muted-foreground">{workOrder.id} — {workOrder.vehicleName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCreateQuotation}>
            <FileText className="h-4 w-4 mr-2" /> สร้างใบเสนอราคา
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> บันทึก
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">ตรวจแล้ว</p>
          <p className="text-2xl font-bold">{stats.checked}/{stats.total}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">ปกติ</p>
          <p className="text-2xl font-bold text-green-600">
            {categories.flatMap(c => c.items).filter(i => i.status === 'pass').length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">แนะนำซ่อม</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.recommend}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">ต้องซ่อมด่วน</p>
          <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
        </div>
      </div>

      {/* Inspection Categories */}
      <div className="space-y-6">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-xl">{category.icon}</span> {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.id} className="rounded-lg border border-border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.name}</span>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    {/* Status Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant={item.status === 'pass' ? 'default' : 'outline'}
                        className={item.status === 'pass' ? 'bg-green-500 hover:bg-green-600' : ''}
                        onClick={() => updateItemStatus(category.id, item.id, 'pass')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> ปกติ
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={item.status === 'recommend' ? 'default' : 'outline'}
                        className={item.status === 'recommend' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}
                        onClick={() => updateItemStatus(category.id, item.id, 'recommend')}
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" /> แนะนำ
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={item.status === 'urgent' ? 'default' : 'outline'}
                        className={item.status === 'urgent' ? 'bg-red-500 hover:bg-red-600' : ''}
                        onClick={() => updateItemStatus(category.id, item.id, 'urgent')}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> ด่วน
                      </Button>
                    </div>

                    {/* Notes */}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="บันทึกเพิ่มเติม..."
                        value={item.notes}
                        onChange={(e) => updateItemNotes(category.id, item.id, e.target.value)}
                        className="min-h-[60px] text-sm"
                      />
                      <Button type="button" variant="outline" size="icon" className="shrink-0">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* General Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">บันทึกทั่วไป</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="บันทึกข้อมูลเพิ่มเติมเกี่ยวกับการตรวจสอบ..."
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
}
