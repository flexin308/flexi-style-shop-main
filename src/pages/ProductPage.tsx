import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { getProduct, getProductReviews, getRelatedProducts } from "@/services/api";
import { Product, Review } from "@/types/database";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;
      
      try {
        setIsLoading(true);
        
        // Get product data
        const productData = await getProduct(productId);
        
        if (!productData) {
          return; // Will show Not Found UI
        }
        
        setProduct(productData);
        setMainImage(productData.images[0]);
        
        // Get product reviews
        const reviewsData = await getProductReviews(productData.id);
        setReviews(reviewsData);
        
        // Get related products
        const relatedData = await getRelatedProducts(productData.id, productData.category_id);
        setRelatedProducts(relatedData);
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast({
          title: "Error",
          description: "Failed to load product data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductData();
  }, [productId, toast]);
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const openWhatsApp = () => {
    if (!product) return;
    
    // Format the message with detailed product information
    const message = `Hi! I'm interested in purchasing the following product from Flexnex:

🛍️ Product: ${product.name}
💰 Price: ₹${product.price.toLocaleString()}
📦 Quantity: ${quantity}
💵 Total: ₹${(product.price * quantity).toLocaleString()}

Could you please provide more information about availability and delivery details?

Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    
    // Updated WhatsApp number as requested
    window.open(`https://wa.me/918291821901?text=${encodedMessage}`, "_blank");
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} x ${quantity} has been added to your cart.`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container-custom py-4 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div className="h-80 md:h-96 bg-gray-100 animate-pulse rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 md:h-10 bg-gray-100 animate-pulse rounded w-3/4"></div>
              <div className="h-5 md:h-6 bg-gray-100 animate-pulse rounded w-1/4"></div>
              <div className="h-3 md:h-4 bg-gray-100 animate-pulse rounded w-full"></div>
              <div className="h-3 md:h-4 bg-gray-100 animate-pulse rounded w-full"></div>
              <div className="h-3 md:h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container-custom py-12 text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6 text-sm md:text-base">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/shop">Continue Shopping</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Parse features from JSONB if available
  const features = product.features 
    ? Array.isArray(product.features) 
      ? product.features 
      : typeof product.features === 'object' 
        ? Object.values(product.features)
        : ["Premium quality product"]
    : ["Premium quality product"];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pb-20 md:pb-0">
        <div className="container-custom py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Product Images - Mobile Optimized */}
            <div className="order-1">
              <div className="mb-3 md:mb-4 aspect-square overflow-hidden rounded-lg md:rounded-xl shadow-lg">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Mobile: Horizontal scroll for images */}
              <div className="flex md:grid md:grid-cols-4 gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 md:w-auto md:h-auto md:aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                      mainImage === image ? "border-gold" : "border-transparent"
                    }`}
                    onClick={() => setMainImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Details - Mobile Optimized */}
            <div className="order-2 px-2 md:px-0">
              <h1 className="text-xl md:text-3xl font-bold mb-2 leading-tight">{product.name}</h1>
              <p className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-gold">₹{product.price.toLocaleString()}</p>
              
              <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
                <Badge className="bg-gold text-black text-xs md:text-sm">Premium Quality</Badge>
                {product.is_bestseller && <Badge className="bg-gold text-black text-xs md:text-sm">Bestseller</Badge>}
                {product.is_new && <Badge className="bg-black text-white text-xs md:text-sm">New</Badge>}
              </div>
              
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">{product.description}</p>
              
              <div className="mb-4 md:mb-6">
                <h3 className="font-semibold mb-2 text-sm md:text-base">Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm md:text-base">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {/* Quantity Selector - Mobile Optimized */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center mb-4">
                  <span className="mr-4 text-sm md:text-base font-medium">Quantity:</span>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 md:h-10 md:w-10 text-lg font-bold"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="px-3 md:px-4 font-medium text-sm md:text-base min-w-[2rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 md:h-10 md:w-10 text-lg font-bold"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Desktop Buttons */}
              <div className="hidden md:flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="bg-gold hover:bg-darkgold text-black px-8 py-6 flex-1 font-bold"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 flex-1 font-bold"
                  onClick={openWhatsApp}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Buy on WhatsApp
                </Button>
              </div>
              
              {/* Trust Indicators - Mobile Optimized */}
              <div className="text-xs md:text-sm text-gray-600 space-y-1 md:space-y-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free Shipping on Orders Above ₹5000
                </div>
              </div>
            </div>
          </div>
          
          {/* Product tabs - Mobile Optimized */}
          <div className="mt-8 md:mt-12">
            <Tabs defaultValue="specifications">
              <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 h-auto">
                <TabsTrigger value="specifications" className="text-xs md:text-sm py-2 md:py-3">Specifications</TabsTrigger>
                <TabsTrigger value="shipping" className="text-xs md:text-sm py-2 md:py-3">Shipping</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs md:text-sm py-2 md:py-3">Reviews ({reviews.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="p-4 md:p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg md:text-xl font-bold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="border-b pb-2">
                    <span className="font-medium text-sm md:text-base">Category: </span>
                    <span className="text-gray-700 capitalize text-sm md:text-base">{product.category_id}</span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium text-sm md:text-base">Material: </span>
                    <span className="text-gray-700 text-sm md:text-base">Premium Quality</span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium text-sm md:text-base">Availability: </span>
                    <span className="text-gray-700 text-sm md:text-base">{product.in_stock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="p-4 md:p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg md:text-xl font-bold mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm md:text-base">Shipping</h4>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      We offer nationwide shipping within India. Standard delivery takes 3-7 business days. 
                      Orders above ₹5000 qualify for free shipping.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm md:text-base">Returns</h4>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      Contact us via WhatsApp to initiate a return for any issues with your order.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-4 md:p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg md:text-xl font-bold mb-4">Customer Reviews</h3>
                
                {reviews.length > 0 ? (
                  <div className="space-y-4 md:space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="14" 
                              height="14" 
                              viewBox="0 0 24 24" 
                              fill={i < review.rating ? "#D4AF37" : "none"}
                              stroke={i < review.rating ? "#D4AF37" : "#6b7280"}
                              strokeWidth="2"
                              className="mr-1"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                        </div>
                        
                        <p className="mb-2 text-gray-700 text-sm md:text-base">{review.comment}</p>
                        
                        <div className="flex justify-between text-xs md:text-sm text-gray-500">
                          <span>{review.name}</span>
                          <span>{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 text-sm md:text-base">No reviews yet. Be the first to review this product!</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products - Mobile Optimized */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 md:mt-16">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">You May Also Like</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <div 
                    key={relatedProduct.id}
                    className="animate-fadeInUp" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard 
                      product={{
                        id: relatedProduct.id,
                        name: relatedProduct.name,
                        category: "",
                        price: relatedProduct.price,
                        image: relatedProduct.images[0],
                        isBestseller: relatedProduct.is_bestseller,
                        isNew: relatedProduct.is_new,
                        slug: relatedProduct.slug
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
        <div className="flex gap-3">
          <Button 
            className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-3 flex-1 font-bold text-sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 flex-1 font-bold text-sm flex items-center justify-center"
            onClick={openWhatsApp}
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Buy Now
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
