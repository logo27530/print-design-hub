import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { getProducts, Product } from "@/data/products";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const results = getProducts()
      .filter((p) => p.name.toLowerCase().includes(value.toLowerCase()) || p.category.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 6);
    setSuggestions(results);
    setOpen(results.length > 0);
  };

  const handleSelect = (id: string) => {
    setQuery("");
    setOpen(false);
    navigate(`/product/${id}`);
  };

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.trim().length >= 2 && suggestions.length > 0 && setOpen(true)}
          placeholder="Search products..."
          className="w-full h-10 pl-10 pr-9 rounded-full border border-input bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        {query && (
          <button onClick={() => { setQuery(""); setSuggestions([]); setOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-card rounded-xl shadow-card-hover border border-border overflow-hidden z-50">
          {suggestions.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product.id)}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-secondary transition-colors text-left"
            >
              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-secondary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">₹{product.price} · {product.category}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
