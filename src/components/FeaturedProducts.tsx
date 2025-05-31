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
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most popular 7AAA/ZR quality replicas, handpicked for quality and style
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8 overflow-x-auto">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all">All Products</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.slug}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="font-medium text-xl mb-2">No featured products found</h3>
                <p className="text-gray-600">Check back later for new additions</p>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <Link to="/shop">
                <Button className="bg-black hover:bg-gray-800 text-white px-8 py-6">
                  View All Products
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
