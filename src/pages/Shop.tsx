import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import FloatingButtons from "@/components/FloatingButtons";
import { getCategories, getProducts } from "@/services/api";
import { Category, Product } from "@/types/database";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch categories and products on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Get all categories
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // Get all products
        const productsData = await getProducts();
        setAllProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching shop data:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Filter products based on selected criteria
  const applyFilters = () => {
    let filtered = [...allProducts];
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        product => categories.find(cat => cat.id === product.category_id)?.slug.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-black text-white py-12 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="max-w-2xl mx-auto text-gray-300">
            Browse our collection of premium quality replicas, crafted to perfection and designed to impress.
          </p>
        </div>
        
        <div className="container-custom py-8">
          {/* Mobile filter button */}
          <div className="md:hidden mb-4">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64`}>
              <div className="bg-gray-50 p-4 rounded-lg sticky top-24">
                <h3 className="font-bold text-lg mb-4">Filters</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="category-All"
                        checked={selectedCategory === "All"}
                        onCheckedChange={() => setSelectedCategory("All")}
                      />
                      <Label 
                        htmlFor="category-All"
                        className="ml-2 text-sm font-medium cursor-pointer"
                      >
                        All
                      </Label>
                    </div>
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox 
                          id={`category-${category.slug}`}
                          checked={selectedCategory === category.slug}
                          onCheckedChange={() => setSelectedCategory(category.slug)}
                        />
                        <Label 
                          htmlFor={`category-${category.slug}`}
                          className="ml-2 text-sm font-medium cursor-pointer"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    defaultValue={[0, 20000]}
                    max={20000}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gold hover:bg-darkgold text-black"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="flex-1">
              <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <p className="text-gray-600 mb-4 md:mb-0">
                  Showing {filteredProducts.length} products
                </p>
                <select 
                  className="border border-gray-300 rounded p-2 w-full md:w-auto"
                  defaultValue="featured"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="h-64 md:h-80 bg-gray-100 animate-pulse rounded-xl shadow-lg"></div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id}
                      className="animate-fadeInUp" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard 
                        product={{
                          id: product.id,
                          name: product.name,
                          category: categories.find(cat => cat.id === product.category_id)?.name.toLowerCase() || "",
                          price: product.price,
                          image: product.images[0],
                          isBestseller: product.is_bestseller,
                          isNew: product.is_new,
                          slug: product.slug
                        }} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4H7" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-xl mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or browse all categories</p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory("All");
                      setPriceRange([0, 20000]);
                      applyFilters();
                    }}
                    className="bg-gold hover:bg-darkgold text-black"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Shop;
