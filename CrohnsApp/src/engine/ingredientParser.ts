/**
 * Ingredient Parser — Splits ingredient text into normalized individual ingredients.
 * Handles commas, parenthetical sub-ingredients, and/or, percentages, allergen statements.
 */

/**
 * Parse a raw ingredients string into an array of normalized ingredient names.
 */
export function parseIngredients(raw: string): string[] {
  if (!raw || raw.trim() === '') return [];

  let text = raw;

  // Remove "Contains: ..." allergen statements at the end
  text = text.replace(/\.\s*contains\s*:.*$/i, '');
  text = text.replace(/\.\s*may contain\s*:.*$/i, '');

  // Replace parenthetical sub-ingredients with their contents
  // e.g., "chocolate chips (sugar, cocoa)" → "chocolate chips, sugar, cocoa"
  text = text.replace(/\(([^)]+)\)/g, ', $1');

  // Replace brackets similarly
  text = text.replace(/\[([^\]]+)\]/g, ', $1');

  // Handle "and/or" → treat both as present
  text = text.replace(/\band\/or\b/gi, ',');

  // Split on commas, semicolons, periods
  const parts = text.split(/[,;.]+/);

  const ingredients: string[] = [];

  for (const part of parts) {
    let cleaned = part
      .toLowerCase()
      .trim()
      // Remove percentages: "milk (45%)" → "milk"
      .replace(/\d+\.?\d*\s*%/g, '')
      // Remove leading/trailing special chars
      .replace(/^[\s*•–-]+|[\s*•–-]+$/g, '')
      // Collapse whitespace
      .replace(/\s+/g, ' ')
      .trim();

    // Skip empty, very short (likely artifacts), or pure numbers
    if (cleaned.length < 2 || /^\d+$/.test(cleaned)) continue;

    // Skip common non-ingredient text
    if (/^(contains|may contain|ingredients|less than)$/i.test(cleaned))
      continue;

    // Handle "less than 2% of:" prefix
    cleaned = cleaned.replace(/^less than \d+\s*%\s*(of\s*)?:?\s*/i, '');
    if (cleaned.length < 2) continue;

    ingredients.push(cleaned);
  }

  return ingredients;
}
