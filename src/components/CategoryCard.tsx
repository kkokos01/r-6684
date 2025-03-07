
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/data';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <Link 
      to={`/category/${category.id}`} 
      className={cn(
        'group relative block overflow-hidden rounded-lg hover-lift',
        className
      )}
    >
      <div className="aspect-[3/2] w-full image-blur-wrapper">
        <img 
          src={category.image} 
          alt={category.name}
          className={cn(
            'h-full w-full object-cover image-blur transition-transform duration-500 group-hover:scale-105',
            imageLoaded ? 'image-blur-loaded' : 'image-blur-loading'
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-medium text-white mb-1">{category.name}</h3>
          <p className="text-sm text-white/80 mb-2">{category.description}</p>
          <div className="text-xs font-medium text-white/70">{category.recipeCount} recipes</div>
        </div>
      </div>
    </Link>
  );
}
