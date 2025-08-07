import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductStats = ({ products }) => {
  const totalProducts = products?.length;
  const activeProducts = products?.filter(p => p?.isActive)?.length;
  const inStockProducts = products?.filter(p => p?.stock > 0)?.length;
  const lowStockProducts = products?.filter(p => p?.stock > 0 && p?.stock <= 10)?.length;
  const outOfStockProducts = products?.filter(p => p?.stock === 0)?.length;
  const featuredProducts = products?.filter(p => p?.isFeatured)?.length;

  const totalValue = products?.reduce((sum, product) => sum + (product?.price * product?.stock), 0);
  const averagePrice = totalProducts > 0 ? products?.reduce((sum, product) => sum + product?.price, 0) / totalProducts : 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(price);
  };

  const stats = [
    {
      label: 'Total Productos',
      value: totalProducts,
      icon: 'Package',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Productos Activos',
      value: activeProducts,
      icon: 'Eye',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'En Stock',
      value: inStockProducts,
      icon: 'CheckCircle',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      label: 'Stock Bajo',
      value: lowStockProducts,
      icon: 'AlertCircle',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      label: 'Agotados',
      value: outOfStockProducts,
      icon: 'AlertTriangle',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      label: 'Destacados',
      value: featuredProducts,
      icon: 'Star',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Estadísticas del Inventario</h2>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className={`${stat?.bgColor} ${stat?.borderColor} border rounded-lg p-3 text-center`}
          >
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-white mb-2`}>
              <Icon name={stat?.icon} size={16} className={stat?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="DollarSign" size={18} className="text-primary" />
            <h3 className="font-medium text-foreground">Valor Total del Inventario</h3>
          </div>
          <div className="text-2xl font-bold text-primary">
            {formatPrice(totalValue)}
          </div>
          <div className="text-sm text-muted-foreground">
            Basado en precios actuales y stock disponible
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={18} className="text-secondary" />
            <h3 className="font-medium text-foreground">Precio Promedio</h3>
          </div>
          <div className="text-2xl font-bold text-secondary">
            {formatPrice(averagePrice)}
          </div>
          <div className="text-sm text-muted-foreground">
            Precio promedio por producto
          </div>
        </div>
      </div>
      {/* Health Indicators */}
      <div className="mt-4 pt-4 border-t border-border">
        <h3 className="font-medium text-foreground mb-3">Estado del Inventario</h3>
        <div className="space-y-2">
          {/* Stock Health */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Productos con Stock Saludable</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-muted rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${totalProducts > 0 ? ((inStockProducts - lowStockProducts) / totalProducts) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {totalProducts > 0 ? Math.round(((inStockProducts - lowStockProducts) / totalProducts) * 100) : 0}%
              </span>
            </div>
          </div>

          {/* Active Products */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Productos Activos</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-muted rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${totalProducts > 0 ? (activeProducts / totalProducts) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {totalProducts > 0 ? Math.round((activeProducts / totalProducts) * 100) : 0}%
              </span>
            </div>
          </div>

          {/* Featured Products */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Productos Destacados</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-muted rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{
                    width: `${totalProducts > 0 ? (featuredProducts / totalProducts) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm font-medium text-foreground">
                {totalProducts > 0 ? Math.round((featuredProducts / totalProducts) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStats;