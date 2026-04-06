import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: number;
  changeLabel?: string;
}

export function KPICard({ icon: Icon, label, value, change, changeLabel = 'จากเมื่อวาน' }: KPICardProps) {
  const isPositive = change >= 0;
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="rounded-md bg-primary/10 p-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-card-foreground">{value}</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{changeLabel}</p>
    </div>
  );
}
