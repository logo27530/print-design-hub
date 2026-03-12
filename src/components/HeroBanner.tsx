import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={heroBanner}
          alt="Custom branded corporate gifts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 font-display leading-tight">
                Your Logo On <span className="text-gradient">Premium Products</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-6">
                Custom branded corporate gifts, merchandise & promotional products. 
                50% OFF on all products!
              </p>
              <div className="flex gap-3">
                <Link to="/?cat=T-Shirts">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/?cat=Corporate+Gifts">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Corporate Gifts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
