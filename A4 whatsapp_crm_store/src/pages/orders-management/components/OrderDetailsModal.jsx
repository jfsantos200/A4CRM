import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const OrderDetailsModal = ({ isOpen, order, onClose, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState(order?.status || '');

  const statusOptions = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'processing', label: 'Procesando' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'delivered', label: 'Entregado' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const handleUpdateStatus = () => {
    if (newStatus !== order?.status) {
      onUpdateStatus(order?.id, newStatus);
    }
  };

  // Mock communication history
  const communicationHistory = [
    {
      id: 1,
      type: 'whatsapp',
      message: 'Pedido confirmado. Procesaremos su solicitud en breve.',
      timestamp: new Date(Date.now() - 3600000)?.toISOString(),
      direction: 'outbound'
    },
    {
      id: 2,
      type: 'whatsapp',
      message: '¡Perfecto! Gracias por la confirmación.',
      timestamp: new Date(Date.now() - 3000000)?.toISOString(),
      direction: 'inbound'
    },
    {
      id: 3,
      type: 'email',
      message: 'Factura enviada por correo electrónico.',
      timestamp: new Date(Date.now() - 7200000)?.toISOString(),
      direction: 'outbound'
    }
  ];

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Detalles del Pedido #{order?.orderNumber}</h2>
            <p className="text-sm text-muted-foreground">Creado el {formatDate(order?.date)}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="User" size={18} />
                  Información del Cliente
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-foreground">{order?.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order?.customerEmail}</p>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Package" size={18} />
                  Estado del Pedido
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estado actual:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status)}`}>
                      {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estado del pago:</span>
                    <span className={`font-medium ${getPaymentStatusColor(order?.paymentStatus)}`}>
                      {order?.paymentStatus?.charAt(0)?.toUpperCase() + order?.paymentStatus?.slice(1)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <Select
                      label="Actualizar estado"
                      options={statusOptions}
                      value={newStatus}
                      onChange={setNewStatus}
                    />
                    {newStatus !== order?.status && (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Check"
                        iconPosition="left"
                        onClick={handleUpdateStatus}
                        className="mt-2"
                      >
                        Actualizar Estado
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Communication History */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="MessageSquare" size={18} />
                  Historial de Comunicación
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {communicationHistory?.map((comm) => (
                    <div key={comm?.id} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        comm?.direction === 'outbound' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon name={comm?.type === 'whatsapp' ? 'MessageSquare' : 'Mail'} size={14} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{comm?.message}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(comm?.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Order Items */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="ShoppingCart" size={18} />
                  Productos del Pedido
                </h3>
                <div className="space-y-3">
                  {order?.items?.map((item) => (
                    <div key={item?.id} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item?.price)} × {item?.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-foreground">
                        {formatCurrency(item?.price * item?.quantity)}
                      </span>
                    </div>
                  )) || (
                    <div className="text-center text-muted-foreground py-4">
                      No hay productos disponibles
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Calculator" size={18} />
                  Resumen del Pedido
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="text-foreground">{formatCurrency(order?.subtotal || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IVA (21%):</span>
                    <span className="text-foreground">{formatCurrency(order?.tax || 0)}</span>
                  </div>
                  {order?.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Descuento:</span>
                      <span className="text-green-600">-{formatCurrency(order?.discount)}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total:</span>
                      <span className="font-semibold text-lg text-foreground">{formatCurrency(order?.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {order?.notes && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Icon name="FileText" size={18} />
                    Notas del Pedido
                  </h3>
                  <p className="text-foreground">{order?.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex gap-2">
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
            >
              Generar Factura
            </Button>
            <Button
              variant="outline"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Enviar WhatsApp
            </Button>
          </div>
          
          <Button variant="ghost" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;