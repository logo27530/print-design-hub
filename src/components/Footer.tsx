import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-display">L</span>
              </div>
              <span className="text-lg font-bold font-display text-primary-foreground">LogoPrint</span>
            </div>
            <p className="text-sm">Your one-stop shop for custom branded products and corporate gifts.</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block hover:text-primary transition-colors">Home</Link>
              <Link to="/?cat=T-Shirts" className="block hover:text-primary transition-colors">T-Shirts</Link>
              <Link to="/?cat=Corporate+Gifts" className="block hover:text-primary transition-colors">Corporate Gifts</Link>
              <Link to="/wishlist" className="block hover:text-primary transition-colors">Wishlist</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3">Support</h4>
            <div className="space-y-2 text-sm">
              <p>📞 +91 98765 43210</p>
              <p>📧 hello@logoprint.in</p>
              <p>📍 Mumbai, India</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-3">Why Choose Us</h4>
            <div className="space-y-2 text-sm">
              <p>✅ Design Approval Before Processing</p>
              <p>🚚 Free Shipping Above ₹999</p>
              <p>💯 Premium Quality Guarantee</p>
              <p>🔄 Easy Returns</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm">
          © 2026 LogoPrint. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
