/**
 * Open Food Facts API client.
 * Free, no API key required.
 * Returns product name, ingredients, nutrition for a barcode.
 */

export interface OpenFoodFactsProduct {
  product_name: string;
  brands: string;
  ingredients_text: string;
  serving_size: string;
  nutriments: {
    fat_100g?: number;
    'saturated-fat_100g'?: number;
    fiber_100g?: number;
    proteins_100g?: number;
    sugars_100g?: number;
    sodium_100g?: number;
    'energy-kcal_100g'?: number;
    calcium_100g?: number;
    iron_100g?: number;
    'vitamin-b12_100g'?: number;
    'vitamin-d_100g'?: number;
    zinc_100g?: number;
  };
  serving_quantity?: number;
  allergens_tags?: string[];
  image_url?: string;
  nutriscore_grade?: string;
}

export interface ProductLookupResult {
  found: boolean;
  product?: OpenFoodFactsProduct;
  error?: string;
}

/**
 * Look up a product by barcode from Open Food Facts.
 */
export async function lookupBarcode(
  barcode: string
): Promise<ProductLookupResult> {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
      {
        headers: {
          'User-Agent': 'CrohnsApp/1.0 (seanleblanc2889@gmail.com)',
        },
      }
    );

    if (!response.ok) {
      return { found: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();

    if (data.status !== 1 || !data.product) {
      return { found: false, error: 'Product not found in database' };
    }

    const p = data.product;
    return {
      found: true,
      product: {
        product_name: p.product_name || p.product_name_en || 'Unknown Product',
        brands: p.brands || '',
        ingredients_text:
          p.ingredients_text || p.ingredients_text_en || '',
        serving_size: p.serving_size || '',
        serving_quantity: p.serving_quantity,
        nutriments: p.nutriments || {},
        allergens_tags: p.allergens_tags || [],
        image_url: p.image_url || p.image_front_url || '',
        nutriscore_grade: p.nutriscore_grade,
      },
    };
  } catch (err: any) {
    return {
      found: false,
      error: err.message || 'Network error — check your connection',
    };
  }
}
