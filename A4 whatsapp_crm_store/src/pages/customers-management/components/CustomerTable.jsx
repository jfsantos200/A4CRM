import React from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerTable = ({ customers, onEdit, onView, onWhatsApp, onSelectCustomer, selectedCustomers }) => {
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

  const isSelected = (customerId) => selectedCustomers?.includes(customerId);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      onSelectCustomer(customers?.map(c => c?.id));
                    } else {
                      onSelectCustomer([]);
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Cliente</th>
              <th className="text-left p-4 font-medium text-foreground">Contacto</th>
              <th className="text-left p-4 font-medium text-foreground">Última Interacción</th>
              <th className="text-left p-4 font-medium text-foreground">Total Compras</th>
              <th className="text-left p-4 font-medium text-foreground">Etiquetas</th>
              <th className="text-center p-4 font-medium text-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => (
              <tr key={customer?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={isSelected(customer?.id)}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        onSelectCustomer([...selectedCustomers, customer?.id]);
                      } else {
                        onSelectCustomer(selectedCustomers?.filter(id => id !== customer?.id));
                      }
                    }}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={customer?.avatar}
                        alt={customer?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{customer?.name}</div>
                      <div className="text-sm text-muted-foreground">{customer?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{customer?.phone}</div>
                  <div className="text-xs text-muted-foreground">{customer?.location}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{formatDate(customer?.lastInteraction)}</div>
                  <div className="text-xs text-muted-foreground">{customer?.interactionType}</div>
                </td>
                <td className="p-4">
                  <div className="text-sm font-medium text-foreground">{formatCurrency(customer?.totalPurchases)}</div>
                  <div className="text-xs text-muted-foreground">{customer?.orderCount} pedidos</div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {customer?.tags && customer?.tags?.slice(0, 2)?.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full border ${getTagColor(tag?.color)}`}
                      >
                        {tag?.name}
                      </span>
                    ))}
                    {customer?.tags && customer?.tags?.length > 2 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                        +{customer?.tags?.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-1">
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(customer)}
                      className="w-8 h-8"
                      iconName="Edit"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;