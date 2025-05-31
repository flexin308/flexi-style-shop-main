
import { supabase } from "@/integrations/supabase/client";
import { Category, Product, Review } from "@/types/database";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data || [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
    console.error('Error fetching category:', error);
    throw error;
  }
  
  return data;
}

export async function getProducts(options: { 
  categorySlug?: string, 
  featured?: boolean,
  limit?: number
} = {}): Promise<Product[]> {
  let query = supabase.from('products').select('*');
  
  if (options.categorySlug) {
    // Join with categories to filter by category slug
    query = supabase
      .from('products')
      .select('*, categories!inner(*)')
      .eq('categories.slug', options.categorySlug);
  }
  
  if (options.featured) {
    // For featured products, get bestsellers and new items
    query = query.or('is_bestseller.eq.true,is_new.eq.true');
  }
  
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  
  // If we did a join, the products are nested with categories data
  // We need to clean that up
  if (options.categorySlug && data) {
    return data.map(item => {
      const { categories, ...product } = item as any;
      return product as Product;
    });
  }
  
  return data || [];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching product:', error);
    throw error;
  }
  
  return data;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId);
  
  if (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
  
  return data || [];
}

export async function getRelatedProducts(productId: string, categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .neq('id', productId)
    .limit(4);
  
  if (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }
  
  return data || [];
}
