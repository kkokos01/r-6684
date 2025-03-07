
// Types
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  categories: string[];
  ingredients: string[];
  instructions: string[];
  isFavorite: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  recipeCount: number;
}

export interface MealPlan {
  id: string;
  date: string;
  meals: {
    time: string;
    recipeId: string;
  }[];
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  category: string;
}

// Mock Data
export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a9c9bd6d1735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    description: "Start your day right with these delicious breakfast recipes",
    recipeCount: 12
  },
  {
    id: "cat-2",
    name: "Main Dishes",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    description: "Satisfying main courses for lunch and dinner",
    recipeCount: 24
  },
  {
    id: "cat-3",
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    description: "Sweet treats to satisfy your cravings",
    recipeCount: 18
  },
  {
    id: "cat-4",
    name: "Vegetarian",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    description: "Delicious meat-free recipes",
    recipeCount: 15
  },
  {
    id: "cat-5",
    name: "Quick & Easy",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    description: "Ready in 30 minutes or less",
    recipeCount: 10
  },
  {
    id: "cat-6",
    name: "Baking",
    image: "https://images.unsplash.com/photo-1608830597604-619d8a297f76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    description: "Bread, pastries, and other baked goods",
    recipeCount: 14
  }
];

export const recipes: Recipe[] = [
  {
    id: "rec-1",
    title: "Avocado Toast with Poached Egg",
    description: "A simple yet delicious breakfast that's packed with healthy fats and protein to start your day right.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    prepTime: 10,
    cookTime: 5,
    servings: 1,
    difficulty: "Easy",
    categories: ["cat-1", "cat-4", "cat-5"],
    ingredients: [
      "1 slice of sourdough bread",
      "1/2 avocado",
      "1 egg",
      "1 tbsp white vinegar",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "Fresh herbs like cilantro or parsley (optional)"
    ],
    instructions: [
      "Toast the bread until golden brown.",
      "While the bread is toasting, mash the avocado in a bowl with a fork. Season with salt and pepper.",
      "For the poached egg, bring a pot of water to a simmer. Add vinegar.",
      "Crack an egg into a small cup, then gently slide it into the simmering water.",
      "Cook for 3-4 minutes until the whites are set but the yolk is still runny.",
      "Spread the mashed avocado on the toast.",
      "Use a slotted spoon to remove the poached egg, and place it on top of the avocado.",
      "Season with salt, pepper, and optional red pepper flakes or herbs."
    ],
    isFavorite: true,
    createdAt: "2023-05-15T08:30:00Z"
  },
  {
    id: "rec-2",
    title: "Lemon Herb Roasted Chicken",
    description: "A classic roasted chicken with bright lemon and herb flavors. Perfect for Sunday dinner with the family.",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    prepTime: 20,
    cookTime: 90,
    servings: 4,
    difficulty: "Medium",
    categories: ["cat-2"],
    ingredients: [
      "1 whole chicken (about 4-5 lbs)",
      "2 lemons, 1 zested and juiced, 1 quartered",
      "3 cloves garlic, minced",
      "2 tbsp olive oil",
      "1 tbsp fresh thyme leaves",
      "1 tbsp fresh rosemary, chopped",
      "1 tbsp fresh parsley, chopped",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Pat the chicken dry with paper towels.",
      "In a small bowl, mix together lemon zest, lemon juice, minced garlic, olive oil, and herbs.",
      "Season the chicken cavity generously with salt and pepper, then stuff with the quartered lemon.",
      "Rub the herb mixture all over the chicken, including under the skin where possible.",
      "Truss the chicken with kitchen twine if desired.",
      "Place the chicken breast-side up in a roasting pan.",
      "Roast for 1 hour and 20-30 minutes, or until the juices run clear and the internal temperature reaches 165°F (74°C).",
      "Let the chicken rest for 15 minutes before carving."
    ],
    isFavorite: false,
    createdAt: "2023-06-20T16:45:00Z"
  },
  {
    id: "rec-3",
    title: "Classic Chocolate Chip Cookies",
    description: "The perfect chocolate chip cookie - crisp edges, chewy centers, and loaded with chocolate chips.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: "Easy",
    categories: ["cat-3", "cat-6"],
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup (2 sticks) unsalted butter, room temperature",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups semi-sweet chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a small bowl, mix flour, baking soda, and salt.",
      "In a large bowl, beat butter, granulated sugar, and brown sugar until creamy.",
      "Add eggs one at a time, beating well after each addition, then stir in vanilla.",
      "Gradually beat in flour mixture.",
      "Stir in chocolate chips.",
      "Drop by rounded tablespoons onto ungreased baking sheets.",
      "Bake for 9-11 minutes or until golden brown.",
      "Cool on baking sheets for 2 minutes, then transfer to wire racks to cool completely."
    ],
    isFavorite: true,
    createdAt: "2023-04-10T14:20:00Z"
  },
  {
    id: "rec-4",
    title: "Mediterranean Quinoa Bowl",
    description: "A protein-packed vegetarian bowl with Mediterranean flavors - perfect for a healthy lunch or dinner.",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    categories: ["cat-2", "cat-4", "cat-5"],
    ingredients: [
      "1 cup quinoa, rinsed",
      "2 cups vegetable broth",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, thinly sliced",
      "1/2 cup kalamata olives, pitted and halved",
      "1/2 cup feta cheese, crumbled",
      "2 tbsp extra virgin olive oil",
      "1 tbsp lemon juice",
      "1 clove garlic, minced",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
      "Fresh parsley, chopped, for garnish"
    ],
    instructions: [
      "In a medium saucepan, combine quinoa and vegetable broth. Bring to a boil, then reduce heat to low, cover, and simmer for 15-20 minutes until liquid is absorbed and quinoa is tender.",
      "While quinoa is cooking, prepare the dressing: whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper in a small bowl.",
      "In a large bowl, combine the cooked quinoa, cucumber, cherry tomatoes, red onion, and olives.",
      "Pour the dressing over the salad and toss to combine.",
      "Gently fold in the feta cheese.",
      "Garnish with fresh parsley before serving."
    ],
    isFavorite: true,
    createdAt: "2023-07-05T12:15:00Z"
  },
  {
    id: "rec-5",
    title: "Homemade Margherita Pizza",
    description: "A classic Italian pizza with a thin crust, topped with fresh tomatoes, mozzarella, and basil.",
    image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    prepTime: 30,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    categories: ["cat-2", "cat-6"],
    ingredients: [
      "For the dough:",
      "3 1/2 cups all-purpose flour",
      "1 tsp sugar",
      "2 1/4 tsp active dry yeast",
      "2 tsp salt",
      "1 1/2 cups warm water",
      "2 tbsp olive oil, plus more for the bowl",
      "For the topping:",
      "1 can (28 oz) whole peeled tomatoes, drained and crushed by hand",
      "2 cloves garlic, minced",
      "1 tsp salt",
      "1 lb fresh mozzarella cheese, sliced",
      "Fresh basil leaves",
      "2 tbsp extra virgin olive oil",
      "Salt and pepper to taste"
    ],
    instructions: [
      "For the dough: In a large bowl, combine flour, sugar, yeast, and salt. Add warm water and olive oil. Mix until a dough forms.",
      "Knead the dough on a floured surface for about 5 minutes until smooth and elastic.",
      "Place the dough in an oiled bowl, cover, and let rise in a warm place for 1-2 hours, or until doubled in size.",
      "Preheat your oven to its highest setting (usually 500°F/260°C) with a pizza stone or baking sheet inside.",
      "For the sauce: Mix crushed tomatoes with minced garlic and salt.",
      "Punch down the dough and divide it into 2 equal parts. (You can freeze one portion for later use.)",
      "On a floured surface, stretch or roll one portion into a 12-inch circle.",
      "Transfer the dough to a piece of parchment paper or a floured pizza peel.",
      "Spread the tomato sauce over the dough, leaving a 1-inch border.",
      "Arrange mozzarella slices on top.",
      "Slide the pizza (with the parchment paper if using) onto the preheated stone or baking sheet.",
      "Bake for 10-15 minutes, or until the crust is golden and the cheese is bubbly.",
      "Remove from the oven, top with fresh basil leaves, drizzle with olive oil, and season with salt and pepper.",
      "Let cool slightly before slicing and serving."
    ],
    isFavorite: false,
    createdAt: "2023-03-18T18:30:00Z"
  },
  {
    id: "rec-6",
    title: "Simple Berry Smoothie Bowl",
    description: "A refreshing and nutritious smoothie bowl packed with berries and topped with granola and fresh fruit.",
    image: "https://images.unsplash.com/photo-1622597968117-bb2c861f252d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy",
    categories: ["cat-1", "cat-4", "cat-5"],
    ingredients: [
      "1 cup frozen mixed berries (strawberries, blueberries, raspberries)",
      "1 frozen banana",
      "1/4 cup Greek yogurt",
      "1/4 cup almond milk (or any milk of choice)",
      "1 tbsp honey or maple syrup (optional)",
      "Toppings:",
      "1/4 cup granola",
      "Fresh berries",
      "Sliced banana",
      "1 tbsp chia seeds",
      "1 tbsp almond butter"
    ],
    instructions: [
      "Add frozen berries, frozen banana, Greek yogurt, almond milk, and sweetener (if using) to a blender.",
      "Blend until smooth and creamy. The mixture should be thick enough to eat with a spoon.",
      "If the mixture is too thick, add a little more milk. If it's too thin, add more frozen fruit.",
      "Pour the smoothie into a bowl.",
      "Top with granola, fresh berries, sliced banana, chia seeds, and a drizzle of almond butter.",
      "Serve immediately."
    ],
    isFavorite: true,
    createdAt: "2023-07-30T07:45:00Z"
  }
];

export const mealPlans: MealPlan[] = [
  {
    id: "mp-1",
    date: "2023-08-01",
    meals: [
      {
        time: "Breakfast",
        recipeId: "rec-1"
      },
      {
        time: "Lunch",
        recipeId: "rec-4"
      },
      {
        time: "Dinner",
        recipeId: "rec-2"
      }
    ]
  },
  {
    id: "mp-2",
    date: "2023-08-02",
    meals: [
      {
        time: "Breakfast",
        recipeId: "rec-6"
      },
      {
        time: "Dinner",
        recipeId: "rec-5"
      }
    ]
  }
];

export const shoppingList: ShoppingListItem[] = [
  {
    id: "sl-1",
    name: "Avocados",
    quantity: "2",
    checked: false,
    category: "Produce"
  },
  {
    id: "sl-2",
    name: "Eggs",
    quantity: "1 dozen",
    checked: true,
    category: "Dairy"
  },
  {
    id: "sl-3",
    name: "Sourdough bread",
    quantity: "1 loaf",
    checked: false,
    category: "Bakery"
  },
  {
    id: "sl-4",
    name: "Quinoa",
    quantity: "1 cup",
    checked: false,
    category: "Grains"
  },
  {
    id: "sl-5",
    name: "Feta cheese",
    quantity: "200g",
    checked: true,
    category: "Dairy"
  },
  {
    id: "sl-6",
    name: "Frozen mixed berries",
    quantity: "500g bag",
    checked: false,
    category: "Frozen"
  },
  {
    id: "sl-7",
    name: "Whole chicken",
    quantity: "1 (4-5 lbs)",
    checked: false,
    category: "Meat"
  },
  {
    id: "sl-8",
    name: "Lemons",
    quantity: "3",
    checked: false,
    category: "Produce"
  }
];

// Helper functions
export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(recipe => recipe.id === id);
}

export function getRecipesByCategory(categoryId: string): Recipe[] {
  return recipes.filter(recipe => recipe.categories.includes(categoryId));
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

export function getRecipesBySearch(query: string): Recipe[] {
  const lowercaseQuery = query.toLowerCase();
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowercaseQuery) || 
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowercaseQuery))
  );
}

export function getFavoriteRecipes(): Recipe[] {
  return recipes.filter(recipe => recipe.isFavorite);
}
