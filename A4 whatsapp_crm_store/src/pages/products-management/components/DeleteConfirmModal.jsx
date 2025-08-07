import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, products, type = 'single' }) => {
  if (!isOpen) return null;

  const isBulk = type === 'bulk' && Array.isArray(products);
  const productCount = isBulk ? products?.length : 1;
  const productName = isBulk ? `${productCount} productos` : products?.name || 'este producto';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(price);
  };

  const getTotalValue = () => {
    if (isBulk) {
      return products?.reduce((sum, product) => sum + (product?.price * product?.stock), 0);
    }
    return products ? products?.price * products?.stock : 0;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={24} className="text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Confirmar Eliminación
            </h2>
            <p className="text-sm text-muted-foreground">
              Esta acción no se puede deshacer
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-foreground mb-2">
              ¿Estás seguro de que deseas eliminar <strong>{productName}</strong>?
            </p>
            
            {!isBulk && products && (
              <div className="bg-muted rounded-lg p-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-background border border-border rounded-lg overflow-hidden">
                    <img
                      src={products?.image}
                      alt={products?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{products?.name}</div>
                    <div className="text-sm text-muted-foreground">
                      SKU: {products?.sku} • {formatPrice(products?.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Stock: {products?.stock} unidades
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isBulk && (
              <div className="bg-muted rounded-lg p-3 mb-4">
                <div className="text-sm text-muted-foreground mb-2">Productos seleccionados:</div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {products?.slice(0, 5)?.map((product) => (
                    <div key={product?.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground truncate">{product?.name}</span>
                      <span className="text-muted-foreground">{formatPrice(product?.price)}</span>
                    </div>
                  ))}
                  {products?.length > 5 && (
                    <div className="text-xs text-muted-foreground text-center pt-1">
                      ... y {products?.length - 5} más
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Impact Warning */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Icon name="AlertCircle" size={16} className="text-red-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-red-800 mb-1">Impacto de la eliminación:</div>
                  <ul className="text-red-700 space-y-1">
                    <li>• Se perderá el historial de ventas asociado</li>
                    <li>• Valor total del inventario: {formatPrice(getTotalValue())}</li>
                    <li>• Los pedidos existentes no se verán afectados</li>
                    {isBulk && <li>• Se eliminarán {productCount} productos permanentemente</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Actions */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              ¿Prefieres una alternativa menos drástica?
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="EyeOff"
                iconPosition="left"
                onClick={() => {
                  // Handle deactivate instead of delete
                  onClose();
                }}
              >
                Desactivar en su lugar
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Archive"
                iconPosition="left"
                onClick={() => {
                  // Handle archive instead of delete
                  onClose();
                }}
              >
                Archivar producto{isBulk ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-6 border-t border-border bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm(isBulk ? products : products);
              onClose();
            }}
            iconName="Trash2"
            iconPosition="left"
          >
            Eliminar {isBulk ? `${productCount} Productos` : 'Producto'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;