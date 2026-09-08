import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import toast from "react-hot-toast";
import { Lock, Mail, Gem } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-borderPink shadow-sm space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-lightPink rounded-full flex items-center justify-center mx-auto text-primaryPink border border-borderPink">
            <Gem className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-darkText">Admin Portal</h2>
          <p className="text-mutedText text-xs">Sign in to manage Aura Jewels store</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-mutedText mb-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="admin@example.com"
                className="input-field pl-10"
              />
              <Mail className="w-4 h-4 text-mutedText absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-mutedText mb-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••"
                className="input-field pl-10"
              />
              <Lock className="w-4 h-4 text-mutedText absolute left-3.5 top-3" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="btn-primary w-full py-2.5 text-sm disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login to Dashboard"}
          </button>
        </form>

      </div>
    </div>
  );
}