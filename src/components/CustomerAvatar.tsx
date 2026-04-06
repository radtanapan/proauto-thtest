import { cn } from '@/lib/utils';

interface CustomerAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
};

function getInitials(name: string) {
  const parts = name.split(' ');
  if (parts.length >= 2) return parts[0][0] + parts[1][0];
  return name[0];
}

function getColor(name: string) {
  const colors = [
    'bg-primary text-primary-foreground',
    'bg-accent text-accent-foreground',
    'bg-success text-success-foreground',
    'bg-status-received text-primary-foreground',
    'bg-status-waiting text-primary-foreground',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function CustomerAvatar({ name, size = 'md', className }: CustomerAvatarProps) {
  return (
    <div className={cn('flex items-center justify-center rounded-full font-medium', sizeClasses[size], getColor(name), className)}>
      {getInitials(name)}
    </div>
  );
}
