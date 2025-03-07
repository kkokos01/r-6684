import { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { recipes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ModifierOption {
  id: string;
  label: string;
  description: string;
}

const modifierOptions: ModifierOption[] = [
  { id: 'healthier', label: 'Healthier', description: 'Lower calories, more nutrients' },
  { id: 'vegetarian', label: 'Vegetarian', description: 'No meat ingredients' },
  { id: 'vegan', label: 'Vegan', description: 'No animal products' },
  { id: 'keto', label: 'Keto', description: 'Low-carb, high-fat' },
  { id: 'glutenFree', label: 'Gluten-Free', description: 'No gluten ingredients' },
  { id: 'dairyFree', label: 'Dairy-Free', description: 'No dairy ingredients' },
  { id: 'quickMeal', label: 'Quick Meal', description: 'Faster preparation time' },
  { id: 'budgetFriendly', label: 'Budget-Friendly', description: 'Less expensive ingredients' },
];

const Modifications = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0] || null);
  const [modifiedRecipe, setModifiedRecipe] = useState<typeof selectedRecipe | null>(null);
  const [userInput, setUserInput] = useState('');
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewOriginal, setViewOriginal] = useState(true);
  
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
      <div className="flex items-center">
        <Sparkles className="h-6 w-6 mr-3" />
        <h1 className="text-3xl font-medium">Recipe Modifications</h1>
      </div>
      
      <div className="relative flex flex-col md:flex-row">
        {/* Mobile panel triggers */}
        <div className="flex justify-between md:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={() => setIsLeftPanelOpen(true)}
          >
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
        
        {/* Desktop Left Panel - Always visible on desktop */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5 md:mr-4 overflow-auto border border-muted/50 rounded-lg">
          <RecipeCollectionPanel 
            recipes={favoriteRecipes}
            selectedRecipe={selectedRecipe}
            onSelect={handleRecipeSelect}
          />
        </div>
        
        {/* Middle Panel - Modification Controls */}
        <div className="md:w-1/2 lg:w-2/5 bg-muted/20 rounded-lg border border-muted/50 p-6">
          <ModificationControlsPanel
            userInput={userInput}
            setUserInput={setUserInput}
            modifierOptions={modifierOptions}
            selectedModifiers={selectedModifiers}
            onModifierToggle={handleModifierToggle}
            onSubmit={handleSubmit}
            isLoading={isLoading}
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
        <div className="hidden md:block md:w-1/4 lg:w-2/5 md:ml-4 overflow-auto border border-muted/50 rounded-lg">
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

// Left Panel Component
const RecipeCollectionPanel = ({ 
  recipes, 
  selectedRecipe, 
  onSelect 
}: { 
  recipes: typeof import('@/lib/data').recipes,
  selectedRecipe: typeof import('@/lib/data').recipes[0] | null,
  onSelect: (recipe: typeof import('@/lib/data').recipes[0]) => void
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-muted/50 bg-muted/20">
        <h2 className="text-lg font-medium">Your Collections</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        {recipes.length > 0 ? (
          <div className="divide-y divide-muted/50">
            {recipes.map(recipe => (
              <button
                key={recipe.id}
                onClick={() => onSelect(recipe)}
                className={cn(
                  "w-full text-left p-3 hover:bg-muted/30 transition-colors",
                  selectedRecipe?.id === recipe.id && "bg-primary/5 border-l-4 border-l-primary"
                )}
              >
                <h3 className="font-medium line-clamp-1">{recipe.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                  {recipe.prepTime + recipe.cookTime} min • {recipe.servings} servings
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 h-full text-center">
            <p className="text-muted-foreground mb-4">No saved recipes in your collection</p>
            <Button variant="outline" asChild>
              <a href="/recipes">Browse Recipes</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Middle Panel Component
const ModificationControlsPanel = ({ 
  userInput, 
  setUserInput, 
  modifierOptions, 
  selectedModifiers, 
  onModifierToggle, 
  onSubmit,
  isLoading
}: { 
  userInput: string, 
  setUserInput: (value: string) => void, 
  modifierOptions: ModifierOption[], 
  selectedModifiers: string[],
  onModifierToggle: (id: string) => void,
  onSubmit: () => void,
  isLoading: boolean
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
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

// Right Panel Component
const RecipeDisplayPanel = ({ 
  recipe, 
  modifiedRecipe, 
  viewOriginal, 
  setViewOriginal 
}: { 
  recipe: typeof import('@/lib/data').recipes[0] | null,
  modifiedRecipe: typeof import('@/lib/data').recipes[0] | null,
  viewOriginal: boolean,
  setViewOriginal: (value: boolean) => void
}) => {
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full text-center">
        <p className="text-muted-foreground">
          Select a recipe to view and modify
        </p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-muted/50 bg-muted/20 flex items-center justify-between">
        <h2 className="text-lg font-medium">Recipe Details</h2>
        
        {modifiedRecipe && (
          <div className="flex items-center gap-1 text-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewOriginal(true)}
              disabled={viewOriginal}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Original</span>
            </Button>
            
            <span className="text-xs text-muted-foreground">
              {viewOriginal ? "Original" : "Modified"}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewOriginal(false)}
              disabled={!viewOriginal}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Modified</span>
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-medium mb-2">{recipe.title}</h3>
            <p className="text-muted-foreground">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline">
                Prep: {recipe.prepTime} min
              </Badge>
              <Badge variant="outline">
                Cook: {recipe.cookTime} min
              </Badge>
              <Badge variant="outline">
                Serves: {recipe.servings}
              </Badge>
              <Badge variant="outline">
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Ingredients</h4>
            <ul className="space-y-2 pl-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="list-disc list-outside">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Instructions</h4>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-secondary text-secondary-foreground font-medium text-sm mr-3">
                    {index + 1}
                  </span>
                  <p>{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modifications;
