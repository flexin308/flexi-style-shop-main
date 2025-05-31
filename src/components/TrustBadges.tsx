const trustFeatures = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "Premium quality replicas, meticulously crafted",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
      </svg>
    )
  },
  {
    id: "cod",
    title: "Cash On Delivery",
    description: "Pay when you receive your order",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="12" x="2" y="6" rx="2"></rect>
        <circle cx="12" cy="12" r="2"></circle>
        <path d="M6 12h.01M18 12h.01"></path>
      </svg>
    )
  },
  {
    id: "shipping",
    title: "Fast Shipping",
    description: "Delivery within 3-7 business days",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"></path>
        <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"></path>
        <circle cx="7" cy="18" r="2"></circle>
        <circle cx="17" cy="18" r="2"></circle>
      </svg>
    )
  },
  {
    id: "return",
    title: "Easy Returns",
    description: "7-day return policy for peace of mind",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
      </svg>
    )
  }
];

const TrustBadges = () => {
  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16 md:py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Why Shop With Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">
            We prioritize quality and customer satisfaction with every order
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {trustFeatures.map((feature, index) => (
            <div 
              key={feature.id} 
              className="group bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl text-center transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-gold/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gold/20 to-yellow-500/20 text-gold rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent rounded-full transform rotate-45 group-hover:animate-ping"></div>
                  <div className="relative z-10">
                    {feature.icon}
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-sm md:text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative element */}
              <div className="mt-4 w-8 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
        
        {/* Additional trust indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 p-6 bg-white rounded-full shadow-lg">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">50,000+ Happy Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">4.8/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Trusted Since 2020</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
