import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, addProduct, deleteProduct, getAuth, categories, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import { Trash2, Plus, Package, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [products, setProducts] = useState(getProducts());
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    category: categories[0].name,
    price: "",
    originalPrice: "",
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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
    if (!imagePreview) {
      toast.error("Please upload a product image");
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
      image: imagePreview,
      description: form.description,
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      minOrder: Number(form.minOrder) || 10,
      rating: 4.5,
      reviews: 0,
    };

    addProduct(newProduct);
    setProducts(getProducts());
    setShowForm(false);
    setImagePreview(null);
    setForm({ name: "", category: categories[0].name, price: "", originalPrice: "", description: "", features: "", minOrder: "10" });
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
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>

        {showForm && (
          <div className="bg-card rounded-xl shadow-card p-6 mb-8 border border-border">
            <h2 className="text-xl font-bold font-display text-foreground mb-4">New Product</h2>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">Product Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" maxLength={200} />
              </div>
              <div>
                <Label className="text-foreground">Category</Label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full mt-1 h-10 rounded-md border border-input bg-background px-3 text-sm">
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

              {/* Image Upload */}
              <div className="md:col-span-2">
                <Label className="text-foreground">Product Image *</Label>
                <div className="mt-1 flex items-start gap-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 rounded-xl border-2 border-dashed border-input bg-secondary hover:bg-muted flex flex-col items-center justify-center cursor-pointer transition-colors flex-shrink-0"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Upload</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground pt-2">
                    <p>Click to upload product image</p>
                    <p className="text-xs mt-1">JPG, PNG, WebP · Max 5MB</p>
                    {imagePreview && (
                      <button type="button" onClick={() => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-xs text-destructive hover:underline mt-2">
                        Remove image
                      </button>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              </div>

              <div>
                <Label className="text-foreground">Min Order Qty</Label>
                <Input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} className="mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-foreground">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" maxLength={1000} />
              </div>
              <div className="md:col-span-2">
                <Label className="text-foreground">Features (comma separated)</Label>
                <Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Feature 1, Feature 2, ..." className="mt-1" />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="submit" className="bg-primary text-primary-foreground">Save Product</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setImagePreview(null); }}>Cancel</Button>
              </div>
            </form>
          </div>
        )}

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
