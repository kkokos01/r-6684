
import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getRecipesBySearch, Recipe } from '@/lib/data';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch?: (results: Recipe[]) => void;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({ onSearch, className, autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = () => {
    if (query.trim() === '') {
      setResults([]);
      setIsDropdownOpen(false);
      if (onSearch) onSearch([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate search delay for visual feedback
    setTimeout(() => {
      const searchResults = getRecipesBySearch(query);
      setResults(searchResults);
      setIsDropdownOpen(true);
      setIsSearching(false);
      if (onSearch) onSearch(searchResults);
    }, 300);
  };
  
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsDropdownOpen(false);
    if (onSearch) onSearch([]);
    if (inputRef.current) inputRef.current.focus();
  };
  
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  return (
    <div className={cn('relative', className)}>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search recipes, ingredients..."
          className="pl-10 pr-12 h-12 bg-card border-muted/80 text-base focus-visible:ring-accent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          onFocus={() => {
            if (results.length > 0) setIsDropdownOpen(true);
          }}
        />
        {isSearching ? (
          <Loader2 className="absolute right-3 h-5 w-5 animate-spin text-muted-foreground" />
        ) : query.length > 0 ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1.5 h-7 w-7"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      
      {isDropdownOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-md border border-muted bg-popover shadow-md animate-fade-in">
          <div className="py-2 max-h-[60vh] overflow-auto">
            <p className="px-4 py-2 text-xs font-medium text-muted-foreground">
              {results.length} results
            </p>
            {results.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="block px-4 py-2.5 hover:bg-muted transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <div className="flex items-start gap-3">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium line-clamp-1">
                      {recipe.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {recipe.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
