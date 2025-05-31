import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="relative bg-black h-[50vh] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1470&auto=format&fit=crop')" }}
          ></div>
          
          <div className="container-custom relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Flexnex</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover the story behind India's premier destination for premium quality replicas
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2020, Flexnex was born from a simple idea: everyone deserves access to premium style without the premium price tag. We noticed that many fashion enthusiasts in India were forced to choose between unaffordable authentic pieces or low-quality knockoffs. We set out to bridge this gap.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission became clear – to bridge this gap by offering premium quality replicas that look and feel like the real thing, without emptying your wallet. We believe that style shouldn't be exclusive, but accessible to all.
                </p>
                <p className="text-gray-700">
                  Today, we've grown into one of India's most trusted sources for premium quality replicas, serving thousands of satisfied customers nationwide. Our commitment to quality, transparency, and customer satisfaction remains at the heart of everything we do.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1470&auto=format&fit=crop" 
                    alt="Our workshop" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gold p-6 rounded-lg w-32 h-32 flex items-center justify-center">
                  <p className="text-black font-bold text-center">
                    <span className="text-4xl block">4+</span>
                    <span className="text-sm">Years of Excellence</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-2 text-center">Why Choose Flexnex</h2>
            <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              We're committed to providing you with the best shopping experience and products that exceed your expectations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                <p className="text-gray-700">
                  Our products undergo rigorous quality checks to ensure they match the look, feel, and durability of the original items. We only source from the best manufacturers.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Customer First</h3>
                <p className="text-gray-700">
                  From browsing to delivery, we prioritize your satisfaction. Our responsive support team is always ready to assist you, and our policies are designed with you in mind.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"></path>
                    <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"></path>
                    <circle cx="7" cy="18" r="2"></circle>
                    <circle cx="17" cy="18" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Affordable Luxury</h3>
                <p className="text-gray-700">
                  We believe everyone deserves to enjoy premium style. Our business model cuts out middlemen and unnecessary markups to offer you the best possible prices.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Process */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-2 text-center">Our Process</h2>
            <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Here's how we ensure you receive only the highest quality products
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                  1
                </div>
                <h3 className="font-bold mb-2">Careful Sourcing</h3>
                <p className="text-gray-600">
                  We partner with manufacturers who specialize in creating high-quality replicas with attention to detail.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                  2
                </div>
                <h3 className="font-bold mb-2">Quality Inspection</h3>
                <p className="text-gray-600">
                  Each product undergoes thorough quality checks to ensure it meets our premium standards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                  3
                </div>
                <h3 className="font-bold mb-2">Secure Packaging</h3>
                <p className="text-gray-600">
                  Products are carefully packaged to ensure they reach you in perfect condition.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                  4
                </div>
                <h3 className="font-bold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  We work with reliable shipping partners to deliver your orders quickly and safely.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-black py-20 text-white text-center">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upgrade Your Style?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Browse our collection of premium quality replica products and find your perfect flex.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/shop" className="bg-gold hover:bg-darkgold text-black font-medium px-8 py-3 rounded transition-colors">
                Shop Now
              </a>
              <a href="/contact" className="bg-transparent hover:bg-white/10 text-white font-medium px-8 py-3 rounded border border-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default About;
