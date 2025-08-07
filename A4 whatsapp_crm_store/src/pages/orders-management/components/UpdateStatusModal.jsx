import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const UpdateStatusModal = ({ isOpen, order, onClose, onUpdateStatus }) => {
  const [newStatus, setNewStatus] = useState(order?.status || '');
  const [notifyCustomer, setNotifyCustomer] = useState(true);
  const [customMessage, setCustomMessage] = useState('');

  const statusOptions = [
    { value: 'pending', label: 'Pendiente', description: 'El pedido está pendiente de confirmación' },
    { value: 'confirmed', label: 'Confirmado', description: 'El pedido ha sido confirmado y será procesado' },
    { value: 'processing', label: 'Procesando', description: 'El pedido está siendo preparado' },
    { value: 'shipped', label: 'Enviado', description: 'El pedido ha sido enviado al cliente' },
    { value: 'delivered', label: 'Entregado', description: 'El pedido ha sido entregado exitosamente' },
    { value: 'cancelled', label: 'Cancelado', description: 'El pedido ha sido cancelado' }
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

  const getDefaultMessage = (status) => {
    const messages = {
      pending: `Hola ${order?.customerName}, tu pedido #${order?.orderNumber} está pendiente de confirmación. Te notificaremos cuando sea procesado.`,
      confirmed: `¡Hola ${order?.customerName}! Tu pedido #${order?.orderNumber} ha sido confirmado y será procesado en breve.`,
      processing: `Hola ${order?.customerName}, tu pedido #${order?.orderNumber} está siendo preparado. Te notificaremos cuando esté listo para envío.`,
      shipped: `¡Tu pedido #${order?.orderNumber} ha sido enviado! Recibirás información de seguimiento pronto.`,
      delivered: `¡Perfecto! Tu pedido #${order?.orderNumber} ha sido entregado exitosamente. ¡Gracias por tu compra!`,
      cancelled: `Lamentamos informarte que tu pedido #${order?.orderNumber} ha sido cancelado. Contacta con nosotros si tienes dudas.`
    };
    return messages?.[status] || '';
  };

  const handleStatusChange = (status) => {
    setNewStatus(status);
    if (notifyCustomer) {
      setCustomMessage(getDefaultMessage(status));
    }
  };

  const handleNotifyChange = (checked) => {
    setNotifyCustomer(checked);
    if (checked && newStatus) {
      setCustomMessage(getDefaultMessage(newStatus));
    } else {
      setCustomMessage('');
    }
  };

  const handleUpdateStatus = () => {
    onUpdateStatus(order?.id, newStatus, {
      notifyCustomer,
      customMessage: notifyCustomer ? customMessage : ''
    });
    onClose();
  };

  const canUpdate = newStatus && newStatus !== order?.status;
  const selectedStatusOption = statusOptions?.find(opt => opt?.value === newStatus);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Actualizar Estado del Pedido</h2>
            <p className="text-sm text-muted-foreground">Pedido #{order?.orderNumber} - {order?.customerName}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Status */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Estado Actual</h3>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order?.status)}`}>
              {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
            </span>
          </div>

          {/* New Status Selection */}
          <div>
            <Select
              label="Nuevo Estado"
              description="Selecciona el nuevo estado para este pedido"
              options={statusOptions}
              value={newStatus}
              onChange={handleStatusChange}
            />
            
            {selectedStatusOption && (
              <div className="mt-3 p-3 bg-muted/30 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(newStatus)}`}>
                    {selectedStatusOption?.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedStatusOption?.description}</p>
              </div>
            )}
          </div>

          {/* Customer Notification */}
          <div className="space-y-4">
            <Checkbox
              label="Notificar al cliente por WhatsApp"
              description="Enviar un mensaje automático al cliente informando sobre el cambio de estado"
              checked={notifyCustomer}
              onChange={(e) => handleNotifyChange(e?.target?.checked)}
            />

            {notifyCustomer && (
              <div className="space-y-3">
                <Input
                  label="Mensaje personalizado"
                  description="Personaliza el mensaje que se enviará al cliente"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e?.target?.value)}
                  placeholder="Escribe un mensaje personalizado..."
                />
                
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MessageSquare" size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-foreground">Vista previa del mensaje</span>
                  </div>
                  <p className="text-sm text-muted-foreground bg-card p-3 rounded border-l-4 border-green-500">
                    {customMessage || 'Escribe un mensaje para ver la vista previa...'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Status Timeline Preview */}
          {newStatus && newStatus !== order?.status && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Progreso del Pedido</h3>
              <div className="space-y-2">
                {statusOptions?.slice(0, statusOptions?.findIndex(opt => opt?.value === newStatus) + 1)?.map((status, index) => (
                  <div key={status.value} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      status.value === newStatus ? 'bg-primary' : 
                      statusOptions?.findIndex(opt => opt?.value === status.value) <= statusOptions?.findIndex(opt => opt?.value === order?.status) 
                        ? 'bg-green-500' : 'bg-muted-foreground'
                    }`} />
                    <span className={`text-sm ${
                      status.value === newStatus ? 'font-medium text-primary' : 'text-muted-foreground'
                    }`}>
                      {status.label}
                    </span>
                    {status.value === newStatus && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Nuevo
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          
          <Button
            variant="default"
            iconName="Check"
            iconPosition="left"
            onClick={handleUpdateStatus}
            disabled={!canUpdate}
          >
            Actualizar Estado
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;