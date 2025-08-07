import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PhoneNumberManagement = ({ phoneNumbers, onAddNumber, onRemoveNumber, onSetPrimary }) => {
  const [newNumber, setNewNumber] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNumber = async () => {
    if (!newNumber?.trim()) return;
    
    setIsAdding(true);
    try {
      await onAddNumber(newNumber);
      setNewNumber('');
    } finally {
      setIsAdding(false);
    }
  };

  const formatPhoneNumber = (number) => {
    // Format Spanish phone number
    const cleaned = number?.replace(/\D/g, '');
    if (cleaned?.startsWith('34')) {
      return `+34 ${cleaned?.slice(2, 5)} ${cleaned?.slice(5, 8)} ${cleaned?.slice(8)}`;
    }
    return number;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Phone" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Gestión de Números</h2>
          <p className="text-sm text-muted-foreground">Administra los números de WhatsApp conectados</p>
        </div>
      </div>
      {/* Add New Number */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-3">Agregar Nuevo Número</h3>
        <div className="flex gap-3">
          <Input
            type="tel"
            placeholder="+34 612 345 678"
            value={newNumber}
            onChange={(e) => setNewNumber(e?.target?.value)}
            className="flex-1"
          />
          <Button
            onClick={handleAddNumber}
            loading={isAdding}
            iconName="Plus"
            iconPosition="left"
            disabled={!newNumber?.trim()}
          >
            Agregar
          </Button>
        </div>
      </div>
      {/* Phone Numbers List */}
      <div className="space-y-3">
        {phoneNumbers?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Phone" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No hay números configurados</h3>
            <p className="text-muted-foreground">Agrega un número de WhatsApp para comenzar</p>
          </div>
        ) : (
          phoneNumbers?.map((phone) => (
            <div
              key={phone?.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                phone?.isPrimary
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    phone?.isPrimary ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <Icon name="Phone" size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {formatPhoneNumber(phone?.number)}
                      </span>
                      {phone?.isPrimary && (
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                          Principal
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className={`text-xs flex items-center gap-1 ${
                        phone?.status === 'connected' ? 'text-success' : 
                        phone?.status === 'connecting' ? 'text-warning' : 'text-error'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          phone?.status === 'connected' ? 'bg-success' : 
                          phone?.status === 'connecting' ? 'bg-warning' : 'bg-error'
                        } ${phone?.status === 'connecting' ? 'animate-pulse' : ''}`} />
                        {phone?.status === 'connected' ? 'Conectado' : 
                         phone?.status === 'connecting' ? 'Conectando' : 'Desconectado'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Agregado: {new Date(phone.addedAt)?.toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!phone?.isPrimary && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSetPrimary(phone?.id)}
                      iconName="Star"
                      iconPosition="left"
                    >
                      Hacer Principal
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveNumber(phone?.id)}
                    className="text-error hover:text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>

              {/* Phone Statistics */}
              {phone?.stats && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{phone?.stats?.messagesSent}</div>
                      <div className="text-xs text-muted-foreground">Enviados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{phone?.stats?.messagesReceived}</div>
                      <div className="text-xs text-muted-foreground">Recibidos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">{phone?.stats?.uptime}</div>
                      <div className="text-xs text-muted-foreground">Tiempo activo</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* Info Box */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Información sobre Números</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• El número principal será usado para enviar mensajes automáticos</li>
              <li>• Puedes tener múltiples números conectados simultáneamente</li>
              <li>• Cada número debe estar verificado en WhatsApp Business</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberManagement;