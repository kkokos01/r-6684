
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RecipeCard } from '@/components/RecipeCard';
import { CategoryCard } from '@/components/CategoryCard';
import { SearchBar } from '@/components/SearchBar';
import { categories, recipes, getFavoriteRecipes } from '@/lib/data';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const favoriteRecipes = getFavoriteRecipes();
  
  useEffect(() => {
    // Simulate load for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative -mt-16 py-32 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-muted/80 to-background">
        <div className={`max-w-3xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
            Your Personal <span className="text-accent">Recipe Collection</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Organize, discover, and plan your meals with ease. All your favorite recipes in one beautiful place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full font-medium">
              <Link to="/recipes">Browse Recipes</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full font-medium">
              <Link to="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className={`max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <SearchBar />
      </section>
      
      {/* Featured Categories */}
      <section className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-medium">Categories</h2>
          <Button asChild variant="ghost" className="group">
            <Link to="/categories" className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      
      {/* Latest Recipes */}
      <section className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-medium">Latest Recipes</h2>
          <Button asChild variant="ghost" className="group">
            <Link to="/recipes" className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.slice(0, 4).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
      
      {/* Favorites Section */}
      {favoriteRecipes.length > 0 && (
        <section className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-medium">Your Favorites</h2>
            <Button asChild variant="ghost" className="group">
              <Link to="/recipes?favorites=true" className="flex items-center">
                View All
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteRecipes.slice(0, 4).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
