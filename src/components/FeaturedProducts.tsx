import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCategories, getProducts } from "@/services/api";
import { Product, Category } from "@/types/database";
import { useToast } from "@/hooks/use-toast";

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Get all categories for the tabs
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // Get featured products
        const productsData = await getProducts({ 
          featured: true,
          limit: 8 
        });
        
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        toast({
          title: "Error",
          description: "Failed to load featured products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setIsLoading(true);
        
        if (activeTab === "all") {
          const productsData = await getProducts({ 
            featured: true,
            limit: 8 
          });
          setProducts(productsData);
        } else {
          const productsData = await getProducts({ 
            categorySlug: activeTab,
            featured: true,
            limit: 8
          });
          setProducts(productsData);
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab} products:`, error);
        toast({
          title: "Error",
          description: `Failed to load ${activeTab} products. Please try again later.`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFilteredProducts();
  }, [activeTab, toast]);
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">
            Our most popular premium fashion items, handpicked for quality and style
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto rounded-full"></div>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8 overflow-x-auto">
            <TabsList className="bg-gray-100 p-1 rounded-full">
              <TabsTrigger 
                value="all" 
                className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-gold data-[state=active]:text-black"
              >
                All Products
              </TabsTrigger>
              {categories.slice(0, 3).map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.slug}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-gold data-[state=active]:text-black"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="h-64 md:h-80 bg-gray-100 animate-pulse rounded-xl shadow-lg"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fadeInUp" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard 
                      product={{
                        id: product.id,
                        name: product.name,
                        category: activeTab === "all" 
                          ? categories.find(c => c.id === product.category_id)?.name.toLowerCase() || "" 
                          : activeTab,
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
                <h3 className="font-medium text-xl mb-2">No featured products found</h3>
                <p className="text-gray-600">Check back later for new additions</p>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <Link to="/shop">
                <Button className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-bold">
                  View All Products
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedProducts;
