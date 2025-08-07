import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onEdit, onDuplicate, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  const getStockStatusColor = (stock) => {
    if (stock === 0) return 'bg-red-100 text-red-800 border-red-200';
    if (stock <= 10) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStockStatusText = (stock) => {
    if (stock === 0) return 'Agotado';
    if (stock <= 10) return 'Stock Bajo';
    return 'En Stock';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        
        {/* Stock Status Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium border ${getStockStatusColor(product?.stock)}`}>
          {getStockStatusText(product?.stock)}
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {product?.category}
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-2">
            {product?.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product?.description}
          </p>
        </div>

        {/* Price and Stock Info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-primary">
              {formatPrice(product?.price)}
            </div>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Stock</div>
            <div className="font-semibold text-foreground">{product?.stock} unidades</div>
          </div>
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted rounded-md">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">SKU</div>
            <div className="font-medium text-sm">{product?.sku}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Vendidos</div>
            <div className="font-medium text-sm">{product?.soldCount || 0}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEdit(product)}
            className="flex-1"
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Copy"
            onClick={() => onDuplicate(product)}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(product)}
            className="text-destructive hover:text-destructive"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;