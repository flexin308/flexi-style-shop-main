import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FloatingButtons from "@/components/FloatingButtons";
import { getCategory, getProducts } from "@/services/api";
import { Category, Product } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const productsPerPage = 16; // 4x4 grid
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categoryId) return;
      
      try {
        setIsLoading(true);
        
        // Get category info
        console.log('Fetching category data for:', categoryId);
        const categoryData = await getCategory(categoryId);
        console.log('Category data received:', categoryData);
        setCategory(categoryData);
        
        // Get category products
        console.log('Fetching products for category:', categoryId);
        const productsData = await getProducts({ categorySlug: categoryId });
        console.log('Products data received:', productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching category data:", error);
        toast({
          title: "Error Loading Category",
          description: `Failed to load "${categoryId}" category. Please try again or contact support.`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [categoryId, toast]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Format the category name (capitalize first letter)
  const formattedCategoryName = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) 
    : '';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Category Hero */}
        {isLoading ? (
          <div className="relative h-[40vh] bg-gray-200 animate-pulse"></div>
        ) : (
          <div className="relative h-[40vh] flex items-center">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${category?.image || ''})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>
            
            <div className="container-custom relative z-10 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {category?.name || formattedCategoryName}
              </h1>
              <p className="text-gray-200 max-w-2xl">{category?.description}</p>
              {products.length > 0 && (
                <p className="text-gray-300 mt-2">
                  {products.length} {products.length === 1 ? 'product' : 'products'} available
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Product grid */}
        <div id="products-section" className="container-custom py-12">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(16)].map((_, index) => (
                <div key={index} className="h-64 md:h-80 bg-gray-100 animate-pulse rounded-xl shadow-lg"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {currentProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="animate-fadeInUp" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard 
                      product={{
                        id: product.id,
                        name: product.name,
                        category: categoryId || '',
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border-gold text-gold hover:bg-gold hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </Button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 ${
                          currentPage === page
                            ? "bg-gold text-black hover:bg-yellow-500"
                            : "border-gold text-gold hover:bg-gold hover:text-black"
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border-gold text-gold hover:bg-gold hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              )}

              {/* Page info */}
              {totalPages > 1 && (
                <div className="text-center mt-4">
                  <p className="text-gray-600 text-sm">
                    Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, products.length)} of {products.length} products
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4H7" />
                </svg>
              </div>
              <h3 className="font-medium text-xl mb-2">No products found in this category</h3>
              <p className="text-gray-600 mb-4">We're working on adding more products to "{formattedCategoryName}"</p>
              <Link to="/shop" className="text-gold hover:underline font-medium">
                Browse All Products →
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default CategoryPage;
