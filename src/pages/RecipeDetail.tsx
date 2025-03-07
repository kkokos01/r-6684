import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipeById, getCategoryById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Utensils, 
  Users, 
  Heart, 
  ChevronLeft,
  Plus,
  Check,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(id ? getRecipeById(id) : undefined);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite || false);
  const [addedToMealPlan, setAddedToMealPlan] = useState(false);
  const [addedToShoppingList, setAddedToShoppingList] = useState(false);
  
  useEffect(() => {
    if (!recipe) {
      navigate('/recipes', { replace: true });
    }
  }, [recipe, navigate]);
  
  if (!recipe) {
    return null;
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      description: recipe.title,
      action: {
        label: "Undo",
        onClick: () => setIsFavorite(isFavorite),
      },
    });
  };
  
  const addToMealPlan = () => {
    setAddedToMealPlan(true);
    toast("Added to meal plan", {
      description: recipe.title,
      action: {
        label: "View",
        onClick: () => navigate('/meal-planner'),
      },
    });
    
    setTimeout(() => {
      setAddedToMealPlan(false);
    }, 2000);
  };
  
  const addToShoppingList = () => {
    setAddedToShoppingList(true);
    toast("Added to shopping list", {
      description: `${recipe.ingredients.length} ingredients from ${recipe.title}`,
      action: {
        label: "View",
        onClick: () => navigate('/shopping-list'),
      },
    });
    
    setTimeout(() => {
      setAddedToShoppingList(false);
    }, 2000);
  };
  
  const categoryNames = recipe.categories
    .map(catId => {
      const category = getCategoryById(catId);
      return category ? category.name : '';
    })
    .filter(Boolean);
  
  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-8">
      <Button 
        variant="ghost" 
        size="sm" 
        asChild
        className="group mb-6"
      >
        <Link to="/recipes" className="flex items-center">
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to recipes
        </Link>
      </Button>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-medium">{recipe.title}</h1>
          
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full transition-all",
              isFavorite && "bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
            )}
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
          </Button>
        </div>
        
        <p className="text-lg text-muted-foreground">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {categoryNames.map(name => (
            <Badge key={name} variant="secondary" className="font-normal text-xs">
              {name}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          onLoad={() => setIsImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
      
      <div className="flex flex-wrap justify-between gap-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Prep Time</p>
              <p className="font-medium">{recipe.prepTime} min</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Utensils className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Cook Time</p>
              <p className="font-medium">{recipe.cookTime} min</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Servings</p>
              <p className="font-medium">{recipe.servings}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "transition-all",
              addedToMealPlan && "bg-green-50 text-green-600 border-green-200"
            )}
            onClick={addToMealPlan}
          >
            {addedToMealPlan ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added to plan
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 mr-1" />
                Add to meal plan
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "transition-all",
              addedToShoppingList && "bg-green-50 text-green-600 border-green-200"
            )}
            onClick={addToShoppingList}
          >
            {addedToShoppingList ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added to list
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add to shopping list
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-medium mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-accent mt-2 mr-3"></div>
                <span className="text-sm">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-xl font-medium mb-4">Instructions</h2>
          <ol className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-secondary-foreground font-medium text-sm mr-4">
                  {index + 1}
                </span>
                <p className="pt-1">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
