import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, Percent, Target } from 'lucide-react';
import { toast } from 'sonner';

type CommissionType = 'percentage' | 'fixed' | 'tiered';

interface CommissionRule {
  id: string;
  role: string;
  serviceCategory: string;
  type: CommissionType;
  value: number;
  minAmount?: number;
  maxAmount?: number;
  isActive: boolean;
}

interface BonusRule {
  id: string;
  name: string;
  condition: string;
  amount: number;
  isActive: boolean;
}

const defaultRules: CommissionRule[] = [
  { id: '1', role: 'ช่างซ่อม', serviceCategory: 'เครื่องยนต์', type: 'percentage', value: 10, isActive: true },
  { id: '2', role: 'ช่างซ่อม', serviceCategory: 'ระบบเบรก', type: 'percentage', value: 8, isActive: true },
  { id: '3', role: 'ช่างซ่อม', serviceCategory: 'ช่วงล่าง', type: 'percentage', value: 8, isActive: true },
  { id: '4', role: 'ช่างซ่อม', serviceCategory: 'ระบบไฟฟ้า', type: 'percentage', value: 12, isActive: true },
  { id: '5', role: 'ช่างซ่อม', serviceCategory: 'แอร์', type: 'percentage', value: 10, isActive: true },
  { id: '6', role: 'ที่ปรึกษาลูกค้า', serviceCategory: 'ทั้งหมด', type: 'percentage', value: 5, isActive: true },
];

const defaultBonuses: BonusRule[] = [
  { id: '1', name: 'Bonus งานด่วน', condition: 'จบงานภายใน 24 ชม.', amount: 500, isActive: true },
  { id: '2', name: 'Bonus ลูกค้าประจำ', condition: 'ลูกค้าเข้ามาซ่อมครั้งที่ 3+', amount: 300, isActive: true },
  { id: '3', name: 'Bonus Upsell', condition: 'ขายบริการเพิ่มจากที่ประเมิน', amount: 200, isActive: false },
];

const serviceCategories = ['เครื่องยนต์', 'ระบบเบรก', 'ช่วงล่าง', 'ระบบไฟฟ้า', 'แอร์', 'น้ำมัน/fluids', 'ตัวถัง', 'ทั้งหมด'];
const roles = ['ช่างซ่อม', 'ที่ปรึกษาลูกค้า', 'ผู้จัดการ', 'พนักงานต้อนรับ'];

export default function CommissionSettingsPage() {
  const [rules, setRules] = useState<CommissionRule[]>(defaultRules);
  const [bonuses, setBonuses] = useState<BonusRule[]>(defaultBonuses);
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null);
  const [editingBonus, setEditingBonus] = useState<BonusRule | null>(null);

  const addRule = () => {
    const newRule: CommissionRule = {
      id: Date.now().toString(),
      role: 'ช่างซ่อม',
      serviceCategory: 'ทั้งหมด',
      type: 'percentage',
      value: 10,
      isActive: true,
    };
    setRules([...rules, newRule]);
    setEditingRule(newRule);
  };

  const addBonus = () => {
    const newBonus: BonusRule = {
      id: Date.now().toString(),
      name: 'Bonus ใหม่',
      condition: 'เงื่อนไข...',
      amount: 0,
      isActive: true,
    };
    setBonuses([...bonuses, newBonus]);
    setEditingBonus(newBonus);
  };

  const updateRule = (id: string, updates: Partial<CommissionRule>) => {
    setRules(rules.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const updateBonus = (id: string, updates: Partial<BonusRule>) => {
    setBonuses(bonuses.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const deleteBonus = (id: string) => {
    setBonuses(bonuses.filter(b => b.id !== id));
  };

  const handleSave = () => {
    toast.success('บันทึกการตั้งค่า Commission สำเร็จ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">ตั้งค่าอัตรา Commission</h1>
          <p className="text-sm text-muted-foreground">กำหนด % ค่าคอมมิชชั่นตาม Role และประเภทบริการ</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" /> บันทึกการตั้งค่า
        </Button>
      </div>

      <Tabs defaultValue="rates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rates">อัตราค่าคอมมิชชั่น</TabsTrigger>
          <TabsTrigger value="bonus">เงื่อนไข Bonus</TabsTrigger>
          <TabsTrigger value="tiers">ระดับขั้น (Tiers)</TabsTrigger>
        </TabsList>

        <TabsContent value="rates" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">กฎการคำนวณ Commission</CardTitle>
              <Button variant="outline" size="sm" onClick={addRule}>
                <Plus className="h-4 w-4 mr-2" /> เพิ่มกฎ
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="grid grid-cols-4 gap-3 flex-1">
                      <div>
                        <Label className="text-xs text-muted-foreground">ตำแหน่ง</Label>
                        <select
                          value={rule.role}
                          onChange={(e) => updateRule(rule.id, { role: e.target.value })}
                          className="w-full mt-1 rounded-md border border-input bg-background px-2 py-1 text-sm"
                        >
                          {roles.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">หมวดหมู่</Label>
                        <select
                          value={rule.serviceCategory}
                          onChange={(e) => updateRule(rule.id, { serviceCategory: e.target.value })}
                          className="w-full mt-1 rounded-md border border-input bg-background px-2 py-1 text-sm"
                        >
                          {serviceCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">ประเภท</Label>
                        <select
                          value={rule.type}
                          onChange={(e) => updateRule(rule.id, { type: e.target.value as CommissionType })}
                          className="w-full mt-1 rounded-md border border-input bg-background px-2 py-1 text-sm"
                        >
                          <option value="percentage">% จากรายได้</option>
                          <option value="fixed">จำนวนคงที่</option>
                          <option value="tiered">ขั้นบันได</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">ค่า</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type="number"
                            value={rule.value}
                            onChange={(e) => updateRule(rule.id, { value: parseFloat(e.target.value) })}
                            className="text-sm"
                          />
                          <span className="text-sm text-muted-foreground">
                            {rule.type === 'percentage' ? '%' : '฿'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={(checked) => updateRule(rule.id, { isActive: checked })}
                      />
                      <Button variant="ghost" size="icon" onClick={() => deleteRule(rule.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
                {rules.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    ยังไม่มีกฎการคำนวณ กด "เพิ่มกฎ" เพื่อเริ่มต้น
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">ช่างซ่อมเฉลี่ย</p>
                <p className="text-2xl font-bold">9.6%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">ที่ปรึกษาลูกค้า</p>
                <p className="text-2xl font-bold">5%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">กฎที่ใช้งาน</p>
                <p className="text-2xl font-bold">{rules.filter(r => r.isActive).length}/{rules.length}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bonus" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">เงื่อนไข Bonus พิเศษ</CardTitle>
              <Button variant="outline" size="sm" onClick={addBonus}>
                <Plus className="h-4 w-4 mr-2" /> เพิ่ม Bonus
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bonuses.map((bonus) => (
                  <div key={bonus.id} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className="grid grid-cols-3 gap-3 flex-1">
                      <div>
                        <Label className="text-xs text-muted-foreground">ชื่อ Bonus</Label>
                        <Input
                          value={bonus.name}
                          onChange={(e) => updateBonus(bonus.id, { name: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">เงื่อนไข</Label>
                        <Input
                          value={bonus.condition}
                          onChange={(e) => updateBonus(bonus.id, { condition: e.target.value })}
                          className="mt-1 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">จำนวนเงิน (฿)</Label>
                        <Input
                          type="number"
                          value={bonus.amount}
                          onChange={(e) => updateBonus(bonus.id, { amount: parseFloat(e.target.value) })}
                          className="mt-1 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={bonus.isActive}
                        onCheckedChange={(checked) => updateBonus(bonus.id, { isActive: checked })}
                      />
                      <Button variant="ghost" size="icon" onClick={() => deleteBonus(bonus.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">ระดับขั้น Commission (Tiers)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">ระดับ Bronze</p>
                    <p className="text-sm text-muted-foreground">เริ่มต้น - รายได้ต่ำกว่า 100,000 บาท/เดือน</p>
                  </div>
                  <Badge>Base Rate</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50">
                  <Target className="h-5 w-5 text-yellow-500" />
                  <div className="flex-1">
                    <p className="font-medium">ระดับ Silver</p>
                    <p className="text-sm text-muted-foreground">รายได้ 100,000 - 200,000 บาท/เดือน</p>
                  </div>
                  <Badge className="bg-yellow-500">+2% Bonus</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-secondary/50">
                  <Target className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium">ระดับ Gold</p>
                    <p className="text-sm text-muted-foreground">รายได้ 200,000+ บาท/เดือน</p>
                  </div>
                  <Badge className="bg-blue-500">+5% Bonus</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
