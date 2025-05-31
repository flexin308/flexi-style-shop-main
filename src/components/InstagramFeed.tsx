
const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
    likes: 245,
    comments: 18
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop",
    likes: 189,
    comments: 12
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e1?q=80&w=1528&auto=format&fit=crop",
    likes: 320,
    comments: 24
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=1470&auto=format&fit=crop",
    likes: 278,
    comments: 31
  }
];

const InstagramFeed = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Follow Us on Instagram</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            @flexi.in • Join our community and stay updated with the latest drops and style inspirations
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="#"
              className="group relative block overflow-hidden aspect-square rounded-lg"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <div className="text-white flex items-center space-x-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="ml-1">{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span className="ml-1">{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a href="#" className="inline-flex items-center text-gold hover:underline font-medium">
            View More on Instagram
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
