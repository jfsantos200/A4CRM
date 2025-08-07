import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'order',
      title: 'Nuevo pedido recibido',
      description: 'Pedido #1234 por María González - €89.50',
      timestamp: '2025-01-07T18:45:00',
      icon: 'ShoppingCart',
      iconColor: 'text-success'
    },
    {
      id: 2,
      type: 'customer',
      title: 'Nuevo cliente registrado',
      description: 'Carlos Ruiz se unió desde WhatsApp',
      timestamp: '2025-01-07T17:30:00',
      icon: 'UserPlus',
      iconColor: 'text-primary'
    },
    {
      id: 3,
      type: 'whatsapp',
      title: 'Mensaje enviado',
      description: 'Promoción de enero enviada a 45 clientes',
      timestamp: '2025-01-07T16:15:00',
      icon: 'MessageSquare',
      iconColor: 'text-accent'
    },
    {
      id: 4,
      type: 'product',
      title: 'Stock bajo',
      description: 'Camiseta Azul - Solo quedan 3 unidades',
      timestamp: '2025-01-07T15:20:00',
      icon: 'AlertTriangle',
      iconColor: 'text-warning'
    },
    {
      id: 5,
      type: 'order',
      title: 'Pedido completado',
      description: 'Pedido #1230 entregado a Ana López',
      timestamp: '2025-01-07T14:10:00',
      icon: 'CheckCircle',
      iconColor: 'text-success'
    }
  ];

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `hace ${hours}h`;
    } else {
      return date?.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Actividad Reciente</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Ver todo
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`p-2 rounded-full bg-muted ${activity?.iconColor}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground mb-1">
                {activity?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {activity?.description}
              </p>
              <span className="text-xs text-muted-foreground">
                {formatTime(activity?.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;