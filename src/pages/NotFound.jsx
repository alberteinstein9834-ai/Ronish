import { Link } from "react-router-dom";
import { Gem } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-6">
      <div className="w-20 h-20 bg-lightPink rounded-full flex items-center justify-center mx-auto text-primaryPink border border-borderPink">
        <Gem className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-serif font-bold text-darkText">Oops! Page Not Found</h1>
      <p className="text-mutedText text-sm">The sparkle you are looking for doesn't exist or has been moved.</p>
      <div>
        <Link to="/" className="btn-primary inline-block text-sm">Back to Home</Link>
      </div>
    </div>
  );
}