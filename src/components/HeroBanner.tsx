import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-black h-[85vh] md:h-[90vh] flex items-center overflow-hidden">
      {/* Background Images with Slideshow */}
      {heroImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-60' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-gold/20 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-32 right-32 w-16 h-16 border border-gold/30 rounded-full animate-bounce hidden lg:block" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 right-10 w-8 h-8 bg-gold/20 rounded-full animate-ping hidden md:block" style={{ animationDelay: '1s' }}></div>
      
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-3xl">
          {/* Main heading with enhanced typography */}
          <div className="mb-6 overflow-hidden">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fadeInUp">
              <span className="block">Premium Style.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-gold animate-shimmer">
                Affordable Flex.
              </span>
            </h1>
          </div>
          
          {/* Enhanced description */}
          <div className="mb-8 overflow-hidden">
            <p className="text-lg md:text-xl lg:text-2xl mb-4 text-gray-200 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              Discover our collection of <span className="text-gold font-semibold">premium fashion</span> and style products.
            </p>
            <p className="text-base md:text-lg text-gray-300 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              Elevate your style without breaking the bank. Premium quality, unbeatable prices.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold">50K+</div>
              <div className="text-xs md:text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold">★★★★★</div>
              <div className="text-xs md:text-sm text-gray-400">Quality Grade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold">24/7</div>
              <div className="text-xs md:text-sm text-gray-400">Support</div>
            </div>
          </div>
          
          {/* Enhanced buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
            <Link to="/shop" className="group">
              <Button className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black px-8 py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-gold/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Shop Now
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-2 border-white/50 text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105">
                Learn More
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-6 animate-fadeInUp" style={{ animationDelay: '1.1s' }}>
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free Shipping
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cash on Delivery
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              7-Day Returns
            </div>
          </div>
        </div>
      </div>
      
      {/* Slideshow indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-gold scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-sm mb-2">Scroll</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
