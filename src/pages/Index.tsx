import { useSearchParams } from "react-router-dom";
import { getProducts } from "@/data/products";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import CategoryScroller from "@/components/CategoryScroller";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchParams] = useSearchParams();
  const selectedCat = searchParams.get("cat");
  const products = getProducts();
  
  const filtered = selectedCat
    ? products.filter((p) => p.category === selectedCat)
    : products;

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      {!selectedCat && <HeroBanner />}
      <CategoryScroller />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-display text-foreground">
            {selectedCat || "All Products"}
          </h2>
          <span className="text-sm text-muted-foreground">{filtered.length} products</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
