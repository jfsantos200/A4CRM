import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      label: 'Añadir Producto',
      description: 'Agregar nuevo producto al inventario',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/products-management')
    },
    {
      id: 2,
      label: 'Nuevo Pedido',
      description: 'Crear pedido para cliente',
      icon: 'ShoppingCart',
      variant: 'outline',
      onClick: () => navigate('/orders-management')
    },
    {
      id: 3,
      label: 'Añadir Cliente',
      description: 'Registrar nuevo cliente',
      icon: 'UserPlus',
      variant: 'outline',
      onClick: () => navigate('/customers-management')
    },
    {
      id: 4,
      label: 'Enviar WhatsApp',
      description: 'Mensaje masivo o individual',
      icon: 'MessageSquare',
      variant: 'success',
      onClick: () => navigate('/whats-app-integration-settings')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-6">Acciones Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div key={action?.id} className="space-y-3">
            <Button
              variant={action?.variant}
              fullWidth
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.onClick}
              className="justify-start h-12"
            >
              {action?.label}
            </Button>
            <p className="text-xs text-muted-foreground px-2">
              {action?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estado WhatsApp:</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-success font-medium">Conectado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;