
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories, getRecipesByCategory, getCategoryById } from '@/lib/data';
import { CategoryCard } from '@/components/CategoryCard';
import { RecipeCard } from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';
import { Tag, ChevronLeft } from 'lucide-react';

const Categories = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate load for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (id) {
    // Specific category view
    const category = getCategoryById(id);
    const recipes = getRecipesByCategory(id);
    
    if (!category) {
      return (
        <div className="text-center py-12">
          <p>Category not found</p>
          <Button asChild className="mt-4">
            <Link to="/categories">View All Categories</Link>
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-8">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="group mb-6"
        >
          <Link to="/categories" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All Categories
          </Link>
        </Button>
        
        <div className="relative rounded-xl overflow-hidden">
          <div className="aspect-[5/2] w-full">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-medium text-white mb-2">{category.name}</h1>
            <p className="text-lg text-white/80 max-w-2xl">{category.description}</p>
          </div>
        </div>
        
        <div className="pt-4">
          <h2 className="text-2xl font-medium mb-6">{recipes.length} Recipes</h2>
          
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found in this category</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // All categories view
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Tag className="h-6 w-6 mr-3" />
        <h1 className="text-3xl font-medium">Categories</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            className={`transition-all duration-700 delay-${categories.indexOf(category) * 100} ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
