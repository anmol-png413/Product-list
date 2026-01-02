import { Edit2, Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

const categoryColors: { [key: string]: { bg: string; icon: string; text: string } } = {
  Electronics: { bg: 'bg-blue-50', icon: 'text-blue-600', text: 'text-blue-700' },
  Clothing: { bg: 'bg-pink-50', icon: 'text-pink-600', text: 'text-pink-700' },
  Books: { bg: 'bg-purple-50', icon: 'text-purple-600', text: 'text-purple-700' },
  'Home & Garden': { bg: 'bg-emerald-50', icon: 'text-emerald-600', text: 'text-emerald-700' },
  Sports: { bg: 'bg-orange-50', icon: 'text-orange-600', text: 'text-orange-700' },
  Toys: { bg: 'bg-rose-50', icon: 'text-rose-600', text: 'text-rose-700' },
};

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  const isLowStock = product.stock < 10;
  const colors = categoryColors[product.category] || categoryColors.Electronics;

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className={`h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700`} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <Package className={`w-6 h-6 ${colors.icon}`} />
          </div>
          <button
            onClick={() => onEdit(product)}
            className="p-2 text-gray-300 group-hover:text-blue-600 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 -mr-2"
            aria-label="Edit product"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2">
            {product.name}
          </h3>
          <span className={`inline-block mt-2 px-2.5 py-1 ${colors.bg} ${colors.text} text-xs font-medium rounded-lg`}>
            {product.category}
          </span>
        </div>

        {product.description && (
          <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="space-y-3 pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">Price</span>
            <p className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Stock Level</span>
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isLowStock
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {product.stock} items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
