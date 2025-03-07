
import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { recipes } from '@/lib/data';
import { RecipeCard } from '@/components/RecipeCard';

const Search = () => {
  const [searchResults, setSearchResults] = useState(recipes);
  
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <SearchIcon className="h-6 w-6 mr-3" />
        <h1 className="text-3xl font-medium">Search Recipes</h1>
      </div>
      
      <SearchBar 
        onSearch={setSearchResults}
        className="max-w-2xl mx-auto"
        autoFocus
      />
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <h2 className="text-2xl font-medium">No results found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search terms or browse all recipes.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
