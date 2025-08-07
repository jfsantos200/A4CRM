import React from 'react';

import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onViewDetails, onUpdateStatus, onGenerateInvoice }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      shipped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      paid: 'text-green-600',
      pending: 'text-amber-600',
      failed: 'text-red-600',
      refunded: 'text-purple-600'
    };
    return colors?.[status] || 'text-gray-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">#{order?.orderNumber}</h3>
          <p className="text-sm text-muted-foreground">{order?.customerName}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
          {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
        </span>
      </div>
      {/* Order Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Fecha:</span>
          <span className="text-foreground">{formatDate(order?.date)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-semibold text-foreground">{formatCurrency(order?.total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Pago:</span>
          <span className={`font-medium ${getPaymentStatusColor(order?.paymentStatus)}`}>
            {order?.paymentStatus?.charAt(0)?.toUpperCase() + order?.paymentStatus?.slice(1)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Productos:</span>
          <span className="text-foreground">{order?.itemCount} artículos</span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(order)}
          className="flex-1"
        >
          Ver Detalles
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Edit"
          onClick={() => onUpdateStatus(order)}
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="FileText"
          onClick={() => onGenerateInvoice(order)}
        />
      </div>
    </div>
  );
};

export default OrderCard;