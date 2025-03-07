
import { useState, useEffect } from 'react';
import { BookOpen, Filter, ChevronDown } from 'lucide-react';
import { recipes, categories, Category } from '@/lib/data';
import { RecipeCard } from '@/components/RecipeCard';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { Recipe } from '@/lib/data';
import { useSearchParams } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isFilteringFavorites, setIsFilteringFavorites] = useState(false);
  
  // Initialize state from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const favoritesParam = searchParams.get("favorites") === "true";
    const sortParam = searchParams.get("sort") || "newest";
    
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    setIsFilteringFavorites(favoritesParam);
    setSortBy(sortParam);
  }, [searchParams]);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...recipes];
    
    // Filter by search
    if (searchResults.length > 0) {
      filtered = searchResults;
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(recipe => 
        recipe.categories.some(cat => selectedCategories.includes(cat))
      );
    }
    
    // Filter by favorites
    if (isFilteringFavorites) {
      filtered = filtered.filter(recipe => recipe.isFavorite);
    }
    
    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === "prepTime") {
      filtered.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
    }
    
    setFilteredRecipes(filtered);
    
    // Update URL params
    const params = new URLSearchParams();
    if (selectedCategories.length === 1) {
      params.set("category", selectedCategories[0]);
    }
    if (isFilteringFavorites) {
      params.set("favorites", "true");
    }
    if (sortBy !== "newest") {
      params.set("sort", sortBy);
    }
    
    setSearchParams(params, { replace: true });
  }, [selectedCategories, sortBy, isFilteringFavorites, searchResults, setSearchParams]);
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setIsFilteringFavorites(false);
    setSortBy("newest");
    setSearchResults([]);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <BookOpen className="h-6 w-6 mr-3" />
        <h1 className="text-3xl font-medium">Recipes</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <SearchBar 
          onSearch={setSearchResults}
          className="md:max-w-md" 
        />
        
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {(selectedCategories.length > 0 || isFilteringFavorites) && (
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {selectedCategories.length + (isFilteringFavorites ? 1 : 0)}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Recipes</SheetTitle>
                <SheetDescription>
                  Narrow down recipes by category and other criteria
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Categories</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <Label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Other Filters</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="filter-favorites"
                      checked={isFilteringFavorites}
                      onCheckedChange={() => setIsFilteringFavorites(!isFilteringFavorites)}
                    />
                    <Label htmlFor="filter-favorites" className="text-sm">
                      Favorites only
                    </Label>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={handleClearFilters} 
                  className="w-full"
                  disabled={selectedCategories.length === 0 && !isFilteringFavorites && sortBy === "newest"}
                >
                  Clear Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="prepTime">Prep Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Active Filters */}
      {(selectedCategories.length > 0 || isFilteringFavorites) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          
          {selectedCategories.map(catId => {
            const category = categories.find(c => c.id === catId);
            return category ? (
              <Button
                key={catId}
                variant="outline"
                size="sm"
                className="h-7 rounded-full"
                onClick={() => handleCategoryToggle(catId)}
              >
                {category.name}
                <X className="ml-1 h-3 w-3" />
              </Button>
            ) : null;
          })}
          
          {isFilteringFavorites && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 rounded-full"
              onClick={() => setIsFilteringFavorites(false)}
            >
              Favorites
              <X className="ml-1 h-3 w-3" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7"
            onClick={handleClearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
      
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">No recipes found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search criteria
          </p>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
};

export default Recipes;
