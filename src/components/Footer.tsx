import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container-custom pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" aria-label="Flexnex">
              <span className="text-white">Flex</span>
              <span className="text-gold">nex</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-xs">
              Your destination for premium fashion and accessories. Quality that speaks, prices that don't break the bank.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.219 0 .359.16.359.399 0 .259-.166.619-.359.96-.219.359-.219.78-.219 1.141 0 .78.599 1.439 1.406 1.439 1.687 0 2.987-1.78 2.987-4.34 0-2.269-1.625-3.859-3.947-3.859-2.691 0-4.277 2.02-4.277 4.105 0 .813.312 1.688.702 2.163.077.092.088.173.065.267-.071.293-.231.893-.263 1.018-.043.164-.142.199-.327.121-1.142-.531-1.854-2.199-1.854-3.535 0-2.884 2.096-5.527 6.049-5.527 3.176 0 5.64 2.262 5.64 5.281 0 3.153-1.99 5.691-4.751 5.691-.927 0-1.8-.483-2.096-1.06l-.569 2.168c-.206.793-.766 1.78-1.142 2.384C9.69 23.699 10.837 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/category/sneakers" className="text-gray-300 hover:text-gold transition-colors">Sneakers</Link></li>
              <li><Link to="/category/watches" className="text-gray-300 hover:text-gold transition-colors">Watches</Link></li>
              <li><Link to="/category/handbags" className="text-gray-300 hover:text-gold transition-colors">Handbags</Link></li>
              <li><Link to="/category/glasses" className="text-gray-300 hover:text-gold transition-colors">Glasses</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-gold transition-colors">View All</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-300 hover:text-gold transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-gold transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors">Customer Support</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: info@flexnex.com</li>
              <li className="text-gray-300">Support: support@flexnex.com</li>
              <li className="text-gray-300">WhatsApp: +91 8291821901</li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© {currentYear} Flexnex. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-gold transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="text-gray-400 text-sm hover:text-gold transition-colors">Sitemap</Link>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              Website developed with ❤️ by{' '}
              <a 
                href="https://kdrtech.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gold hover:text-yellow-400 transition-colors font-medium"
              >
                KDRTech.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
