
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { type Recipe } from "@/lib/data";

interface RecipeDisplayPanelProps {
  recipe: Recipe | null;
  modifiedRecipe: Recipe | null;
  viewOriginal: boolean;
  setViewOriginal: (value: boolean) => void;
  substitutionMode: boolean;
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
}

export const RecipeDisplayPanel = ({ 
  recipe, 
  modifiedRecipe, 
  viewOriginal, 
  setViewOriginal,
  substitutionMode,
  selectedIngredients,
  setSelectedIngredients
}: RecipeDisplayPanelProps) => {
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full text-center">
        <p className="text-muted-foreground">
          Select a recipe to view and modify
        </p>
      </div>
    );
  }
  
  const displayedRecipe = viewOriginal ? recipe : (modifiedRecipe || recipe);

  const toggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };
  
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
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h3 className="text-2xl font-medium mb-2">{displayedRecipe.title}</h3>
            <p className="text-muted-foreground">{displayedRecipe.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">
                Prep: {displayedRecipe.prepTime} min
              </Badge>
              <Badge variant="outline">
                Cook: {displayedRecipe.cookTime} min
              </Badge>
              <Badge variant="outline">
                Serves: {displayedRecipe.servings}
              </Badge>
              <Badge variant="outline">
                {displayedRecipe.difficulty}
              </Badge>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-lg">Ingredients</h4>
            <ul className="space-y-2 pl-4">
              {displayedRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className={cn(
                  "list-disc list-outside flex items-center gap-2",
                  substitutionMode && selectedIngredients.includes(ingredient) && "text-primary font-medium"
                )}>
                  {substitutionMode && (
                    <Checkbox 
                      id={`ingredient-${index}`}
                      checked={selectedIngredients.includes(ingredient)}
                      onCheckedChange={() => toggleIngredient(ingredient)}
                    />
                  )}
                  <span className="flex-1">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-lg">Instructions</h4>
            <ol className="space-y-4">
              {displayedRecipe.instructions.map((instruction, index) => (
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
