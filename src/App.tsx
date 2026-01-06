import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartProvider } from "@/hooks/use-cart";
import OfferBanner from "./components/OfferBanner";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { getCategory, getProduct } from "@/services/api";

const queryClient = new QueryClient();

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AdminRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const rest = pathname.startsWith("/admin") ? pathname.slice("/admin".length) : "";
    const normalizedRest = rest === "/" ? "" : rest;
    const target =
      `https://rupee-commerce-control-panel.vercel.app/admin` +
      normalizedRest +
      location.search +
      location.hash;
    window.location.replace(target);
  }, [location.hash, location.pathname, location.search]);

  return null;
};

const SlugRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      if (!slug) {
        setIsResolved(true);
        return;
      }

      try {
        const category = await getCategory(slug);
        if (cancelled) return;

        if (category) {
          navigate(`/category/${slug}${location.search}${location.hash}`, { replace: true });
          return;
        }

        const product = await getProduct(slug);
        if (cancelled) return;

        if (product) {
          navigate(`/product/${slug}${location.search}${location.hash}`, { replace: true });
          return;
        }
      } finally {
        if (!cancelled) setIsResolved(true);
      }
    };

    setIsResolved(false);
    void resolve();

    return () => {
      cancelled = true;
    };
  }, [location.hash, location.search, navigate, slug]);

  if (!isResolved) return null;
  return <NotFound />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <OfferBanner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/*" element={<AdminRedirect />} />
            <Route path="/:slug" element={<SlugRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
