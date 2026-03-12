import { getProducts, getWishlist } from "@/data/products";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const wishlistIds = getWishlist();
  const products = getProducts().filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-display text-foreground mb-8">
          My Wishlist <span className="text-muted-foreground text-lg font-sans font-normal">({products.length} items)</span>
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-muted mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save your favorite products to see them here</p>
            <Link to="/"><Button className="bg-primary text-primary-foreground">Browse Products</Button></Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
