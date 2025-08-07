import React from 'react';

import Button from '../../../components/ui/Button';

const OrderTable = ({ orders, onViewDetails, onUpdateStatus, onGenerateInvoice }) => {
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
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">Pedido</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Cliente</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Fecha</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Total</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Pago</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Productos</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-foreground">#{order?.orderNumber}</div>
                </td>
                <td className="p-4">
                  <div className="text-foreground">{order?.customerName}</div>
                  <div className="text-sm text-muted-foreground">{order?.customerEmail}</div>
                </td>
                <td className="p-4 text-foreground">{formatDate(order?.date)}</td>
                <td className="p-4">
                  <div className="font-semibold text-foreground">{formatCurrency(order?.total)}</div>
                </td>
                <td className="p-4">
                  <span className={`font-medium ${getPaymentStatusColor(order?.paymentStatus)}`}>
                    {order?.paymentStatus?.charAt(0)?.toUpperCase() + order?.paymentStatus?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                    {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-foreground">{order?.itemCount} artículos</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(order)}
                      title="Ver detalles"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onUpdateStatus(order)}
                      title="Actualizar estado"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="FileText"
                      onClick={() => onGenerateInvoice(order)}
                      title="Generar factura"
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

export default OrderTable;