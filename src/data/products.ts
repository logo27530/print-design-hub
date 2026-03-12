import tshirtImg from "@/assets/products/tshirt.jpg";
import penSetImg from "@/assets/products/pen-set.jpg";
import badgeImg from "@/assets/products/badge.jpg";
import keychainImg from "@/assets/products/keychain.jpg";
import mugImg from "@/assets/products/mug.jpg";
import mobileStandImg from "@/assets/products/mobile-stand.jpg";
import capImg from "@/assets/products/cap.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  description: string;
  features: string[];
  minOrder: number;
  rating: number;
  reviews: number;
  bestSeller?: boolean;
}

export const categories = [
  { name: "T-Shirts", icon: "👕" },
  { name: "Pen Sets", icon: "🖊️" },
  { name: "Badges", icon: "🏷️" },
  { name: "Keychains", icon: "🔑" },
  { name: "Mugs", icon: "☕" },
  { name: "Mobile Stands", icon: "📱" },
  { name: "Caps", icon: "🧢" },
  { name: "Corporate Gifts", icon: "🎁" },
];

export const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Customized Polo T-Shirt with Logo",
    category: "T-Shirts",
    price: 349,
    originalPrice: 699,
    discount: 50,
    image: tshirtImg,
    description: "Premium quality polo t-shirt with your company logo embroidered. Available in multiple colors. Perfect for corporate events, team uniforms, and promotional giveaways.",
    features: ["100% Cotton Fabric", "Custom Logo Embroidery", "Available in 12 Colors", "Sizes: S to 3XL", "Bulk Order Discount"],
    minOrder: 10,
    rating: 4.5,
    reviews: 234,
    bestSeller: true,
  },
  {
    id: "2",
    name: "6-in-1 Premium Metal Pen Set",
    category: "Pen Sets",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: penSetImg,
    description: "Elegant 6-piece metal pen set with custom logo engraving. Comes in a premium gift box. Ideal for corporate gifting and executive gifts.",
    features: ["Premium Metal Body", "Custom Logo Engraving", "Gift Box Included", "Ball Point & Roller Ball", "Lifetime Warranty"],
    minOrder: 5,
    rating: 4.7,
    reviews: 189,
    bestSeller: true,
  },
  {
    id: "3",
    name: "Magnetic Name Badge with Logo",
    category: "Badges",
    price: 149,
    originalPrice: 299,
    discount: 50,
    image: badgeImg,
    description: "Professional magnetic name badge with your company logo. Strong magnet ensures secure attachment without damaging clothes.",
    features: ["Strong Magnetic Clip", "Full Color Printing", "Durable Acrylic", "Custom Shapes Available", "No Pin Damage"],
    minOrder: 20,
    rating: 4.3,
    reviews: 156,
  },
  {
    id: "4",
    name: "Metal Keychain with Logo Engraving",
    category: "Keychains",
    price: 99,
    originalPrice: 199,
    discount: 50,
    image: keychainImg,
    description: "Premium metal keychain with laser-engraved company logo. A perfect promotional gift that your clients will carry every day.",
    features: ["Stainless Steel", "Laser Engraving", "Multiple Shapes", "Gift Box Option", "Bulk Pricing"],
    minOrder: 25,
    rating: 4.6,
    reviews: 312,
    bestSeller: true,
  },
  {
    id: "5",
    name: "Custom Printed Coffee Mug",
    category: "Mugs",
    price: 199,
    originalPrice: 399,
    discount: 50,
    image: mugImg,
    description: "High-quality ceramic mug with full-color logo printing. Microwave and dishwasher safe. Great for office and gifting.",
    features: ["Ceramic Material", "Full Color Print", "330ml Capacity", "Dishwasher Safe", "Gift Box Available"],
    minOrder: 10,
    rating: 4.4,
    reviews: 278,
  },
  {
    id: "6",
    name: "Wooden Mobile Stand with Logo",
    category: "Mobile Stands",
    price: 249,
    originalPrice: 499,
    discount: 50,
    image: mobileStandImg,
    description: "Eco-friendly wooden mobile stand with your brand logo. Perfect desk accessory for corporate gifting.",
    features: ["Natural Wood", "Laser Engraved Logo", "Universal Compatibility", "Eco-Friendly", "Desk Accessory"],
    minOrder: 15,
    rating: 4.5,
    reviews: 145,
  },
  {
    id: "7",
    name: "Custom Embroidered Cap",
    category: "Caps",
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: capImg,
    description: "Premium quality baseball cap with custom embroidered logo. Adjustable strap fits all sizes. Perfect for outdoor events and brand promotion.",
    features: ["Premium Cotton Twill", "Custom Embroidery", "Adjustable Strap", "One Size Fits All", "Multiple Colors"],
    minOrder: 20,
    rating: 4.6,
    reviews: 198,
  },
  {
    id: "8",
    name: "Corporate Gift Combo Set",
    category: "Corporate Gifts",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    image: penSetImg,
    description: "Complete corporate gift combo including pen, keychain, and badge with your company logo. Comes in a premium presentation box.",
    features: ["3-in-1 Gift Set", "Premium Packaging", "Custom Branding", "Perfect for Events", "Bulk Discount"],
    minOrder: 10,
    rating: 4.8,
    reviews: 89,
    bestSeller: true,
  },
];

// Store helpers using localStorage
const PRODUCTS_KEY = "logoproducts_products";
const WISHLIST_KEY = "logoproducts_wishlist";
const AUTH_KEY = "logoproducts_auth";

export function getProducts(): Product[] {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
  return defaultProducts;
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function addProduct(product: Product) {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
}

export function deleteProduct(id: string) {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
}

export function getWishlist(): string[] {
  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleWishlist(productId: string): string[] {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  if (index > -1) wishlist.splice(index, 1);
  else wishlist.push(productId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  return wishlist;
}

export function getAuth(): { loggedIn: boolean; isAdmin: boolean; email: string } {
  const stored = localStorage.getItem(AUTH_KEY);
  return stored ? JSON.parse(stored) : { loggedIn: false, isAdmin: false, email: "" };
}

export function setAuth(auth: { loggedIn: boolean; isAdmin: boolean; email: string }) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
