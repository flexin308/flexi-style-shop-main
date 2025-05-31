import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useToast } from "@/hooks/use-toast";
import { getProduct, getProductReviews, getRelatedProducts } from "@/services/api";
import { Product, Review } from "@/types/database";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  
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
    
    toast({
      title: "Added to cart",
      description: `${product.name} x ${quantity} has been added to your cart.`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-100 animate-pulse rounded w-3/4"></div>
              <div className="h-6 bg-gray-100 animate-pulse rounded w-1/4"></div>
              <div className="h-4 bg-gray-100 animate-pulse rounded w-full"></div>
              <div className="h-4 bg-gray-100 animate-pulse rounded w-full"></div>
              <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
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
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
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
        : ["7AAA/ZR quality replica"]
    : ["7AAA/ZR quality replica"];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
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
            
            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl font-medium mb-4">₹{product.price.toLocaleString()}</p>
              
              <div className="flex items-center mb-6">
                <Badge className="bg-gold text-black mr-2">7AAA/ZR Quality</Badge>
                {product.is_bestseller && <Badge className="bg-gold text-black mr-2">Bestseller</Badge>}
                {product.is_new && <Badge className="bg-black text-white">New</Badge>}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="mr-4">Quantity:</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="bg-gold hover:bg-darkgold text-black px-8 py-6 flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 flex-1"
                  onClick={openWhatsApp}
                >
                  Buy on WhatsApp
                </Button>
              </div>
              
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Cash on Delivery Available</p>
                <p>• Free Shipping on Orders Above ₹5000</p>
                <p>• 7-Day Return Policy</p>
              </div>
            </div>
          </div>
          
          {/* Product tabs */}
          <div className="mt-12">
            <Tabs defaultValue="specifications">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-b pb-2">
                    <span className="font-medium">Category: </span>
                    <span className="text-gray-700 capitalize">{product.category_id}</span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Material: </span>
                    <span className="text-gray-700">Premium Quality</span>
                  </div>
                  <div className="border-b pb-2">
                    <span className="font-medium">Availability: </span>
                    <span className="text-gray-700">{product.in_stock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Shipping</h4>
                    <p className="text-gray-700">
                      We offer nationwide shipping within India. Standard delivery takes 3-7 business days. 
                      Orders above ₹5000 qualify for free shipping.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cash on Delivery</h4>
                    <p className="text-gray-700">
                      Cash on Delivery is available for most pin codes across India. You can pay when your package arrives.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Returns</h4>
                    <p className="text-gray-700">
                      We offer a 7-day return policy for unused items in their original packaging. 
                      Contact us via WhatsApp to initiate a return.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
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
                        
                        <p className="mb-2 text-gray-700">{review.comment}</p>
                        
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{review.name}</span>
                          <span>{new Date(review.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">No reviews yet. Be the first to review this product!</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard 
                    key={relatedProduct.id} 
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
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default ProductPage;
