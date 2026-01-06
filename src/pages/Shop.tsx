import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, X } from "lucide-react";
import FloatingButtons from "@/components/FloatingButtons";
import { getCategories, getProducts } from "@/services/api";
import { Category, Product } from "@/types/database";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"featured" | "price-low" | "price-high" | "newest">("featured");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const productsPerPage = 16; // 4x4 grid
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  
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
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategorySlug) {
      filtered = filtered.filter(
        product => categories.find(cat => cat.id === product.category_id)?.slug.toLowerCase() === selectedCategorySlug.toLowerCase()
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortOption === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => {
        const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bTime - aTime;
      });
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Auto-apply filters
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategorySlug, priceRange, sortOption, allProducts, categories]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSelectedCategorySlug(null);
    setPriceRange([0, 20000]);
    setSearchQuery("");
    setSortOption("featured");
    setFilteredProducts(allProducts);
    setCurrentPage(1);
  };

  const activeCategory = selectedCategorySlug
    ? categories.find((c) => c.slug.toLowerCase() === selectedCategorySlug.toLowerCase())
    : null;

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    Boolean(selectedCategorySlug) ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 20000;

  const FiltersContent = (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="font-semibold">Category</div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={selectedCategorySlug ? "outline" : "default"}
            className="rounded-full"
            onClick={() => setSelectedCategorySlug(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              type="button"
              variant={selectedCategorySlug?.toLowerCase() === category.slug.toLowerCase() ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategorySlug(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="font-semibold">Price</div>
        <Slider
          defaultValue={[0, 20000]}
          max={20000}
          step={500}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-semibold">Sort</div>
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-black text-white py-12 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="max-w-2xl mx-auto text-gray-300">
            Browse our collection of premium fashion and accessories, crafted to perfection and designed to impress.
          </p>
        </div>
        
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Products grid */}
            <div id="products-section" className="flex-1">
              <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="md:hidden w-full">
                          <SlidersHorizontal className="w-4 h-4 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="max-h-[85vh] overflow-auto">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">{FiltersContent}</div>
                        <SheetFooter className="mt-6">
                          <SheetClose asChild>
                            <Button variant="outline" onClick={clearAllFilters}>
                              Clear all
                            </Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button className="bg-gold hover:bg-darkgold text-black">Done</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>

                    <div className="hidden md:flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="rounded-full">
                            {activeCategory ? activeCategory.name : "Category"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-[420px]">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold">Category</div>
                            {selectedCategorySlug && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => setSelectedCategorySlug(null)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Clear
                              </Button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              variant={selectedCategorySlug ? "outline" : "default"}
                              className="rounded-full"
                              onClick={() => setSelectedCategorySlug(null)}
                            >
                              All
                            </Button>
                            {categories.map((category) => (
                              <Button
                                key={category.id}
                                type="button"
                                variant={
                                  selectedCategorySlug?.toLowerCase() === category.slug.toLowerCase() ? "default" : "outline"
                                }
                                className="rounded-full"
                                onClick={() => setSelectedCategorySlug(category.slug)}
                              >
                                {category.name}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="rounded-full">
                            Price
                            <span className="ml-2 text-gray-500 font-normal">
                              ₹{priceRange[0].toLocaleString()}–₹{priceRange[1].toLocaleString()}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-[420px]">
                          <div className="font-semibold mb-3">Price</div>
                          <Slider
                            defaultValue={[0, 20000]}
                            max={20000}
                            step={500}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="mb-4"
                          />
                          <div className="flex items-center justify-between text-sm text-gray-700">
                            <span>₹{priceRange[0].toLocaleString()}</span>
                            <span>₹{priceRange[1].toLocaleString()}</span>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <select
                        className="border border-gray-300 rounded-full px-3 py-2"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest</option>
                      </select>

                      {hasActiveFilters && (
                        <Button variant="ghost" className="text-gray-600" onClick={clearAllFilters}>
                          Clear all
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-gray-700">
                    <span className="font-medium">{filteredProducts.length}</span> products
                    {searchQuery.trim() && <span className="text-gold ml-2">“{searchQuery.trim()}”</span>}
                  </div>

                  <div className={cn("flex flex-wrap gap-2", !hasActiveFilters && "hidden")}>
                    {activeCategory && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setSelectedCategorySlug(null)}
                      >
                        {activeCategory.name}
                        <X className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    {(priceRange[0] !== 0 || priceRange[1] !== 20000) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setPriceRange([0, 20000])}
                      >
                        ₹{priceRange[0].toLocaleString()}–₹{priceRange[1].toLocaleString()}
                        <X className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(16)].map((_, index) => (
                    <div key={index} className="h-64 md:h-80 bg-gray-100 animate-pulse rounded-xl shadow-lg"></div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
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
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4H7" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-xl mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery 
                      ? `No products found for "${searchQuery}". Try different keywords or adjust your filters.`
                      : "Try adjusting your filters or browse all categories"
                    }
                  </p>
                  <Button 
                    onClick={clearAllFilters}
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
