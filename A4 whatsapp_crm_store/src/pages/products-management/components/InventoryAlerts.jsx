import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryAlerts = ({ products, onProductClick }) => {
  const lowStockProducts = products?.filter(product => product?.stock > 0 && product?.stock <= 10);
  const outOfStockProducts = products?.filter(product => product?.stock === 0);
  const overstockProducts = products?.filter(product => product?.stock > 100);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(price);
  };

  const AlertSection = ({ title, products, icon, bgColor, textColor, emptyMessage }) => (
    <div className="mb-6">
      <div className={`flex items-center gap-2 p-3 rounded-lg ${bgColor} mb-3`}>
        <Icon name={icon} size={18} className={textColor} />
        <h3 className={`font-medium ${textColor}`}>
          {title} ({products?.length})
        </h3>
      </div>
      
      {products?.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-2">
          {products?.slice(0, 5)?.map((product) => (
            <div
              key={product?.id}
              className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">
                    {product?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    SKU: {product?.sku} • {formatPrice(product?.price)}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-foreground">
                  {product?.stock} unidades
                </div>
                <div className="text-xs text-muted-foreground">
                  {product?.category}
                </div>
              </div>
            </div>
          ))}
          
          {products?.length > 5 && (
            <div className="text-center pt-2">
              <Button variant="ghost" size="sm">
                Ver {products?.length - 5} más
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Alertas de Inventario</h2>
        <Button variant="ghost" size="sm" iconName="RefreshCw">
          Actualizar
        </Button>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={16} className="text-red-600" />
              <span className="text-sm font-medium text-red-800">Productos Agotados</span>
            </div>
            <span className="text-lg font-bold text-red-600">{outOfStockProducts?.length}</span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="AlertCircle" size={16} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Stock Bajo</span>
            </div>
            <span className="text-lg font-bold text-yellow-600">{lowStockProducts?.length}</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Exceso de Stock</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{overstockProducts?.length}</span>
          </div>
        </div>
      </div>
      {/* Detailed Alerts */}
      <div className="space-y-6">
        <AlertSection
          title="Productos Agotados"
          products={outOfStockProducts}
          icon="AlertTriangle"
          bgColor="bg-red-50 border border-red-200"
          textColor="text-red-800"
          emptyMessage="¡Excelente! No hay productos agotados."
        />

        <AlertSection
          title="Stock Bajo (≤10 unidades)"
          products={lowStockProducts}
          icon="AlertCircle"
          bgColor="bg-yellow-50 border border-yellow-200"
          textColor="text-yellow-800"
          emptyMessage="Todos los productos tienen stock suficiente."
        />

        <AlertSection
          title="Exceso de Stock (>100 unidades)"
          products={overstockProducts}
          icon="TrendingUp"
          bgColor="bg-blue-50 border border-blue-200"
          textColor="text-blue-800"
          emptyMessage="No hay productos con exceso de stock."
        />
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">Acciones Rápidas</h4>
        <div className="grid grid-cols-1 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ShoppingCart"
            iconPosition="left"
            fullWidth
            disabled={outOfStockProducts?.length === 0}
          >
            Reabastecer Productos Agotados ({outOfStockProducts?.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Package"
            iconPosition="left"
            fullWidth
            disabled={lowStockProducts?.length === 0}
          >
            Revisar Stock Bajo ({lowStockProducts?.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Exportar Reporte de Inventario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryAlerts;