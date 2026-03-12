import { Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, getWishlist } from "@/data/products";
import { getCartCount } from "@/data/cart";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = getAuth();
  const wishlistCount = getWishlist().length;
  const cartCount = getCartCount();
  const navigate = useNavigate();

  const navLinks = [
    { label: "T-Shirts", href: "/?cat=T-Shirts" },
    { label: "Pen Sets", href: "/?cat=Pen+Sets" },
    { label: "Badges", href: "/?cat=Badges" },
    { label: "Caps", href: "/?cat=Caps" },
    { label: "Corporate Gifts", href: "/?cat=Corporate+Gifts" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card shadow-card border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-hero-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg font-display">L</span>
          </div>
          <span className="text-xl font-bold font-display text-foreground hidden sm:block">LogoPrint</span>
        </Link>

        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <Heart className="h-5 w-5 text-foreground" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-discount text-discount-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {auth.loggedIn ? (
            <Link to={auth.isAdmin ? "/admin" : "/login"} className="p-2 rounded-full hover:bg-secondary transition-colors">
              <User className="h-5 w-5 text-primary" />
            </Link>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Login</Button>
            </Link>
          )}

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border py-4 px-4 space-y-3">
          <div className="mb-3">
            <SearchBar />
          </div>
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="block text-sm font-medium text-muted-foreground hover:text-primary py-2" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
