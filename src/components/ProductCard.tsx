import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product, getWishlist, toggleWishlist } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(getWishlist().includes(product.id));

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    setWishlisted(!wishlisted);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1">
        {/* Discount Tag */}
        <div className="absolute top-3 left-3 z-10 bg-discount text-discount-foreground text-xs font-bold px-2.5 py-1 rounded-md">
          {product.discount}% OFF
        </div>

        {/* Best Seller Tag */}
        {product.bestSeller && (
          <div className="absolute top-3 right-12 z-10 bg-success text-success-foreground text-xs font-bold px-2.5 py-1 rounded-md">
            Best Seller
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${wishlisted ? "fill-discount text-discount" : "text-muted-foreground"}`}
          />
        </button>

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? "text-warning" : "text-muted"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
