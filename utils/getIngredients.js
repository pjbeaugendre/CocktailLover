export const getIngredients = (cocktail) => {
  const ingredients = [];

  for (let i = 1; i < 16; i++) {
    if (cocktail[`strIngredient${i}`]) {
      ingredients.push(cocktail[`strIngredient${i}`]);
    } else {
      break;
    }
  }

  return ingredients;
}