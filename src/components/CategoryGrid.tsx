import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/api";
import { Category } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  
  const categoriesPerPage = 16; // 4x4 grid
  const totalPages = Math.ceil(categories.length / categoriesPerPage);
  const startIndex = (currentPage - 1) * categoriesPerPage;
  const currentCategories = categories.slice(startIndex, startIndex + categoriesPerPage);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of category section
    document.getElementById('category-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="category-grid" className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Shop By Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">
            Browse our premium collection of fashion and accessories, curated for style and quality
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto rounded-full"></div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(16)].map((_, index) => (
              <div key={index} className="h-64 md:h-80 bg-gray-200 animate-pulse rounded-xl shadow-lg"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {currentCategories.map((category, index) => (
                <Link 
                  to={`/category/${category.slug}`} 
                  key={category.id}
                  className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 md:h-80">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${category.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-colors duration-300 group-hover:from-black/80"></div>

                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white">
                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-lg md:text-xl font-semibold leading-tight truncate">{category.name}</h3>
                          <p className="hidden md:block text-sm text-gray-200 mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {category.description}
                          </p>
                        </div>
                        <div className="shrink-0">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
                  Showing {startIndex + 1}-{Math.min(startIndex + categoriesPerPage, categories.length)} of {categories.length} categories
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Call to action */}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              View All Categories
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
