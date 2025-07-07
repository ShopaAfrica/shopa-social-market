import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ShoppingCart, Heart, Share2 } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  onChatToOrder: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onChatToOrder, 
  onAddToCart 
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href + '/product/' + product.id
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href + '/product/' + product.id);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">
              by {product.sellerName}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onChatToOrder(product.id)}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat to Order
        </Button>
        <Button 
          className="flex-1"
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};