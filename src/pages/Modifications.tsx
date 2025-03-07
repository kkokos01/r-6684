
import { useState } from 'react';
import { Sparkles, PanelLeft } from 'lucide-react';
import { recipes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { RecipeCollectionPanel } from '@/components/recipe-modifier/RecipeCollectionPanel';
import { ModificationControlsPanel } from '@/components/recipe-modifier/ModificationControlsPanel';
import { RecipeDisplayPanel } from '@/components/recipe-modifier/RecipeDisplayPanel';
import { modifierOptions } from '@/components/recipe-modifier/types';

const Modifications = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0] || null);
  const [modifiedRecipe, setModifiedRecipe] = useState<typeof selectedRecipe | null>(null);
  const [userInput, setUserInput] = useState('');
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewOriginal, setViewOriginal] = useState(true);
  const [isCollectionVisible, setIsCollectionVisible] = useState(true);
  
  // Filter to show only favorite recipes in the collection
  const favoriteRecipes = recipes.filter(recipe => recipe.isFavorite);
  
  const handleModifierToggle = (modifierId: string) => {
    setSelectedModifiers(prev => 
      prev.includes(modifierId) 
        ? prev.filter(id => id !== modifierId)
        : [...prev, modifierId]
    );
  };
  
  const handleRecipeSelect = (recipe: typeof recipes[0]) => {
    setSelectedRecipe(recipe);
    setModifiedRecipe(null);
    setViewOriginal(true);
    setIsLeftPanelOpen(false);
  };

  const toggleCollectionPanel = () => {
    setIsCollectionVisible(prev => !prev);
  };
  
  const handleSubmit = () => {
    if (!selectedRecipe) {
      toast.error("Please select a recipe first");
      return;
    }
    
    if (selectedModifiers.length === 0 && !userInput.trim()) {
      toast.error("Please select at least one modifier or add custom instructions");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This is a mock of what would be returned from an AI service
      const newRecipe = {
        ...selectedRecipe,
        title: `${selectedRecipe.title} (Modified)`,
        description: `Modified version: ${selectedModifiers.join(', ')} ${userInput}`,
        // In a real implementation, these would be modified by the AI
        ingredients: selectedRecipe.ingredients.map(ingredient => 
          `Modified: ${ingredient}`
        ),
        instructions: selectedRecipe.instructions.map(instruction => 
          `Modified: ${instruction}`
        ),
      };
      
      setModifiedRecipe(newRecipe);
      setViewOriginal(false);
      setIsLoading(false);
      toast.success("Recipe modified successfully!");
    }, 2000);
  };
  
  const displayedRecipe = modifiedRecipe && !viewOriginal ? modifiedRecipe : selectedRecipe;
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 mr-3" />
          <h1 className="text-3xl font-medium">Recipe Modifications</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollectionPanel}
          className="hidden md:flex"
          aria-label="Toggle collection panel"
        >
          <PanelLeft className={cn("h-5 w-5", !isCollectionVisible && "rotate-180")} />
        </Button>
      </div>
      
      <div className="relative flex flex-col md:flex-row">
        {/* Mobile panel triggers */}
        <div className="flex justify-between md:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={() => setIsLeftPanelOpen(true)}
            className="flex items-center gap-2"
          >
            <PanelLeft className="h-4 w-4" />
            Your Collection
          </Button>
          
          {modifiedRecipe && (
            <Button 
              variant="outline" 
              onClick={() => setIsRightPanelOpen(true)}
            >
              View Recipe
            </Button>
          )}
        </div>
        
        {/* Left Panel - Recipe Collection (Sliding on mobile) */}
        <Sheet open={isLeftPanelOpen} onOpenChange={setIsLeftPanelOpen}>
          <SheetContent side="left" className="w-full sm:max-w-md md:hidden p-0">
            <RecipeCollectionPanel 
              recipes={favoriteRecipes}
              selectedRecipe={selectedRecipe}
              onSelect={handleRecipeSelect}
            />
          </SheetContent>
        </Sheet>
        
        {/* Desktop Left Panel - Collapsible */}
        {isCollectionVisible && (
          <div className="hidden md:block md:w-1/4 lg:w-1/5 md:mr-4 overflow-auto border border-muted/50 rounded-lg transition-all duration-300">
            <RecipeCollectionPanel 
              recipes={favoriteRecipes}
              selectedRecipe={selectedRecipe}
              onSelect={handleRecipeSelect}
            />
          </div>
        )}
        
        {/* Middle Panel - Modification Controls */}
        <div className={cn(
          "md:transition-all md:duration-300",
          isCollectionVisible 
            ? "md:w-1/2 lg:w-2/5" 
            : "md:w-3/5 lg:w-1/2",
          "bg-muted/20 rounded-lg border border-muted/50 p-6"
        )}>
          <ModificationControlsPanel
            userInput={userInput}
            setUserInput={setUserInput}
            modifierOptions={modifierOptions}
            selectedModifiers={selectedModifiers}
            onModifierToggle={handleModifierToggle}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            toggleCollectionPanel={toggleCollectionPanel}
            isCollectionVisible={isCollectionVisible}
          />
        </div>
        
        {/* Right Panel - Recipe Display (Sliding on mobile) */}
        <Sheet open={isRightPanelOpen} onOpenChange={setIsRightPanelOpen}>
          <SheetContent side="right" className="w-full sm:max-w-md md:hidden p-0">
            <RecipeDisplayPanel
              recipe={displayedRecipe}
              modifiedRecipe={modifiedRecipe}
              viewOriginal={viewOriginal}
              setViewOriginal={setViewOriginal}
            />
          </SheetContent>
        </Sheet>
        
        {/* Desktop Right Panel - Always visible on desktop */}
        <div className={cn(
          "hidden md:block md:ml-4 overflow-auto border border-muted/50 rounded-lg transition-all duration-300",
          isCollectionVisible 
            ? "md:w-1/4 lg:w-2/5"
            : "md:w-2/5 lg:w-1/2" 
        )}>
          <RecipeDisplayPanel
            recipe={displayedRecipe}
            modifiedRecipe={modifiedRecipe}
            viewOriginal={viewOriginal}
            setViewOriginal={setViewOriginal}
          />
        </div>
      </div>
    </div>
  );
};

export default Modifications;
