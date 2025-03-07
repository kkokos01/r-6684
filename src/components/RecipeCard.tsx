
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Recipe } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <article 
      className={cn(
        'group relative overflow-hidden rounded-lg border border-muted/50 bg-card hover-lift',
        className
      )}
    >
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="aspect-[4/3] w-full image-blur-wrapper">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className={cn(
              'h-full w-full object-cover image-blur',
              imageLoaded ? 'image-blur-loaded' : 'image-blur-loading'
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {recipe.isFavorite && (
            <div className="absolute top-3 right-3 rounded-full bg-background/60 backdrop-blur-sm p-1.5">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-medium mb-2 line-clamp-1 group-hover:text-accent transition-colors">
            {recipe.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {recipe.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1" /> 
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Users className="h-3.5 w-3.5 mr-1" /> 
              <span>{recipe.servings}</span>
            </div>
            
            <Badge variant="outline" className="bg-secondary/50">
              {recipe.difficulty}
            </Badge>
          </div>
        </div>
      </Link>
    </article>
  );
}
