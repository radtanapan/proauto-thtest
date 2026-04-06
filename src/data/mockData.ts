export type WorkOrderStatus = 'รับรถ' | 'กำลังซ่อม' | 'รอชิ้นส่วน' | 'เสร็จแล้ว' | 'ส่งมอบ';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicles: Vehicle[];
  createdAt: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
}

export interface WorkOrder {
  id: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  licensePlate: string;
  vehicleName: string;
  status: WorkOrderStatus;
  serviceType: string;
  technicianName: string;
  description: string;
  items: WorkOrderItem[];
  timeline: TimelineEvent[];
  photos: string[];
  createdAt: string;
  estimatedCompletion: string;
  totalCost: number;
}

export interface WorkOrderItem {
  id: string;
  name: string;
  type: 'part' | 'labor';
  quantity: number;
  unitPrice: number;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface DailySales {
  date: string;
  amount: number;
}

export interface MonthlyYOYData {
  month: string;
  previous: number;
  current: number;
}

export interface YearlySales {
  year: number;
  sales: number;
}

export const yearlySalesData: YearlySales[] = [
  { year: 2024, sales: 8500000 },
  { year: 2025, sales: 9200000 },
  { year: 2026, sales: 11050000 },
];

export const monthlyYOYData: MonthlyYOYData[] = [
  { month: 'ม.ค.', previous: 680000, current: 750000 },
  { month: 'ก.พ.', previous: 720000, current: 820000 },
  { month: 'มี.ค.', previous: 780000, current: 950000 },
  { month: 'เม.ย.', previous: 750000, current: 920000 },
  { month: 'พ.ค.', previous: 800000, current: 980000 },
  { month: 'มิ.ย.', previous: 820000, current: 1050000 },
  { month: 'ก.ค.', previous: 780000, current: 960000 },
  { month: 'ส.ค.', previous: 750000, current: 920000 },
  { month: 'ก.ย.', previous: 790000, current: 980000 },
  { month: 'ต.ค.', previous: 820000, current: 1020000 },
  { month: 'พ.ย.', previous: 850000, current: 1080000 },
  { month: 'ธ.ค.', previous: 880000, current: 1150000 },
];

export const customers: Customer[] = [
  { id: 'C001', name: 'สมชาย วงศ์สกุล', phone: '081-234-5678', email: 'somchai@email.com', vehicles: [{ id: 'V001', licensePlate: 'กก 1234', brand: 'Toyota', model: 'Camry', year: 2022, color: 'ขาว' }], createdAt: '2025-01-15' },
  { id: 'C002', name: 'สุดา แสงทอง', phone: '089-876-5432', email: 'suda@email.com', vehicles: [{ id: 'V002', licensePlate: 'ขข 5678', brand: 'Honda', model: 'Civic', year: 2023, color: 'ดำ' }], createdAt: '2025-02-10' },
  { id: 'C003', name: 'วิชัย ศรีสุข', phone: '062-111-2222', email: 'wichai@email.com', vehicles: [{ id: 'V003', licensePlate: 'คค 9012', brand: 'Mazda', model: 'CX-5', year: 2021, color: 'แดง' }], createdAt: '2025-03-05' },
  { id: 'C004', name: 'นภา พรหมมา', phone: '095-333-4444', email: 'napa@email.com', vehicles: [{ id: 'V004', licensePlate: 'งง 3456', brand: 'BMW', model: '320i', year: 2020, color: 'น้ำเงิน' }], createdAt: '2025-03-20' },
  { id: 'C005', name: 'ประเสริฐ จันทร์เพ็ญ', phone: '083-555-6666', email: 'prasert@email.com', vehicles: [{ id: 'V005', licensePlate: 'จจ 7890', brand: 'Mercedes-Benz', model: 'C200', year: 2022, color: 'เทา' }], createdAt: '2025-04-01' },
  { id: 'C006', name: 'อรุณี สายลม', phone: '091-777-8888', email: 'arunee@email.com', vehicles: [{ id: 'V006', licensePlate: 'ฉฉ 2345', brand: 'Nissan', model: 'X-Trail', year: 2023, color: 'ขาว' }], createdAt: '2025-04-15' },
  { id: 'C007', name: 'ธนกร เรืองศรี', phone: '064-999-0000', email: 'thanakorn@email.com', vehicles: [{ id: 'V007', licensePlate: 'ชช 6789', brand: 'Ford', model: 'Ranger', year: 2021, color: 'ดำ' }], createdAt: '2025-05-01' },
  { id: 'C008', name: 'พิมพ์ใจ อินทร์แก้ว', phone: '086-111-3333', email: 'pimjai@email.com', vehicles: [{ id: 'V008', licensePlate: 'ซซ 0123', brand: 'Isuzu', model: 'D-Max', year: 2022, color: 'เงิน' }], createdAt: '2025-05-15' },
  { id: 'C009', name: 'กิตติ ธรรมดา', phone: '092-444-5555', email: 'kitti@email.com', vehicles: [{ id: 'V009', licensePlate: 'ฌฌ 4567', brand: 'Mitsubishi', model: 'Pajero', year: 2020, color: 'ขาว' }], createdAt: '2025-06-01' },
  { id: 'C010', name: 'รัตนา สุขใจ', phone: '087-666-7777', email: 'rattana@email.com', vehicles: [{ id: 'V010', licensePlate: 'ญญ 8901', brand: 'Suzuki', model: 'Swift', year: 2023, color: 'แดง' }], createdAt: '2025-06-15' },
];

const serviceTypes = ['ซ่อมเครื่องยนต์', 'เปลี่ยนน้ำมันเครื่อง', 'ซ่อมระบบเบรก', 'ซ่อมช่วงล่าง', 'ซ่อมระบบไฟฟ้า', 'ซ่อมแอร์', 'ตรวจเช็คระยะ'];
const technicianNames = ['ช่างสมศักดิ์', 'ช่างวีระ', 'ช่างอนุชา', 'ช่างประสิทธิ์', 'ช่างสุรชัย'];

export const workOrders: WorkOrder[] = [
  { id: 'WO001', customerId: 'C001', customerName: 'สมชาย วงศ์สกุล', vehicleId: 'V001', licensePlate: 'กก 1234', vehicleName: 'Toyota Camry 2022', status: 'กำลังซ่อม', serviceType: 'ซ่อมเครื่องยนต์', technicianName: 'ช่างสมศักดิ์', description: 'เครื่องยนต์มีเสียงดังผิดปกติ', items: [{ id: 'I1', name: 'สายพานไทม์มิ่ง', type: 'part', quantity: 1, unitPrice: 3500 }, { id: 'I2', name: 'ค่าแรงเปลี่ยนสายพาน', type: 'labor', quantity: 1, unitPrice: 2000 }], timeline: [{ date: '2026-04-01', title: 'รับรถเข้าศูนย์', description: 'ลูกค้าแจ้งเครื่องยนต์มีเสียงดัง' }, { date: '2026-04-02', title: 'เริ่มตรวจสอบ', description: 'ช่างสมศักดิ์ตรวจสอบเครื่องยนต์' }], photos: [], createdAt: '2026-04-01', estimatedCompletion: '2026-04-05', totalCost: 5500 },
  { id: 'WO002', customerId: 'C002', customerName: 'สุดา แสงทอง', vehicleId: 'V002', licensePlate: 'ขข 5678', vehicleName: 'Honda Civic 2023', status: 'รับรถ', serviceType: 'เปลี่ยนน้ำมันเครื่อง', technicianName: 'ช่างวีระ', description: 'เปลี่ยนน้ำมันเครื่องตามระยะ', items: [{ id: 'I3', name: 'น้ำมันเครื่อง 0W-20', type: 'part', quantity: 4, unitPrice: 450 }, { id: 'I4', name: 'กรองน้ำมันเครื่อง', type: 'part', quantity: 1, unitPrice: 350 }, { id: 'I5', name: 'ค่าแรงเปลี่ยนน้ำมัน', type: 'labor', quantity: 1, unitPrice: 500 }], timeline: [{ date: '2026-04-05', title: 'รับรถเข้าศูนย์', description: 'นัดเปลี่ยนน้ำมันเครื่อง' }], photos: [], createdAt: '2026-04-05', estimatedCompletion: '2026-04-05', totalCost: 2650 },
  { id: 'WO003', customerId: 'C003', customerName: 'วิชัย ศรีสุข', vehicleId: 'V003', licensePlate: 'คค 9012', vehicleName: 'Mazda CX-5 2021', status: 'รอชิ้นส่วน', serviceType: 'ซ่อมระบบเบรก', technicianName: 'ช่างอนุชา', description: 'ผ้าเบรกหน้าหมด ต้องเปลี่ยน', items: [{ id: 'I6', name: 'ผ้าเบรกหน้า', type: 'part', quantity: 1, unitPrice: 2800 }, { id: 'I7', name: 'จานเบรกหน้า', type: 'part', quantity: 2, unitPrice: 3200 }, { id: 'I8', name: 'ค่าแรงเปลี่ยนเบรก', type: 'labor', quantity: 1, unitPrice: 1500 }], timeline: [{ date: '2026-03-28', title: 'รับรถเข้าศูนย์', description: 'ลูกค้าแจ้งเบรกมีเสียง' }, { date: '2026-03-29', title: 'ตรวจพบปัญหา', description: 'ผ้าเบรกหมด จานเบรกบาง' }, { date: '2026-03-30', title: 'สั่งอะไหล่', description: 'รอจานเบรกจากตัวแทน' }], photos: [], createdAt: '2026-03-28', estimatedCompletion: '2026-04-08', totalCost: 10700 },
  { id: 'WO004', customerId: 'C004', customerName: 'นภา พรหมมา', vehicleId: 'V004', licensePlate: 'งง 3456', vehicleName: 'BMW 320i 2020', status: 'เสร็จแล้ว', serviceType: 'ซ่อมช่วงล่าง', technicianName: 'ช่างประสิทธิ์', description: 'โช้คอัพหน้าซ้ายรั่ว', items: [{ id: 'I9', name: 'โช้คอัพหน้าซ้าย', type: 'part', quantity: 1, unitPrice: 8500 }, { id: 'I10', name: 'ค่าแรงเปลี่ยนโช้คอัพ', type: 'labor', quantity: 1, unitPrice: 3000 }], timeline: [{ date: '2026-03-25', title: 'รับรถเข้าศูนย์', description: 'ลูกค้าแจ้งรถเอียง' }, { date: '2026-03-26', title: 'เริ่มซ่อม', description: 'ถอดโช้คอัพเก่าออก' }, { date: '2026-04-01', title: 'ซ่อมเสร็จ', description: 'ทดสอบขับเรียบร้อย' }], photos: [], createdAt: '2026-03-25', estimatedCompletion: '2026-04-01', totalCost: 11500 },
  { id: 'WO005', customerId: 'C005', customerName: 'ประเสริฐ จันทร์เพ็ญ', vehicleId: 'V005', licensePlate: 'จจ 7890', vehicleName: 'Mercedes-Benz C200 2022', status: 'กำลังซ่อม', serviceType: 'ซ่อมระบบไฟฟ้า', technicianName: 'ช่างสุรชัย', description: 'ไฟหน้าด้านซ้ายไม่ติด', items: [{ id: 'I11', name: 'หลอดไฟหน้า LED', type: 'part', quantity: 1, unitPrice: 5200 }, { id: 'I12', name: 'ค่าแรงเปลี่ยนหลอดไฟ', type: 'labor', quantity: 1, unitPrice: 800 }], timeline: [{ date: '2026-04-03', title: 'รับรถเข้าศูนย์', description: 'ลูกค้าแจ้งไฟหน้าไม่ติด' }, { date: '2026-04-04', title: 'เริ่มซ่อม', description: 'ตรวจสอบระบบไฟฟ้า' }], photos: [], createdAt: '2026-04-03', estimatedCompletion: '2026-04-06', totalCost: 6000 },
  { id: 'WO006', customerId: 'C006', customerName: 'อรุณี สายลม', vehicleId: 'V006', licensePlate: 'ฉฉ 2345', vehicleName: 'Nissan X-Trail 2023', status: 'รับรถ', serviceType: 'ซ่อมแอร์', technicianName: 'ช่างสมศักดิ์', description: 'แอร์ไม่เย็น', items: [{ id: 'I13', name: 'น้ำยาแอร์ R-134a', type: 'part', quantity: 2, unitPrice: 800 }, { id: 'I14', name: 'ค่าแรงเติมน้ำยาแอร์', type: 'labor', quantity: 1, unitPrice: 500 }], timeline: [{ date: '2026-04-06', title: 'รับรถเข้าศูนย์', description: 'ลูกค้าแจ้งแอร์ไม่เย็น' }], photos: [], createdAt: '2026-04-06', estimatedCompletion: '2026-04-07', totalCost: 2100 },
  { id: 'WO007', customerId: 'C007', customerName: 'ธนกร เรืองศรี', vehicleId: 'V007', licensePlate: 'ชช 6789', vehicleName: 'Ford Ranger 2021', status: 'กำลังซ่อม', serviceType: 'ตรวจเช็คระยะ', technicianName: 'ช่างวีระ', description: 'ตรวจเช็คระยะ 60,000 กม.', items: [{ id: 'I15', name: 'น้ำมันเครื่อง', type: 'part', quantity: 7, unitPrice: 420 }, { id: 'I16', name: 'กรองอากาศ', type: 'part', quantity: 1, unitPrice: 650 }, { id: 'I17', name: 'ค่าแรงตรวจเช็ค', type: 'labor', quantity: 1, unitPrice: 1500 }], timeline: [{ date: '2026-04-04', title: 'รับรถเข้าศูนย์', description: 'นัดตรวจเช็คระยะ' }, { date: '2026-04-05', title: 'เริ่มตรวจเช็ค', description: 'ตรวจสอบระบบต่างๆ' }], photos: [], createdAt: '2026-04-04', estimatedCompletion: '2026-04-06', totalCost: 5090 },
  { id: 'WO008', customerId: 'C008', customerName: 'พิมพ์ใจ อินทร์แก้ว', vehicleId: 'V008', licensePlate: 'ซซ 0123', vehicleName: 'Isuzu D-Max 2022', status: 'เสร็จแล้ว', serviceType: 'ซ่อมเครื่องยนต์', technicianName: 'ช่างอนุชา', description: 'เปลี่ยนสายพานแอร์', items: [{ id: 'I18', name: 'สายพานแอร์', type: 'part', quantity: 1, unitPrice: 1200 }, { id: 'I19', name: 'ค่าแรง', type: 'labor', quantity: 1, unitPrice: 800 }], timeline: [{ date: '2026-03-30', title: 'รับรถ', description: 'สายพานแอร์ส่งเสียง' }, { date: '2026-04-01', title: 'ซ่อมเสร็จ', description: 'เปลี่ยนเรียบร้อย' }], photos: [], createdAt: '2026-03-30', estimatedCompletion: '2026-04-01', totalCost: 2000 },
  { id: 'WO009', customerId: 'C009', customerName: 'กิตติ ธรรมดา', vehicleId: 'V009', licensePlate: 'ฌฌ 4567', vehicleName: 'Mitsubishi Pajero 2020', status: 'ส่งมอบ', serviceType: 'ซ่อมระบบเบรก', technicianName: 'ช่างประสิทธิ์', description: 'เปลี่ยนผ้าเบรกหลัง', items: [{ id: 'I20', name: 'ผ้าเบรกหลัง', type: 'part', quantity: 1, unitPrice: 2200 }, { id: 'I21', name: 'ค่าแรง', type: 'labor', quantity: 1, unitPrice: 1000 }], timeline: [{ date: '2026-03-20', title: 'รับรถ', description: 'เบรกหลังหมด' }, { date: '2026-03-22', title: 'ซ่อมเสร็จ', description: 'เปลี่ยนผ้าเบรกเรียบร้อย' }, { date: '2026-03-23', title: 'ส่งมอบ', description: 'ลูกค้ารับรถแล้ว' }], photos: [], createdAt: '2026-03-20', estimatedCompletion: '2026-03-22', totalCost: 3200 },
  { id: 'WO010', customerId: 'C010', customerName: 'รัตนา สุขใจ', vehicleId: 'V010', licensePlate: 'ญญ 8901', vehicleName: 'Suzuki Swift 2023', status: 'รอชิ้นส่วน', serviceType: 'ซ่อมแอร์', technicianName: 'ช่างสุรชัย', description: 'คอมเพรสเซอร์แอร์เสีย', items: [{ id: 'I22', name: 'คอมเพรสเซอร์แอร์', type: 'part', quantity: 1, unitPrice: 12000 }, { id: 'I23', name: 'น้ำยาแอร์', type: 'part', quantity: 2, unitPrice: 800 }, { id: 'I24', name: 'ค่าแรง', type: 'labor', quantity: 1, unitPrice: 3000 }], timeline: [{ date: '2026-04-02', title: 'รับรถ', description: 'แอร์ไม่ทำงาน' }, { date: '2026-04-03', title: 'ตรวจพบ', description: 'คอมเพรสเซอร์เสีย' }, { date: '2026-04-04', title: 'สั่งอะไหล่', description: 'รอคอมเพรสเซอร์ใหม่' }], photos: [], createdAt: '2026-04-02', estimatedCompletion: '2026-04-10', totalCost: 16600 },
  { id: 'WO011', customerId: 'C001', customerName: 'สมชาย วงศ์สกุล', vehicleId: 'V001', licensePlate: 'กก 1234', vehicleName: 'Toyota Camry 2022', status: 'ส่งมอบ', serviceType: 'เปลี่ยนน้ำมันเครื่อง', technicianName: 'ช่างวีระ', description: 'เปลี่ยนน้ำมันเครื่องปกติ', items: [{ id: 'I25', name: 'น้ำมันเครื่อง', type: 'part', quantity: 4, unitPrice: 450 }, { id: 'I26', name: 'ค่าแรง', type: 'labor', quantity: 1, unitPrice: 500 }], timeline: [{ date: '2026-03-10', title: 'รับรถ', description: 'นัดเปลี่ยนน้ำมัน' }, { date: '2026-03-10', title: 'เสร็จ', description: 'เปลี่ยนเรียบร้อย' }, { date: '2026-03-10', title: 'ส่งมอบ', description: 'ลูกค้ารับรถ' }], photos: [], createdAt: '2026-03-10', estimatedCompletion: '2026-03-10', totalCost: 2300 },
  { id: 'WO012', customerId: 'C002', customerName: 'สุดา แสงทอง', vehicleId: 'V002', licensePlate: 'ขข 5678', vehicleName: 'Honda Civic 2023', status: 'ส่งมอบ', serviceType: 'ตรวจเช็คระยะ', technicianName: 'ช่างอนุชา', description: 'ตรวจเช็คระยะ 10,000 กม.', items: [{ id: 'I27', name: 'น้ำมันเครื่อง', type: 'part', quantity: 4, unitPrice: 480 }, { id: 'I28', name: 'ค่าแรง', type: 'labor', quantity: 1, unitPrice: 1000 }], timeline: [{ date: '2026-03-15', title: 'รับรถ', description: 'ตรวจเช็คระยะ' }, { date: '2026-03-16', title: 'ส่งมอบ', description: 'เรียบร้อย' }], photos: [], createdAt: '2026-03-15', estimatedCompletion: '2026-03-16', totalCost: 2920 },
  { id: 'WO013', customerId: 'C005', customerName: 'ประเสริฐ จันทร์เพ็ญ', vehicleId: 'V005', licensePlate: 'จจ 7890', vehicleName: 'Mercedes-Benz C200 2022', status: 'ส่งมอบ', serviceType: 'ซ่อมช่วงล่าง', technicianName: 'ช่างประสิทธิ์', description: 'เปลี่ยนลูกหมากปีกนก', items: [{ id: 'I29', name: 'ลูกหมากปีกนก', type: 'part', quantity: 2, unitPrice: 4500 }, { id: 'I30', name: 'ค่าแรง', type: 'labor', quantity: 1, unitPrice: 2500 }], timeline: [{ date: '2026-03-18', title: 'รับรถ', description: 'ช่วงล่างมีเสียง' }, { date: '2026-03-20', title: 'ซ่อมเสร็จ', description: 'เปลี่ยนลูกหมาก' }, { date: '2026-03-21', title: 'ส่งมอบ', description: 'ลูกค้ารับรถ' }], photos: [], createdAt: '2026-03-18', estimatedCompletion: '2026-03-20', totalCost: 11500 },
  { id: 'WO014', customerId: 'C007', customerName: 'ธนกร เรืองศรี', vehicleId: 'V007', licensePlate: 'ชช 6789', vehicleName: 'Ford Ranger 2021', status: 'กำลังซ่อม', serviceType: 'ซ่อมระบบไฟฟ้า', technicianName: 'ช่างสุรชัย', description: 'ระบบสตาร์ทมีปัญหา', items: [{ id: 'I31', name: 'ไดสตาร์ท', type: 'part', quantity: 1, unitPrice: 6500 }, { id: 'I32', name: 'ค่าแรง', type: 'labor', quantity: 1, unitPrice: 1500 }], timeline: [{ date: '2026-04-05', title: 'รับรถ', description: 'สตาร์ทไม่ติด' }, { date: '2026-04-06', title: 'เริ่มซ่อม', description: 'ถอดไดสตาร์ท' }], photos: [], createdAt: '2026-04-05', estimatedCompletion: '2026-04-07', totalCost: 8000 },
  { id: 'WO015', customerId: 'C003', customerName: 'วิชัย ศรีสุข', vehicleId: 'V003', licensePlate: 'คค 9012', vehicleName: 'Mazda CX-5 2021', status: 'เสร็จแล้ว', serviceType: 'ซ่อมแอร์', technicianName: 'ช่างสมศักดิ์', description: 'เติมน้ำยาแอร์', items: [{ id: 'I33', name: 'น้ำยาแอร์', type: 'part', quantity: 2, unitPrice: 800 }, { id: 'I34', name: 'ค่าแรง', type: 'labor', quantity: 1, unitPrice: 500 }], timeline: [{ date: '2026-04-01', title: 'รับรถ', description: 'แอร์ไม่เย็น' }, { date: '2026-04-01', title: 'เสร็จ', description: 'เติมน้ำยาเรียบร้อย' }], photos: [], createdAt: '2026-04-01', estimatedCompletion: '2026-04-01', totalCost: 2100 },
];

// Generate 30 days of sales data
export const dailySales: DailySales[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 2, 8 + i); // March 8 to April 6
  return {
    date: date.toISOString().split('T')[0],
    amount: Math.floor(Math.random() * 40000) + 10000,
  };
});

export const serviceTypeDistribution = [
  { name: 'ซ่อมเครื่องยนต์', value: 25, color: 'hsl(211, 66%, 32%)' },
  { name: 'เปลี่ยนน้ำมันเครื่อง', value: 20, color: 'hsl(38, 92%, 50%)' },
  { name: 'ซ่อมระบบเบรก', value: 15, color: 'hsl(160, 60%, 40%)' },
  { name: 'ซ่อมช่วงล่าง', value: 12, color: 'hsl(25, 95%, 53%)' },
  { name: 'ซ่อมระบบไฟฟ้า', value: 10, color: 'hsl(280, 60%, 50%)' },
  { name: 'ซ่อมแอร์', value: 10, color: 'hsl(190, 60%, 45%)' },
  { name: 'ตรวจเช็คระยะ', value: 8, color: 'hsl(340, 60%, 50%)' },
];
