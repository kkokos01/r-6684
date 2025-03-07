
import React, { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Recipe, MealPlan, getRecipeById } from '@/lib/data';
import { Link } from 'react-router-dom';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';

interface MealCalendarProps {
  recipes: Recipe[];
  mealPlans: MealPlan[];
  onAddMeal: (date: string, time: string, recipeId: string) => void;
  onRemoveMeal: (date: string, time: string) => void;
  className?: string;
}

const mealTimes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export function MealCalendar({ 
  recipes, 
  mealPlans, 
  onAddMeal, 
  onRemoveMeal, 
  className 
}: MealCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
  
  const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  
  const getMealsForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const plan = mealPlans.find(p => p.date === dateString);
    return plan?.meals || [];
  };
  
  const handlePrevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };
  
  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };
  
  return (
    <div className={cn('bg-card rounded-lg border border-muted/50', className)}>
      <div className="flex items-center justify-between p-4 border-b border-muted/50">
        <Button variant="ghost" size="icon" onClick={handlePrevWeek}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <h3 className="text-lg font-medium">
          {format(startDate, 'MMMM d')} - {format(addDays(startDate, 6), 'MMMM d, yyyy')}
        </h3>
        
        <Button variant="ghost" size="icon" onClick={handleNextWeek}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-8 border-b border-muted/50">
        <div className="border-r border-muted/50 p-3">
          <div className="h-8" /> {/* Empty header cell */}
        </div>
        
        {days.map((day) => (
          <div 
            key={day.toString()} 
            className={cn(
              'p-3 text-center border-r border-muted/50 last:border-r-0',
              isSameDay(day, new Date()) && 'bg-secondary/50'
            )}
          >
            <p className="text-sm font-medium">{format(day, 'EEE')}</p>
            <p className="text-xs text-muted-foreground">{format(day, 'd')}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-8">
        {mealTimes.map((mealTime) => (
          <React.Fragment key={mealTime}>
            <div className="p-3 border-r border-b border-muted/50 flex items-center">
              <span className="text-sm font-medium">{mealTime}</span>
            </div>
            
            {days.map((day) => {
              const dateString = format(day, 'yyyy-MM-dd');
              const mealsForDay = getMealsForDate(day);
              const meal = mealsForDay.find(m => m.time === mealTime);
              const recipe = meal ? getRecipeById(meal.recipeId) : undefined;
              
              return (
                <div 
                  key={`${dateString}-${mealTime}`}
                  className={cn(
                    'p-2 min-h-[80px] border-r border-b border-muted/50 last:border-r-0',
                    isSameDay(day, new Date()) && 'bg-secondary/50'
                  )}
                >
                  {recipe ? (
                    <div className="h-full rounded border border-muted p-2 bg-card hover:bg-muted/50 transition-colors">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="block text-sm font-medium hover:text-accent transition-colors mb-1 line-clamp-2"
                      >
                        {recipe.title}
                      </Link>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-muted-foreground">
                          {recipe.prepTime + recipe.cookTime} min
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onRemoveMeal(dateString, mealTime)}
                        >
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full h-full justify-center border border-dashed border-muted hover:border-muted-foreground transition-colors text-muted-foreground"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          <span className="text-xs">Add</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent 
                        className="w-[200px] p-0 pointer-events-auto" 
                        align="start"
                        side="right"
                      >
                        <Command>
                          <CommandGroup heading="Select Recipe">
                            {recipes.map((recipe) => (
                              <CommandItem
                                key={recipe.id}
                                onSelect={() => onAddMeal(dateString, mealTime, recipe.id)}
                              >
                                <span className="text-sm">{recipe.title}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
