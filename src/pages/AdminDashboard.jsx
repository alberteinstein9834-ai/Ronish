import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../firebase/products";
import { getOrders, updateOrderStatus } from "../firebase/orders";
import { formatPrice } from "../utils/formatPrice";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit, Package, ShoppingBag, X, Upload, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Modal state for Add/Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    description: "",
    imageUrl: "",
    categoryName: "Rings",
    stock: "10",
    featured: false
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [fetchedProducts, fetchedOrders] = await Promise.all([
        getProducts(),
        getOrders()
      ]);
      setProducts(fetchedProducts);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error loading admin data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        price: product.price || "",
        oldPrice: product.oldPrice || "",
        description: product.description || "",
        imageUrl: product.imageUrl || "",
        categoryName: product.categoryName || "Rings",
        stock: product.stock || "10",
        featured: product.featured || false
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: "",
        oldPrice: "",
        description: "",
        imageUrl: "",
        categoryName: "Rings",
        stock: "10",
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  // Device se image select karke Base64 mein convert karne ka function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        toast.error("Image size should be less than 1MB for fast loading.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
        toast.success("Image loaded from device!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : 0,
        stock: Number(formData.stock)
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productPayload);
        toast.success("Product updated successfully!");
      } else {
        await addProduct(productPayload);
        toast.success("Product added to database successfully!");
      }

      setIsModalOpen(false);
      fetchAdminData();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
        fetchAdminData();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success("Order status updated");
      fetchAdminData();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading && products.length === 0) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-borderPink pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-darkText">Admin Dashboard</h1>
          <p className="text-mutedText text-sm mt-1">Manage store inventory, products, and customer orders seamlessly.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {activeTab === "products" && (
            <button 
              onClick={() => handleOpenModal()} 
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          )}

          {/* Logout Button */}
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-sm font-medium transition-colors border border-rose-200"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-borderPink pb-3">
        <button 
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-primaryPink text-white' : 'bg-lightPink text-darkText hover:bg-borderPink'}`}
        >
          <Package className="w-4 h-4" /> Products ({products.length})
        </button>
        <button 
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-primaryPink text-white' : 'bg-lightPink text-darkText hover:bg-borderPink'}`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders ({orders.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="bg-white rounded-xl border border-borderPink overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-lightPink border-b border-borderPink text-xs text-mutedText uppercase tracking-wider">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderPink text-sm">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-mutedText">No products found. Add your first product!</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-lightPink/55 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img 
                          src={product.imageUrl || product.image || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100"} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-md bg-lightPink border border-borderPink"
                        />
                        <div>
                          <p className="font-medium text-darkText">{product.name}</p>
                          {product.featured && <span className="text-[10px] bg-primaryPink/10 text-primaryPink px-2 py-0.5 rounded-full font-medium">Featured</span>}
                        </div>
                      </td>
                      <td className="p-4 text-mutedText">{product.categoryName || "Jewellery"}</td>
                      <td className="p-4 font-bold text-darkText">{formatPrice(product.price)}</td>
                      <td className="p-4 text-mutedText">{product.stock}</td>
                      <td className="p-4 text-right space-x-2">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 bg-lightPink text-darkText hover:text-primaryPink rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-borderPink text-mutedText">
              No customer orders received yet.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-xl border border-borderPink space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-borderPink pb-4">
                  <div>
                    <span className="text-xs bg-lightPink px-3 py-1 rounded-full font-mono text-darkText border border-borderPink">
                      ID: {order.id}
                    </span>
                    <h3 className="font-serif font-bold text-darkText mt-2">{order.customerName}</h3>
                    <p className="text-xs text-mutedText">{order.phone} | {order.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-darkText">{formatPrice(order.total)}</span>
                    <select 
                      value={order.status || "pending"} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="input-field text-xs py-1.5"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs text-mutedText space-y-1">
                  <p><strong>Address:</strong> {order.address}, {order.city} ({order.postalCode})</p>
                  <p><strong>Items:</strong> {order.items?.map(i => `${i.name} (x${i.quantity})`).join(", ")}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL WITH DESCRIPTION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-borderPink max-w-lg w-full p-6 space-y-6 shadow-xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-borderPink pb-4">
              <h3 className="font-serif text-xl font-bold text-darkText">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-mutedText hover:text-darkText">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-mutedText mb-1">Product Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-mutedText mb-1">Price ($) *</label>
                  <input 
                    type="number" 
                    required 
                    value={formData.price} 
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mutedText mb-1">Old Price ($) (Optional)</label>
                  <input 
                    type="number" 
                    value={formData.oldPrice} 
                    onChange={e => setFormData({...formData, oldPrice: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>

              {/* DESCRIPTION INPUT FIELD */}
              <div>
                <label className="block text-xs font-medium text-mutedText mb-1">Product Description (Optional)</label>
                <textarea 
                  rows="3"
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="input-field"
                  placeholder="Enter detailed product description..."
                />
              </div>

              {/* DEVICE FILE UPLOAD INPUT */}
              <div>
                <label className="block text-xs font-medium text-mutedText mb-1">Upload Product Image from Device *</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-lightPink border border-borderPink rounded-lg cursor-pointer hover:bg-borderPink/50 transition-colors text-xs font-medium text-darkText">
                    <Upload className="w-4 h-4 text-primaryPink" /> Choose Image File
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" className="w-10 h-10 object-cover rounded-md border border-borderPink" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-mutedText mb-1">Category Name</label>
                  <input 
                    type="text" 
                    value={formData.categoryName} 
                    onChange={e => setFormData({...formData, categoryName: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-mutedText mb-1">Stock Quantity</label>
                  <input 
                    type="number" 
                    value={formData.stock} 
                    onChange={e => setFormData({...formData, stock: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="featured"
                  checked={formData.featured}
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4 accent-primaryPink rounded"
                />
                <label htmlFor="featured" className="text-xs font-medium text-darkText cursor-pointer">
                  Mark as Featured Product (Show on Home Page)
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline flex-1 py-2">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 py-2">
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}