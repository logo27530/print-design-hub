const TopBanner = () => {
  const text = "🎉 Get 50% OFF on All Products | 🚚 Free Shipping on Orders Above ₹999 | ✅ Custom Logo Printing | 😊 Trusted by 50,000+ Happy Customers";
  
  return (
    <div className="bg-hero-gradient overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-2 flex">
        <span className="text-sm font-medium text-primary-foreground mx-8">{text}</span>
        <span className="text-sm font-medium text-primary-foreground mx-8">{text}</span>
      </div>
    </div>
  );
};

export default TopBanner;
