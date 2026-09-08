import { useState, useEffect } from "react";
import { getProducts } from "../firebase/products";
import { getCategories } from "../firebase/categories";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { Filter, Search } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fixed state initialization here
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getProducts(),
          getCategories().catch(() => [])
        ]);
        
        setProducts(fetchedProducts);

        if (fetchedCategories && fetchedCategories.length > 0) {
          setCategories(fetchedCategories.map(c => c.name));
        } else {
          const uniqueCategories = [...new Set(fetchedProducts.map(p => p.categoryName || p.categoryId).filter(Boolean))];
          setCategories(uniqueCategories);
        }

      } catch (error) {
        console.error("Error loading shop data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  // Filter and Sort logic
  const filteredProducts = products.filter(product => {
    const pCategory = (product.categoryName || product.categoryId || "").toLowerCase();
    const matchesCategory = selectedCategory === "all" || pCategory === selectedCategory.toLowerCase();
                            
    const matchesSearch = product.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          (product.description && product.description.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-borderPink pb-6">
        <h1 className="text-3xl font-serif font-bold text-darkText">Explore Jewellery Collection</h1>
        <p className="text-mutedText text-sm mt-1">Discover handcrafted rings, necklaces, earrings and more.</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-lightPink p-4 rounded-xl border border-borderPink">
        
        {/* Search */}
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search in collection..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="input-field pl-10 text-sm bg-white"
          />
          <Search className="w-4 h-4 text-mutedText absolute left-3.5 top-3" />
        </div>

        {/* Category Dropdown Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-mutedText hidden sm:block" />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field text-sm bg-white py-2"
          >
            <option value="all">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field text-sm bg-white py-2"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Products Grid */}
      {loading ? (
        <Loader />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-mutedText text-base">No jewellery found matching your criteria.</p>
          <button 
            onClick={() => { setSelectedCategory("all"); setSearchFilter(""); }}
            className="btn-outline text-xs px-4 py-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}