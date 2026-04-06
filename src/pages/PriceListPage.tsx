import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit2, Power, Package, Wrench } from 'lucide-react';
import { toast } from 'sonner';

type PriceItemType = 'part' | 'labor';
type PriceItemCategory = 'engine' | 'brake' | 'suspension' | 'electrical' | 'ac' | 'oil' | 'body' | 'general';

interface PriceItem {
  id: string;
  code: string;
  name: string;
  type: PriceItemType;
  category: PriceItemCategory;
  unitPrice: number;
  unit: string;
  isActive: boolean;
}

const categories: Record<PriceItemCategory, string> = {
  engine: 'เครื่องยนต์',
  brake: 'ระบบเบรก',
  suspension: 'ช่วงล่าง',
  electrical: 'ไฟฟ้า',
  ac: 'แอร์',
  oil: 'น้ำมัน/ fluids',
  body: 'ตัวถัง',
  general: 'ทั่วไป',
};

const mockPriceItems: PriceItem[] = [
  { id: '1', code: 'PART-001', name: 'สายพานไทม์มิ่ง', type: 'part', category: 'engine', unitPrice: 3500, unit: 'ชิ้น', isActive: true },
  { id: '2', code: 'LABOR-001', name: 'ค่าแรงเปลี่ยนสายพาน', type: 'labor', category: 'engine', unitPrice: 2000, unit: 'รายการ', isActive: true },
  { id: '3', code: 'PART-002', name: 'น้ำมันเครื่อง 0W-20', type: 'part', category: 'oil', unitPrice: 450, unit: 'ลิตร', isActive: true },
  { id: '4', code: 'PART-003', name: 'กรองน้ำมันเครื่อง', type: 'part', category: 'oil', unitPrice: 350, unit: 'ชิ้น', isActive: true },
  { id: '5', code: 'LABOR-002', name: 'ค่าแรงเปลี่ยนน้ำมัน', type: 'labor', category: 'oil', unitPrice: 500, unit: 'รายการ', isActive: true },
  { id: '6', code: 'PART-004', name: 'ผ้าเบรกหน้า', type: 'part', category: 'brake', unitPrice: 2800, unit: 'ชุด', isActive: true },
  { id: '7', code: 'PART-005', name: 'จานเบรกหน้า', type: 'part', category: 'brake', unitPrice: 3200, unit: 'ชิ้น', isActive: true },
  { id: '8', code: 'LABOR-003', name: 'ค่าแรงเปลี่ยนเบรก', type: 'labor', category: 'brake', unitPrice: 1500, unit: 'รายการ', isActive: true },
  { id: '9', code: 'PART-006', name: 'โช้คอัพหน้า', type: 'part', category: 'suspension', unitPrice: 8500, unit: 'ชิ้น', isActive: true },
  { id: '10', code: 'LABOR-004', name: 'ค่าแรงเปลี่ยนโช้คอัพ', type: 'labor', category: 'suspension', unitPrice: 3000, unit: 'รายการ', isActive: true },
  { id: '11', code: 'PART-007', name: 'หลอดไฟหน้า LED', type: 'part', category: 'electrical', unitPrice: 5200, unit: 'ชิ้น', isActive: true },
  { id: '12', code: 'PART-008', name: 'น้ำยาแอร์ R-134a', type: 'part', category: 'ac', unitPrice: 800, unit: 'กระป๋อง', isActive: true },
  { id: '13', code: 'PART-009', name: 'คอมเพรสเซอร์แอร์', type: 'part', category: 'ac', unitPrice: 12000, unit: 'ชิ้น', isActive: true },
];

export default function PriceListPage() {
  const [items, setItems] = useState<PriceItem[]>(mockPriceItems);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PriceItemType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<PriceItemCategory | 'all'>('all');
  const [editingItem, setEditingItem] = useState<PriceItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filtered = items.filter(item => {
    const matchesSearch = item.name.includes(search) || item.code.includes(search);
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const toggleActive = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
    toast.success('อัปเดตสถานะสำเร็จ');
  };

  const handleSave = () => {
    if (editingItem) {
      if (editingItem.id) {
        setItems(prev => prev.map(item => item.id === editingItem.id ? editingItem : item));
        toast.success('แก้ไขรายการสำเร็จ');
      } else {
        const newItem = { ...editingItem, id: Date.now().toString() };
        setItems(prev => [...prev, newItem]);
        toast.success('เพิ่มรายการสำเร็จ');
      }
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const openNewItem = () => {
    setEditingItem({
      id: '',
      code: '',
      name: '',
      type: 'part',
      category: 'general',
      unitPrice: 0,
      unit: 'ชิ้น',
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const openEditItem = (item: PriceItem) => {
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">จัดการ Price List</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewItem}>
              <Plus className="h-4 w-4 mr-2" /> เพิ่มรายการ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingItem?.id ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>รหัส</Label>
                    <Input
                      value={editingItem.code}
                      onChange={(e) => setEditingItem({ ...editingItem, code: e.target.value })}
                      placeholder="PART-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ประเภท</Label>
                    <Select
                      value={editingItem.type}
                      onValueChange={(v: PriceItemType) => setEditingItem({ ...editingItem, type: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part">อะไหล่</SelectItem>
                        <SelectItem value="labor">ค่าแรง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ชื่อรายการ</Label>
                  <Input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="ชื่อรายการ"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>หมวดหมู่</Label>
                    <Select
                      value={editingItem.category}
                      onValueChange={(v: PriceItemCategory) => setEditingItem({ ...editingItem, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categories).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>หน่วย</Label>
                    <Input
                      value={editingItem.unit}
                      onChange={(e) => setEditingItem({ ...editingItem, unit: e.target.value })}
                      placeholder="ชิ้น"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>ราคา (บาท)</Label>
                  <Input
                    type="number"
                    value={editingItem.unitPrice}
                    onChange={(e) => setEditingItem({ ...editingItem, unitPrice: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <Button className="w-full" onClick={handleSave}>บันทึก</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">รายการทั้งหมด</p>
            <p className="text-2xl font-bold">{items.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">อะไหล่</p>
            <p className="text-2xl font-bold">{items.filter(i => i.type === 'part').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">ค่าแรง</p>
            <p className="text-2xl font-bold">{items.filter(i => i.type === 'labor').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">ใช้งานอยู่</p>
            <p className="text-2xl font-bold text-green-600">{items.filter(i => i.isActive).length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อ, รหัส..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={(v: any) => setTypeFilter(v)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="ประเภท" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="part">อะไหล่</SelectItem>
                <SelectItem value="labor">ค่าแรง</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={(v: any) => setCategoryFilter(v)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="หมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                {Object.entries(categories).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">รหัส</th>
                  <th className="px-4 py-3 font-medium">ชื่อรายการ</th>
                  <th className="px-4 py-3 font-medium">ประเภท</th>
                  <th className="px-4 py-3 font-medium">หมวดหมู่</th>
                  <th className="px-4 py-3 font-medium text-right">ราคา</th>
                  <th className="px-4 py-3 font-medium text-center">สถานะ</th>
                  <th className="px-4 py-3 font-medium text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                    <td className="px-4 py-3 font-mono text-xs">{item.code}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {item.type === 'part' ? <Package className="h-4 w-4 text-blue-500" /> : <Wrench className="h-4 w-4 text-orange-500" />}
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={item.type === 'part' ? 'default' : 'secondary'}>
                        {item.type === 'part' ? 'อะไหล่' : 'ค่าแรง'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{categories[item.category]}</td>
                    <td className="px-4 py-3 text-right font-medium">฿{item.unitPrice.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={item.isActive ? 'default' : 'secondary'} className={item.isActive ? 'bg-green-500' : ''}>
                        {item.isActive ? 'ใช้งาน' : 'ปิดใช้งาน'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditItem(item)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleActive(item.id)}
                          className={item.isActive ? 'text-red-500' : 'text-green-500'}
                        >
                          <Power className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
