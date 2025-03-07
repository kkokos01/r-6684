
export interface ModifierOption {
  id: string;
  label: string;
  description: string;
}

export const modifierOptions: ModifierOption[] = [
  { id: 'healthier', label: 'Healthier', description: 'Lower calories, more nutrients' },
  { id: 'vegetarian', label: 'Vegetarian', description: 'No meat ingredients' },
  { id: 'vegan', label: 'Vegan', description: 'No animal products' },
  { id: 'keto', label: 'Keto', description: 'Low-carb, high-fat' },
  { id: 'glutenFree', label: 'Gluten-Free', description: 'No gluten ingredients' },
  { id: 'dairyFree', label: 'Dairy-Free', description: 'No dairy ingredients' },
  { id: 'quickMeal', label: 'Quick Meal', description: 'Faster preparation time' },
  { id: 'budgetFriendly', label: 'Budget-Friendly', description: 'Less expensive ingredients' },
];
