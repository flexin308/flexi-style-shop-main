import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black sticky top-0 z-50">
      <nav className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleMenu} className="lg:hidden text-white mr-4">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-gold font-montserrat font-bold text-2xl">
            Flexnex
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
          <Button variant="ghost" size="icon" className="text-white hover:text-gold">
            <Search size={20} />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-white hover:text-gold">
              <ShoppingCart size={20} />
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
  );
};

export default Navbar;
