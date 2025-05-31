import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const OfferBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-gold to-yellow-500 text-black py-2 sm:py-3 px-4 relative z-50">
      <div className="container-custom flex items-center justify-between">
        <div className="flex-1 pr-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-center">
            <span className="font-bold text-xs sm:text-base">
              🎉 EXCLUSIVE OFFER! 
            </span>
            <span className="text-xs sm:text-base">
              Get <strong>20% OFF</strong> on your first purchase! Code: <strong>FIRST20</strong>
            </span>
            <Link to="/shop" className="mt-1 sm:mt-0">
              <Button 
                size="sm" 
                className="bg-black text-white hover:bg-gray-800 text-xs px-2 sm:px-3 py-1 h-auto"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 ml-2 p-1 hover:bg-black/10 rounded-full transition-colors"
          aria-label="Close offer banner"
        >
          <X size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default OfferBanner; 