import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ selectedProducts, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');

  const bulkActionOptions = [
    { value: '', label: 'Seleccionar acción...' },
    { value: 'activate', label: 'Activar productos' },
    { value: 'deactivate', label: 'Desactivar productos' },
    { value: 'feature', label: 'Marcar como destacados' },
    { value: 'unfeature', label: 'Quitar de destacados' },
    { value: 'update-category', label: 'Cambiar categoría' },
    { value: 'update-price', label: 'Actualizar precios' },
    { value: 'export', label: 'Exportar seleccionados' },
    { value: 'delete', label: 'Eliminar productos' }
  ];

  const handleApplyAction = () => {
    if (selectedAction && selectedProducts?.length > 0) {
      onBulkAction(selectedAction, selectedProducts);
      setSelectedAction('');
    }
  };

  if (selectedProducts?.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 min-w-[400px]">
        <div className="flex items-center gap-4">
          {/* Selection Info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
            <div>
              <div className="font-medium text-foreground">
                {selectedProducts?.length} producto{selectedProducts?.length !== 1 ? 's' : ''} seleccionado{selectedProducts?.length !== 1 ? 's' : ''}
              </div>
              <div className="text-xs text-muted-foreground">
                Elige una acción para aplicar
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Acción..."
              className="min-w-[180px]"
            />

            <Button
              variant="default"
              size="sm"
              onClick={handleApplyAction}
              disabled={!selectedAction}
              iconName="Play"
              iconPosition="left"
            >
              Aplicar
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
            >
              Cancelar
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkAction('activate', selectedProducts)}
            iconName="Eye"
            iconPosition="left"
          >
            Activar
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkAction('deactivate', selectedProducts)}
            iconName="EyeOff"
            iconPosition="left"
          >
            Desactivar
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkAction('feature', selectedProducts)}
            iconName="Star"
            iconPosition="left"
          >
            Destacar
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkAction('export', selectedProducts)}
            iconName="Download"
            iconPosition="left"
          >
            Exportar
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkAction('delete', selectedProducts)}
            iconName="Trash2"
            iconPosition="left"
            className="text-destructive hover:text-destructive"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;