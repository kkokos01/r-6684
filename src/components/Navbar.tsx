
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Search, Calendar, ShoppingCart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/recipes', label: 'Recipes', icon: BookOpen },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/meal-planner', label: 'Meal Planner', icon: Calendar },
    { to: '/shopping-list', label: 'Shopping List', icon: ShoppingCart }
  ];
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
      isScrolled ? 'glass shadow-sm' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-medium tracking-tight">
          <span className="text-accent">Culinary</span>Collection
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary hover:text-secondary-foreground'
              )}
            >
              <item.icon className="w-4 h-4 mr-2" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 glass border-b border-muted/50 shadow-lg animate-fade-in">
          <div className="py-3 px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn(
                  'flex items-center py-3 px-4 rounded-md text-base font-medium transition-colors',
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary hover:text-secondary-foreground'
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
