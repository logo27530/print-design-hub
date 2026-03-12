import { useParams, Link } from "react-router-dom";
import { getProducts, getWishlist, toggleWishlist } from "@/data/products";
import { useState } from "react";
import { Heart, ArrowLeft, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const products = getProducts();
  const product = products.find((p) => p.id === id);
  const [wishlisted, setWishlisted] = useState(product ? getWishlist().includes(product.id) : false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-display mb-4 text-foreground">Product Not Found</h1>
          <Link to="/"><Button>Go Home</Button></Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleWishlist = () => {
    toggleWishlist(product.id);
    setWishlisted(!wishlisted);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden bg-secondary">
            <div className="absolute top-4 left-4 z-10 bg-discount text-discount-foreground text-sm font-bold px-3 py-1.5 rounded-lg">
              {product.discount}% OFF
            </div>
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-primary font-medium mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold font-display text-foreground mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
              <span className="text-sm font-bold text-discount bg-discount/10 px-2 py-1 rounded">
                Save ₹{product.originalPrice - product.price}
              </span>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Minimum Order: <span className="font-semibold text-foreground">{product.minOrder} pieces</span>
            </p>

            <div className="flex gap-3 mb-8">
              <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                Get Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWishlist}
                className={`border-border ${wishlisted ? "text-discount border-discount" : ""}`}
              >
                <Heart className={`h-5 w-5 ${wishlisted ? "fill-discount" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: Shield, label: "Quality Guarantee" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-3 bg-secondary rounded-lg text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-display text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
