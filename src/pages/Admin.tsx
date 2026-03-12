import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, addProduct, deleteProduct, getAuth, categories, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import { Trash2, Plus, Package } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [products, setProducts] = useState(getProducts());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: categories[0].name,
    price: "",
    originalPrice: "",
    image: "",
    description: "",
    features: "",
    minOrder: "10",
  });

  if (!auth.loggedIn || !auth.isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-display text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You need admin access to view this page.</p>
          <Button onClick={() => navigate("/login")} className="bg-primary text-primary-foreground">Go to Login</Button>
        </div>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
    toast("Product deleted");
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.originalPrice) {
      toast.error("Please fill required fields");
      return;
    }

    const price = Number(form.price);
    const originalPrice = Number(form.originalPrice);
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

    const newProduct: Product = {
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      price,
      originalPrice,
      discount,
      image: form.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      description: form.description,
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      minOrder: Number(form.minOrder) || 10,
      rating: 4.5,
      reviews: 0,
    };

    addProduct(newProduct);
    setProducts(getProducts());
    setShowForm(false);
    setForm({ name: "", category: categories[0].name, price: "", originalPrice: "", image: "", description: "", features: "", minOrder: "10" });
    toast.success("Product added successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your products</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-card rounded-xl shadow-card p-6 mb-8 border border-border">
            <h2 className="text-xl font-bold font-display text-foreground mb-4">New Product</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">Product Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Category</Label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-foreground">Price (₹) *</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Original Price (₹) *</Label>
                <Input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Image URL</Label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Min Order Qty</Label>
                <Input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-foreground">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-foreground">Features (comma separated)</Label>
                <Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Feature 1, Feature 2, ..." className="mt-1" />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="submit" className="bg-primary text-primary-foreground">Save Product</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}

        {/* Product List */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Product</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-foreground hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Price</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-foreground hidden md:table-cell">Discount</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-secondary" />
                        <span className="text-sm font-medium text-foreground line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{product.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">₹{product.price}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs font-bold bg-discount/10 text-discount px-2 py-1 rounded">{product.discount}% OFF</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(product.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted mx-auto mb-3" />
              <p className="text-muted-foreground">No products yet. Add your first product!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
