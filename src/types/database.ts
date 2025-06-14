export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  price: number;
  description: string | null;
  features: any | null;
  images: string[];
  is_bestseller: boolean;
  is_new: boolean;
  in_stock: boolean;
  gender: 'men' | 'women' | 'unisex';
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total_amount: number;
  status: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
}
