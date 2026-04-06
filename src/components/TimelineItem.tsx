import { TimelineEvent } from '@/data/mockData';

export function TimelineItem({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-primary border-2 border-primary-foreground shadow-sm" />
        {!isLast && <div className="w-px flex-1 bg-border" />}
      </div>
      <div className="pb-6">
        <p className="text-sm font-medium text-foreground">{event.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{event.description}</p>
        <p className="mt-1 text-xs text-muted-foreground">{event.date}</p>
      </div>
    </div>
  );
}
