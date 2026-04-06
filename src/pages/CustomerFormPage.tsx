import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { customers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Trash2, Car } from 'lucide-react';
import { toast } from 'sonner';

interface VehicleForm {
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  vin?: string;
  fuelType?: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  odometer?: number;
}

interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  address?: string;
  vehicles: VehicleForm[];
}

export default function CustomerFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingCustomer = id ? customers.find((c) => c.id === id) : null;

  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    vehicles: []
  });

  useEffect(() => {
    if (existingCustomer) {
      setFormData({
        name: existingCustomer.name,
        phone: existingCustomer.phone,
        email: existingCustomer.email,
        address: '',
        vehicles: existingCustomer.vehicles.map(v => ({
          ...v,
          vin: '',
          fuelType: 'petrol',
          odometer: 0
        }))
      });
    }
  }, [existingCustomer]);

  const addVehicle = () => {
    const newVehicle: VehicleForm = {
      id: `V${Date.now()}`,
      licensePlate: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      vin: '',
      fuelType: 'petrol',
      odometer: 0
    };
    setFormData(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, newVehicle]
    }));
  };

  const removeVehicle = (index: number) => {
    setFormData(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter((_, i) => i !== index)
    }));
  };

  const updateVehicle = (index: number, field: keyof VehicleForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      vehicles: prev.vehicles.map((v, i) => i === index ? { ...v, [field]: value } : v)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }

    // Simulate API call
    toast.success(isEdit ? 'แก้ไขข้อมูลลูกค้าสำเร็จ' : 'เพิ่มลูกค้าใหม่สำเร็จ');
    navigate('/customers');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to={isEdit ? `/customers/${id}` : '/customers'} className="rounded-md p-1.5 hover:bg-secondary transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">
          {isEdit ? 'แก้ไขข้อมูลลูกค้า' : 'เพิ่มลูกค้าใหม่'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">ข้อมูลลูกค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="กรอกชื่อ-นามสกุล"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="081-234-5678"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">ที่อยู่</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="กรอกที่อยู่"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicles */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Car className="h-4 w-4" /> ข้อมูลรถยนต์
            </CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addVehicle}>
              <Plus className="h-4 w-4 mr-2" /> เพิ่มรถ
            </Button>
          </CardHeader>
          <CardContent>
            {formData.vehicles.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-lg">
                <Car className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">ยังไม่มีรถยนต์</p>
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={addVehicle}>
                  <Plus className="h-4 w-4 mr-2" /> เพิ่มรถยนต์
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.vehicles.map((vehicle, index) => (
                  <div key={vehicle.id} className="rounded-lg border border-border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">รถคันที่ {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVehicle(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <Label>ทะเบียนรถ *</Label>
                        <Input
                          value={vehicle.licensePlate}
                          onChange={(e) => updateVehicle(index, 'licensePlate', e.target.value)}
                          placeholder="กก 1234"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ยี่ห้อ *</Label>
                        <Input
                          value={vehicle.brand}
                          onChange={(e) => updateVehicle(index, 'brand', e.target.value)}
                          placeholder="Toyota"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>รุ่น *</Label>
                        <Input
                          value={vehicle.model}
                          onChange={(e) => updateVehicle(index, 'model', e.target.value)}
                          placeholder="Camry"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ปี *</Label>
                        <Input
                          type="number"
                          value={vehicle.year}
                          onChange={(e) => updateVehicle(index, 'year', parseInt(e.target.value))}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2">
                        <Label>สี</Label>
                        <Input
                          value={vehicle.color}
                          onChange={(e) => updateVehicle(index, 'color', e.target.value)}
                          placeholder="ขาว"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>VIN / เลขตัวถัง</Label>
                        <Input
                          value={vehicle.vin}
                          onChange={(e) => updateVehicle(index, 'vin', e.target.value)}
                          placeholder="VIN Number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ประเภทเชื้อเพลิง</Label>
                        <select
                          value={vehicle.fuelType}
                          onChange={(e) => updateVehicle(index, 'fuelType', e.target.value as any)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="petrol">เบนซิน</option>
                          <option value="diesel">ดีเซล</option>
                          <option value="hybrid">ไฮบริด</option>
                          <option value="electric">ไฟฟ้า</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>เลขไมล์ (km)</Label>
                        <Input
                          type="number"
                          value={vehicle.odometer}
                          onChange={(e) => updateVehicle(index, 'odometer', parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            ยกเลิก
          </Button>
          <Button type="submit">
            {isEdit ? 'บันทึกการแก้ไข' : 'บันทึกลูกค้าใหม่'}
          </Button>
        </div>
      </form>
    </div>
  );
}
