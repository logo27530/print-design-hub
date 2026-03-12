import { useState } from "react";
import { Link } from "react-router-dom";
import { getCart, updateCartQuantity, removeFromCart, CartItem } from "@/data/cart";
import { getProducts, Product } from "@/data/products";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(getCart());
  const products = getProducts();

  const getProduct = (id: string): Product | undefined => products.find((p) => p.id === id);

  const handleQuantity = (productId: string, delta: number) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    setCartItems(updateCartQuantity(productId, newQty));
  };

  const handleRemove = (productId: string) => {
    setCartItems(removeFromCart(productId));
    toast("Item removed from cart");
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-display text-foreground mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
            <Link to="/"><Button className="bg-primary text-primary-foreground">Continue Shopping</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex gap-4 bg-card rounded-xl p-4 shadow-card border border-border">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover bg-secondary flex-shrink-0" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.id}`} className="text-sm font-semibold text-foreground hover:text-primary line-clamp-2">{product.name}</Link>
                      <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold text-primary">₹{product.price}</span>
                        <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => handleRemove(item.productId)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-secondary rounded-lg">
                        <button onClick={() => handleQuantity(item.productId, -1)} className="p-2 hover:bg-muted rounded-l-lg transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-semibold w-8 text-center text-foreground">{item.quantity}</span>
                        <button onClick={() => handleQuantity(item.productId, 1)} className="p-2 hover:bg-muted rounded-r-lg transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-card rounded-xl shadow-card border border-border p-6 h-fit sticky top-20">
              <h2 className="text-lg font-bold font-display text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate mr-2">{product.name} × {item.quantity}</span>
                      <span className="text-foreground font-medium">₹{product.price * item.quantity}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{totalPrice}</span>
                </div>
              </div>
              <Link to="/checkout">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
