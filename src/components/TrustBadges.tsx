const trustFeatures = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "Exceptional products, meticulously crafted with attention to detail",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
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
    description: "Hassle-free returns for customer satisfaction",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
      </svg>
    )
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "Round-the-clock customer assistance",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
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
              className="group bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md text-center transition-all duration-300 border border-gray-100 hover:border-gold/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gold/20 to-yellow-500/20 text-gold rounded-full mb-4 transition-transform duration-300">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
