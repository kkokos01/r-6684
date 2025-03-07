
import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { recipes } from '@/lib/data';

const MealPlanner = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Calendar className="h-6 w-6 mr-3" />
        <h1 className="text-3xl font-medium">Meal Planner</h1>
      </div>
      
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-medium">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The meal planning feature is currently under development. 
          Check back soon to plan your weekly meals with your favorite recipes!
        </p>
      </div>
    </div>
  );
};

export default MealPlanner;
