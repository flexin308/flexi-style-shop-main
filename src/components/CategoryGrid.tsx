import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/api";
import { Category } from "@/types/database";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-64 md:h-80 bg-gray-200 animate-pulse rounded-xl shadow-lg"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link 
                to={`/category/${category.slug}`} 
                key={category.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 md:h-80">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-500"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -top-24 -left-24 w-24 h-full bg-gradient-to-br from-white/30 to-transparent rotate-45 transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                    <div className="transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{category.name}</h3>
                      <p className="text-xs md:text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {category.description}
                      </p>
                      <div className="mt-2 md:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                        <span className="inline-flex items-center text-gold text-xs md:text-sm font-medium">
                          Explore Collection
                          <svg className="ml-1 w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Border glow */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/50 rounded-xl transition-all duration-500"></div>
                </div>
              </Link>
            ))}
          </div>
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
