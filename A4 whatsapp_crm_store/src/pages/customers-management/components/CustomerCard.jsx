import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerCard = ({ customer, onEdit, onView, onWhatsApp }) => {
  const getTagColor = (color) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors?.[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })?.format(new Date(date));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={customer?.avatar}
            alt={customer?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-foreground truncate">{customer?.name}</h3>
              <p className="text-sm text-muted-foreground">{customer?.email}</p>
            </div>
            <div className="flex gap-1 ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onWhatsApp(customer)}
                className="w-8 h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                iconName="MessageSquare"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView(customer)}
                className="w-8 h-8"
                iconName="Eye"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Phone" size={14} />
              <span>{customer?.phone}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Calendar" size={14} />
                <span>Última interacción: {formatDate(customer?.lastInteraction)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">Total compras: </span>
                <span className="font-medium text-foreground">{formatCurrency(customer?.totalPurchases)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {customer?.orderCount} pedidos
              </div>
            </div>

            {customer?.tags && customer?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {customer?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full border ${getTagColor(tag?.color)}`}
                  >
                    {tag?.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;