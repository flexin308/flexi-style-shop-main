import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  isBestseller?: boolean;
  isNew?: boolean;
  slug?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const productUrl = product.slug || product.id;
  
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${productUrl}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {product.isBestseller && (
            <Badge className="absolute top-2 left-2 bg-gold text-black font-medium">
              Bestseller
            </Badge>
          )}
          {product.isNew && (
            <Badge className="absolute top-2 right-2 bg-black text-white font-medium">
              New
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
          <p className="font-bold text-lg">₹{product.price.toLocaleString()}</p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
