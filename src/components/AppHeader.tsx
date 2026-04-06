import { Bell, Menu } from 'lucide-react';
import { CustomerAvatar } from './CustomerAvatar';

export function AppHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-3">
        <span className="lg:hidden text-lg font-bold text-foreground">
          Pro<span className="text-accent">Auto</span>
        </span>
        {title && <span className="hidden lg:block text-sm text-muted-foreground">{title}</span>}
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-md p-2 hover:bg-secondary transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>
        <CustomerAvatar name="Admin User" size="sm" />
      </div>
    </header>
  );
}
