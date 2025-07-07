import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProductCard } from '@/components/Products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from '@/components/Auth/LoginModal';
import { Search, Filter, TrendingUp, Star, Users } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  sellerName: string;
  sellerId: string;
  category: string;
  description: string;
  createdAt: Date;
}

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'electronics', 'fashion', 'home', 'books', 'sports', 'beauty'];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // For demo purposes, we'll show sample products
      // In a real app, you'd fetch from Firestore
      const sampleProducts: Product[] = [
        {
          id: '1',
          title: 'Wireless Headphones',
          price: 99.99,
          image: '/placeholder.svg',
          sellerName: 'TechStore',
          sellerId: 'seller1',
          category: 'electronics',
          description: 'High-quality wireless headphones with noise cancellation',
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'Cotton T-Shirt',
          price: 29.99,
          image: '/placeholder.svg',
          sellerName: 'FashionHub',
          sellerId: 'seller2',
          category: 'fashion',
          description: 'Comfortable cotton t-shirt in various colors',
          createdAt: new Date()
        },
        {
          id: '3',
          title: 'Coffee Maker',
          price: 159.99,
          image: '/placeholder.svg',
          sellerName: 'HomeGoods',
          sellerId: 'seller3',
          category: 'home',
          description: 'Automatic coffee maker with timer function',
          createdAt: new Date()
        }
      ];
      
      setProducts(sampleProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatToOrder = (productId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // Navigate to chat with seller
    console.log('Starting chat for product:', productId);
  };

  const handleAddToCart = (productId: string) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // Add to cart logic
    console.log('Adding to cart:', productId);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to Shopa
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing products from trusted sellers. Chat directly with sellers to get the best deals.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                <span className="font-semibold">1000+</span>
              </div>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-primary mr-2" />
                <span className="font-semibold">500+</span>
              </div>
              <p className="text-sm text-muted-foreground">Sellers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-primary mr-2" />
                <span className="font-semibold">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onChatToOrder={handleChatToOrder}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Want to start selling?</h3>
          <p className="text-muted-foreground mb-6">
            Join hundreds of sellers and start your business on Shopa today.
          </p>
          <Button size="lg">Become a Seller</Button>
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};