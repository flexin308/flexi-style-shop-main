const testimonials = [
  {
    id: 1,
    name: "Rahul Singh",
    location: "Mumbai",
    quote: "The quality of the sneakers I received was outstanding. They look and feel just like the originals. Couldn't be happier with my purchase.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi",
    quote: "I was skeptical at first, but the watch I ordered exceeded my expectations. Great quality and fast delivery. Will definitely shop again.",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Patel",
    location: "Bangalore",
    quote: "The handbag is incredibly well-made. My friends couldn't tell it wasn't the original brand. Amazing value for money!",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-black text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See what our customers have to say about their Flexnex experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-900 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill={i < testimonial.rating ? "#D4AF37" : "none"}
                    stroke={i < testimonial.rating ? "#D4AF37" : "#6b7280"}
                    strokeWidth="2"
                    className="mr-1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-gray-300 mb-4 italic">"{testimonial.quote}"</blockquote>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center font-bold mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
