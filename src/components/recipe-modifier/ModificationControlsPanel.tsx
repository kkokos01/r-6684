
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, PanelLeft } from "lucide-react";
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
  isLoading,
  toggleCollectionPanel,
  isCollectionVisible
}: ModificationControlsPanelProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center relative">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollectionPanel}
          className="md:hidden absolute left-0 top-0"
          aria-label="Toggle collection panel"
        >
          <PanelLeft className={cn("h-5 w-5", !isCollectionVisible && "rotate-180")} />
        </Button>
        <h2 className="text-xl font-medium mb-2">Modify Your Recipe</h2>
        <p className="text-muted-foreground">
          Select modifiers and add custom instructions to transform your recipe
        </p>
      </div>
      
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
              {modifier.label}
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
  );
};
