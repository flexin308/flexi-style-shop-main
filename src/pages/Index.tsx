
import HeroBanner from "@/components/HeroBanner";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import FloatingButtons from "@/components/FloatingButtons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <CategoryGrid />
        <FeaturedProducts />
        <TrustBadges />
        <InstagramFeed />
        <Testimonials />
        <FloatingButtons />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
