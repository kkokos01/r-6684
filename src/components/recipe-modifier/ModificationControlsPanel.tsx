
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModifierOption {
  id: string;
  label: string;
  description: string;
}

interface ModificationControlsPanelProps {
  userInput: string;
  setUserInput: (value: string) => void;
  modifierOptions: ModifierOption[];
  selectedModifiers: string[];
  onModifierToggle: (id: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  toggleCollectionPanel: () => void;
  isCollectionVisible: boolean;
}

export const ModificationControlsPanel = ({ 
  userInput, 
  setUserInput, 
  modifierOptions, 
  selectedModifiers, 
  onModifierToggle, 
  onSubmit,
  isLoading
}: ModificationControlsPanelProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-muted/50 bg-muted/20">
        <h2 className="text-lg font-medium">Modify Recipe</h2>
      </div>
      
      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="space-y-3">
          <label htmlFor="custom-instructions" className="block text-sm font-medium">
            Custom Instructions
          </label>
          <Textarea
            id="custom-instructions"
            placeholder="E.g., Make it spicier, reduce cooking time, substitute honey for sugar..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="resize-none h-32"
          />
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Select Modifiers
          </label>
          <div className="grid grid-cols-1 gap-2">
            {modifierOptions.map(modifier => (
              <Button
                key={modifier.id}
                variant={selectedModifiers.includes(modifier.id) ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-auto py-2 justify-start",
                  selectedModifiers.includes(modifier.id) && "bg-accent text-accent-foreground"
                )}
                onClick={() => onModifierToggle(modifier.id)}
                title={modifier.description}
              >
                <span className="text-left">
                  <span className="block font-medium">{modifier.label}</span>
                  <span className="text-xs text-muted-foreground block mt-1">{modifier.description}</span>
                </span>
              </Button>
            ))}
          </div>
        </div>
        
        <Button 
          className="w-full" 
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
              Modifying Recipe...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Modify Recipe
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
