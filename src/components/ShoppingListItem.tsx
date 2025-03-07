
import { Check, Trash, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingListItem as ShoppingListItemType } from '@/lib/data';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface ShoppingListItemProps {
  item: ShoppingListItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string, quantity: string) => void;
  className?: string;
}

export function ShoppingListItem({ 
  item, 
  onToggle, 
  onDelete, 
  onEdit,
  className 
}: ShoppingListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  
  const handleToggle = () => {
    onToggle(item.id);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSaveEdit = () => {
    onEdit(item.id, editName, editQuantity);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setIsEditing(false);
  };
  
  return (
    <div 
      className={cn(
        'group flex items-center p-3 rounded-lg border border-muted/50 bg-card',
        item.checked && 'bg-muted/30',
        className
      )}
    >
      {!isEditing ? (
        <>
          <Button 
            variant={item.checked ? "default" : "outline"} 
            size="icon" 
            className="h-6 w-6 mr-3 text-accent"
            onClick={handleToggle}
          >
            {item.checked && <Check className="h-3.5 w-3.5" />}
          </Button>
          
          <div className="flex-1 min-w-0">
            <p className={cn(
              'text-sm font-medium line-clamp-1',
              item.checked && 'line-through text-muted-foreground'
            )}>
              {item.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {item.quantity}
            </p>
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(item.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col space-y-2">
          <div className="flex gap-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="h-8 text-sm"
              placeholder="Item name"
            />
            <Input
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
              className="h-8 text-sm w-24"
              placeholder="Quantity"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveEdit}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
