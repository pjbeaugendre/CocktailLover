export const getMeasures = (cocktail) => {
  const measures = [];

  for (let i = 1; i < 16; i++) {
    if (cocktail[`strMeasure${i}`]) {
      measures.push(cocktail[`strMeasure${i}`]);
    } else {
      break;
    }
  }

  return measures;
}