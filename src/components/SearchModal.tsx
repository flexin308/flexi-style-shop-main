import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';
import { getProducts } from '@/services/api';
import { Product } from '@/types/database';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load all products when modal opens
  useEffect(() => {
    if (isOpen && allProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          setIsLoading(true);
          const products = await getProducts();
          setAllProducts(products);
        } catch (error) {
          console.error('Error fetching products for search:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProducts();
    }
  }, [isOpen, allProducts.length]);

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    ).slice(0, 8); // Limit to 8 results

    setSearchResults(filtered);
  }, [searchQuery, allProducts]);

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  const handleProductClick = () => {
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Search Products</span>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
              autoFocus
            />
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery.trim() && searchResults.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm">Try searching with different keywords</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug || product.id}`}
                    onClick={handleProductClick}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {product.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold text-gold">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : !searchQuery.trim() ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium">Start typing to search</p>
                <p className="text-sm">Search through our collection of premium products</p>
              </div>
            ) : null}
          </div>

          {/* Quick Actions */}
          {!searchQuery.trim() && (
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/shop"
                  onClick={handleClose}
                  className="p-3 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium">All Products</span>
                </Link>
                <Link
                  to="/category/sneakers"
                  onClick={handleClose}
                  className="p-3 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium">Sneakers</span>
                </Link>
                <Link
                  to="/category/watches"
                  onClick={handleClose}
                  className="p-3 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium">Watches</span>
                </Link>
                <Link
                  to="/category/handbags"
                  onClick={handleClose}
                  className="p-3 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium">Handbags</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal; 