import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from "@/hooks/use-cart";
import SearchModal from './SearchModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems } = useCart();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="bg-black sticky top-0 z-40">
        <nav className="container-custom py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleMenu} className="lg:hidden text-white mr-3 sm:mr-4">
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
            <Link to="/" className="font-montserrat font-bold text-xl sm:text-2xl tracking-tight" aria-label="Flexnex">
              <span className="text-white">Flex</span>
              <span className="text-gold">nex</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gold transition-colors">Home</Link>
            <Link to="/shop" className="text-white hover:text-gold transition-colors">Shop</Link>
            <Link to="/category/sneakers" className="text-white hover:text-gold transition-colors">Sneakers</Link>
            <Link to="/category/watches" className="text-white hover:text-gold transition-colors">Watches</Link>
            <Link to="/category/handbags" className="text-white hover:text-gold transition-colors">Handbags</Link>
            <Link to="/category/glasses" className="text-white hover:text-gold transition-colors">Glasses</Link>
            <Link to="/about" className="text-white hover:text-gold transition-colors">About Us</Link>
            <Link to="/contact" className="text-white hover:text-gold transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-gold" onClick={openSearch}>
              <Search size={20} />
            </Button>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:text-gold">
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black py-4 px-6 absolute w-full animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={toggleMenu} className="text-white hover:text-gold transition-colors">Home</Link>
              <Link to="/shop" onClick={toggleMenu} className="text-white hover:text-gold transition-colors">Shop</Link>
              <Link to="/category/sneakers" onClick={toggleMenu} className="text-white hover:text-gold transition-colors">Sneakers</Link>
              <Link to="/category/watches" onClick={toggleMenu} className="text-white hover:text-gold transition-colors">Watches</Link>
              <Link to="/category/handbags" onClick={toggleMenu} className="text-white hover:text-gold transition-colors">Handbags</Link>
              <Link to="/category/glasses" onClick={toggleMenu} className="text-white hover:text-gold transition-colors">Glasses</Link>
              <Link to="/about" onClick={toggleMenu} className="text-white hover:text-gold transition-colors">About Us</Link>
              <Link to="/contact" onClick={toggleMenu} className="text-white hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default Navbar;
