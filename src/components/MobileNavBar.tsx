import { Home, Wrench, Search, DollarSign, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const items = [
  { icon: Home, label: 'หน้าหลัก', path: '/' },
  { icon: Wrench, label: 'งานซ่อม', path: '/work-orders' },
  { icon: Search, label: 'ค้นหา', path: '/customers' },
  { icon: DollarSign, label: 'Commission', path: '/finance' },
  { icon: User, label: 'โปรไฟล์', path: '/settings' },
];

export function MobileNavBar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card lg:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const active = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 min-w-[64px] min-h-[44px] justify-center transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
