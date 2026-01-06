import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(212,175,55,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_80%_60%,rgba(255,255,255,0.08),transparent_55%)]" />

      <div className="container-custom relative z-10 py-16 md:py-24 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block">Premium style,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold">
              without the noise.
            </span>
          </h1>
          
          <p className="mt-5 text-base md:text-lg text-zinc-200 leading-relaxed max-w-2xl">
            Discover premium fashion and accessories with clean design, fair pricing, and reliable delivery.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/shop">
              <Button className="bg-gold hover:bg-darkgold text-black px-7 py-6 text-base font-semibold rounded-full">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className="bg-white text-black border-white px-7 py-6 text-base font-semibold rounded-full hover:bg-white"
              >
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="mt-10 flex flex-wrap gap-2 text-sm text-zinc-300">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Free shipping over ₹5000</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Premium quality</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Support on WhatsApp</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default HeroBanner;
