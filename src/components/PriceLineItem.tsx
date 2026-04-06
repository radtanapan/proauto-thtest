import { Trash2 } from 'lucide-react';

interface PriceLineItemProps {
  name: string;
  quantity: number;
  unitPrice: number;
  onRemove?: () => void;
  onQuantityChange?: (q: number) => void;
  editable?: boolean;
}

export function PriceLineItem({ name, quantity, unitPrice, onRemove, onQuantityChange, editable = false }: PriceLineItemProps) {
  const total = quantity * unitPrice;
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        {editable ? (
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => onQuantityChange?.(parseInt(e.target.value) || 1)}
            className="w-14 rounded border border-input bg-background px-2 py-1 text-center text-sm"
          />
        ) : (
          <span className="text-muted-foreground">{quantity}</span>
        )}
        <span className="text-muted-foreground">×</span>
        <span className="w-20 text-right text-muted-foreground">{unitPrice.toLocaleString()}</span>
        <span className="w-24 text-right font-medium text-foreground">฿{total.toLocaleString()}</span>
      </div>
      {editable && onRemove && (
        <button onClick={onRemove} className="ml-2 text-muted-foreground hover:text-destructive transition-colors">
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
