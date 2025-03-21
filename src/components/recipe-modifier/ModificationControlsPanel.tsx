
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Replace } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  substitutionMode: boolean;
  setSubstitutionMode: (value: boolean) => void;
}

export const ModificationControlsPanel = ({ 
  userInput, 
  setUserInput, 
  modifierOptions, 
  selectedModifiers, 
  onModifierToggle, 
  onSubmit,
  isLoading,
  substitutionMode,
  setSubstitutionMode
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
            placeholder={substitutionMode 
              ? "Enter substitution instructions for the selected ingredients..." 
              : "E.g., Make it spicier, reduce cooking time, substitute honey for sugar..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="resize-none h-32"
          />
        </div>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Select Modifiers
          </label>
          
          <Badge
            variant={substitutionMode ? "default" : "outline"}
            className={cn(
              "h-auto py-2 px-3 cursor-pointer text-sm w-full justify-center flex items-center gap-2",
              substitutionMode ? "bg-accent text-accent-foreground hover:bg-accent/90" : "hover:bg-accent/20"
            )}
            onClick={() => setSubstitutionMode(!substitutionMode)}
          >
            <Replace className="w-5 h-5" />
            <span className="font-medium">Substitute Ingredients</span>
          </Badge>
          
          <div className="grid grid-cols-2 gap-2">
            <TooltipProvider>
              {modifierOptions.map(modifier => (
                <Tooltip key={modifier.id} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Badge
                      variant={selectedModifiers.includes(modifier.id) ? "default" : "outline"}
                      className={cn(
                        "h-auto py-1.5 px-2 cursor-pointer justify-center text-xs flex items-center",
                        selectedModifiers.includes(modifier.id) ? "bg-accent text-accent-foreground hover:bg-accent/90" : "hover:bg-accent/20"
                      )}
                      onClick={() => onModifierToggle(modifier.id)}
                    >
                      <span className="font-medium">{modifier.label}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-sm">{modifier.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
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
              {substitutionMode ? "Substitute Ingredients" : "Modify Recipe"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
