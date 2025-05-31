
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative bg-black h-[80vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1470&auto=format&fit=crop')" }}
      ></div>
      
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Premium Style.<br/>
            <span className="text-gold">Affordable Flex.</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Discover our collection of high-quality 7AAA/ZR quality replica products.
            Elevate your style without breaking the bank.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop">
              <Button className="bg-gold hover:bg-darkgold text-black px-8 py-6 text-lg">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
