import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, clearCart } from "@/data/cart";
import { getProducts } from "@/data/products";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "919999999999"; // Replace with your number

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = getCart();
  const products = getProducts();
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "cod" });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <TopBanner />
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
          <Link to="/"><Button className="bg-primary text-primary-foreground">Continue Shopping</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!/^\d{10}$/.test(form.phone.trim())) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    const productLines = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product
        ? `Product: ${product.name}\nQuantity: ${item.quantity}\nPrice: ₹${product.price * item.quantity}`
        : "";
    }).filter(Boolean).join("\n\n");

    const message = `🛒 *New Order Received*\n\n👤 Name: ${form.name.trim()}\n📞 Phone: ${form.phone.trim()}\n📍 Address: ${form.address.trim()}\n💳 Payment: ${form.payment === "cod" ? "Cash on Delivery" : "Online Payment"}\n\n${productLines}\n\n💰 *Total Price: ₹${totalPrice}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    clearCart();
    window.open(whatsappUrl, "_blank");
    toast.success("Order placed! Redirecting to WhatsApp...");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-display text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl shadow-card border border-border p-6">
              <h2 className="text-lg font-bold font-display text-foreground mb-4">Delivery Details</h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground">Full Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="mt-1" maxLength={100} />
                </div>
                <div>
                  <Label className="text-foreground">Phone Number *</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="10-digit phone number" className="mt-1" />
                </div>
                <div>
                  <Label className="text-foreground">Full Address *</Label>
                  <Textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no, street, city, state, pincode" className="mt-1" maxLength={500} />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-card border border-border p-6">
              <h2 className="text-lg font-bold font-display text-foreground mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${form.payment === "cod" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"}`}>
                  <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={() => setForm({ ...form, payment: "cod" })} className="accent-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">Pay when you receive</p>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${form.payment === "online" ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"}`}>
                  <input type="radio" name="payment" value="online" checked={form.payment === "online"} onChange={() => setForm({ ...form, payment: "online" })} className="accent-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Online Payment</p>
                    <p className="text-xs text-muted-foreground">UPI / Card / Net Banking</p>
                  </div>
                </label>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full bg-hero-gradient text-primary-foreground font-bold text-lg">
              Place Order via WhatsApp
            </Button>
          </form>

          <div className="bg-card rounded-xl shadow-card border border-border p-6 h-fit sticky top-20">
            <h2 className="text-lg font-bold font-display text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-secondary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ₹{product.price}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">₹{product.price * item.quantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
