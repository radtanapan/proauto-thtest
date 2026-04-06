import { useState } from 'react';
import { customers } from '@/data/mockData';
import { PriceLineItem } from '@/components/PriceLineItem';
import { Plus, Send, Save, ArrowRightLeft } from 'lucide-react';

interface LineItem {
  id: string;
  name: string;
  type: 'part' | 'labor';
  quantity: number;
  unitPrice: number;
}

export default function QuotationPage() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', name: 'น้ำมันเครื่อง 0W-20', type: 'part', quantity: 4, unitPrice: 450 },
    { id: '2', name: 'กรองน้ำมันเครื่อง', type: 'part', quantity: 1, unitPrice: 350 },
    { id: '3', name: 'ค่าแรงเปลี่ยนน้ำมัน', type: 'labor', quantity: 1, unitPrice: 500 },
  ]);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newType, setNewType] = useState<'part' | 'labor'>('part');

  const customer = customers.find((c) => c.id === selectedCustomer);
  const vehicle = customer?.vehicles.find((v) => v.id === selectedVehicle);

  const subtotal = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat;

  const addItem = () => {
    if (!newName || !newPrice) return;
    setItems([...items, { id: Date.now().toString(), name: newName, type: newType, quantity: 1, unitPrice: parseInt(newPrice) }]);
    setNewName('');
    setNewPrice('');
  };

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));
  const updateQty = (id: string, q: number) => setItems(items.map((i) => (i.id === id ? { ...i, quantity: q } : i)));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">ใบเสนอราคา</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="space-y-5 lg:col-span-3">
          {/* Customer Selection */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-card-foreground">ข้อมูลลูกค้า</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">เลือกลูกค้า</label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => { setSelectedCustomer(e.target.value); setSelectedVehicle(''); }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- เลือก --</option>
                  {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">เลือกรถ</label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  disabled={!customer}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- เลือก --</option>
                  {customer?.vehicles.map((v) => <option key={v.id} value={v.id}>{v.licensePlate} — {v.brand} {v.model}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-card-foreground">รายการ</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <PriceLineItem
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  unitPrice={item.unitPrice}
                  editable
                  onRemove={() => removeItem(item.id)}
                  onQuantityChange={(q) => updateQty(item.id, q)}
                />
              ))}
            </div>

            {/* Add Item */}
            <div className="mt-4 flex flex-wrap gap-2">
              <select value={newType} onChange={(e) => setNewType(e.target.value as 'part' | 'labor')} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="part">อะไหล่</option>
                <option value="labor">ค่าแรง</option>
              </select>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="ชื่อรายการ" className="flex-1 min-w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground" />
              <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="ราคา" type="number" className="w-24 rounded-md border border-input bg-background px-3 py-2 text-sm" />
              <button onClick={addItem} className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4" /> เพิ่ม
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Save className="h-4 w-4" /> บันทึก
            </button>
            <button className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors">
              <Send className="h-4 w-4" /> ส่ง Email
            </button>
            <button className="flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              <ArrowRightLeft className="h-4 w-4" /> Convert to WO
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 rounded-lg border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-card-foreground">สรุปยอด</h3>
            {customer && (
              <div className="mb-4 text-sm">
                <p className="font-medium text-foreground">{customer.name}</p>
                <p className="text-muted-foreground">{customer.phone}</p>
                {vehicle && <p className="text-muted-foreground">{vehicle.licensePlate} — {vehicle.brand} {vehicle.model}</p>}
              </div>
            )}
            <div className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ค่าอะไหล่</span>
                <span className="text-foreground">฿{items.filter(i => i.type === 'part').reduce((s, i) => s + i.quantity * i.unitPrice, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ค่าแรง</span>
                <span className="text-foreground">฿{items.filter(i => i.type === 'labor').reduce((s, i) => s + i.quantity * i.unitPrice, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">รวมก่อน VAT</span>
                <span className="font-medium text-foreground">฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT 7%</span>
                <span className="text-foreground">฿{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-lg font-semibold">
                <span className="text-foreground">ยอดสุทธิ</span>
                <span className="text-primary">฿{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
