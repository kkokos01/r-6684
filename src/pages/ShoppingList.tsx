
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const ShoppingList = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <ShoppingCart className="h-6 w-6 mr-3" />
        <h1 className="text-3xl font-medium">Shopping List</h1>
      </div>
      
      <div className="text-center py-16 space-y-4">
        <h2 className="text-2xl font-medium">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The shopping list feature is currently under development.
          Check back soon to generate shopping lists from your favorite recipes!
        </p>
      </div>
    </div>
  );
};

export default ShoppingList;
