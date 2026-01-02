import { useState, useMemo } from 'react';
import { Plus, Search, LayoutGrid, List } from 'lucide-react';
import ProductCard from './components/ProductCard';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import Pagination from './components/Pagination';
import { useDebounce } from './hooks/useDebounce';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
}

const ITEMS_PER_PAGE = 9;
const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    stock: 45,
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
  },
  {
    id: 2,
    name: 'Cotton T-Shirt',
    price: 24.99,
    category: 'Clothing',
    stock: 120,
    description: 'Comfortable 100% organic cotton t-shirt in various colors',
  },
  {
    id: 3,
    name: 'JavaScript Guide',
    price: 34.99,
    category: 'Books',
    stock: 8,
    description: 'Comprehensive guide to modern JavaScript development',
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    stock: 23,
    description: 'Fitness tracker with heart rate monitor and GPS',
  },
  {
    id: 5,
    name: 'Yoga Mat',
    price: 29.99,
    category: 'Sports',
    stock: 67,
    description: 'Non-slip yoga mat with carrying strap',
  },
  {
    id: 6,
    name: 'Garden Tool Set',
    price: 49.99,
    category: 'Home & Garden',
    stock: 34,
    description: 'Complete set of essential gardening tools',
  },
  {
    id: 7,
    name: 'LED Desk Lamp',
    price: 39.99,
    category: 'Electronics',
    stock: 5,
    description: 'Adjustable LED desk lamp with USB charging port',
  },
  {
    id: 8,
    name: 'Running Shoes',
    price: 89.99,
    category: 'Sports',
    stock: 42,
    description: 'Lightweight running shoes with cushioned sole',
  },
  {
    id: 9,
    name: 'Ceramic Plant Pot',
    price: 19.99,
    category: 'Home & Garden',
    stock: 88,
    description: 'Handcrafted ceramic plant pot with drainage hole',
  },
  {
    id: 10,
    name: 'Bluetooth Speaker',
    price: 59.99,
    category: 'Electronics',
    stock: 31,
    description: 'Portable waterproof Bluetooth speaker',
  },
  {
    id: 11,
    name: 'Denim Jeans',
    price: 54.99,
    category: 'Clothing',
    stock: 76,
    description: 'Classic fit denim jeans in various sizes',
  },
  {
    id: 12,
    name: 'Puzzle Set',
    price: 16.99,
    category: 'Toys',
    stock: 95,
    description: '1000-piece jigsaw puzzle with beautiful landscape',
  },
  {
    id: 13,
    name: 'Coffee Maker',
    price: 79.99,
    category: 'Home & Garden',
    stock: 18,
    description: 'Programmable coffee maker with thermal carafe',
  },
  {
    id: 14,
    name: 'Notebook Set',
    price: 12.99,
    category: 'Books',
    stock: 150,
    description: 'Set of 3 lined notebooks with premium paper',
  },
  {
    id: 15,
    name: 'Tennis Racket',
    price: 119.99,
    category: 'Sports',
    stock: 15,
    description: 'Professional-grade tennis racket with cover',
  },
];

function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [products, debouncedSearchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'> & { id?: number }) => {
    if (productData.id) {
      setProducts(products.map((p) => (p.id === productData.id ? (productData as Product) : p)));
    } else {
      const newProduct: Product = {
        ...productData,
        id: Math.max(...products.map((p) => p.id), 0) + 1,
      } as Product;
      setProducts([newProduct, ...products]);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory with ease</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <div className="flex bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 py-12 text-center">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onEdit={handleEditProduct} />
                ))}
              </div>
            ) : (
              <div className="mb-6">
                <ProductTable products={paginatedProducts} onEdit={handleEditProduct} />
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={CATEGORIES}
      />
    </div>
  );
}

export default App;
