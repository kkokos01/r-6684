
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { type Recipe } from "@/lib/data";

interface RecipeCollectionPanelProps {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  onSelect: (recipe: Recipe) => void;
}

export const RecipeCollectionPanel = ({ 
  recipes, 
  selectedRecipe, 
  onSelect 
}: RecipeCollectionPanelProps) => {
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
                <h3 className="text-sm font-medium line-clamp-1">{recipe.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
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
