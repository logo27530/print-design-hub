import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const CategoryScroller = () => {
  return (
    <section className="py-6 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/?cat=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:scale-110 transition-transform">{cat.icon}</span>
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryScroller;
