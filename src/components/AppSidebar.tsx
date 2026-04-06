import { BarChart2, Users, Wrench, FileText, Package, Receipt, TrendingUp, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: BarChart2, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'ลูกค้า / CRM', path: '/customers' },
  { icon: Wrench, label: 'งานซ่อม', path: '/work-orders' },
  { icon: FileText, label: 'ใบเสนอราคา', path: '/quotation' },
  { icon: Package, label: 'อะไหล่', path: '/parts' },
  { icon: Receipt, label: 'การเงิน', path: '/finance' },
  { icon: TrendingUp, label: 'รายงาน', path: '/reports' },
  { icon: Settings, label: 'ตั้งค่า', path: '/settings' },
];

export function AppSidebar() {
  return (
    <aside className="hidden lg:flex lg:w-[260px] lg:flex-col lg:fixed lg:inset-y-0 bg-sidebar z-30">
      {/* Logo */}
      <div className="flex h-14 items-center px-6 border-b border-sidebar-border">
        <span className="text-lg font-bold text-sidebar-foreground tracking-tight">
          Pro<span className="text-accent">Auto</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  )
                }
              >
                <item.icon className="h-[18px] w-[18px]" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
