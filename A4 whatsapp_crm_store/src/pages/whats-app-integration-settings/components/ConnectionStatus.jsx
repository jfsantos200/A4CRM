import React from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = ({ status, lastConnected, messageStats }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          icon: 'CheckCircle',
          label: 'Conectado',
          description: 'WhatsApp está funcionando correctamente'
        };
      case 'connecting':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          icon: 'Loader',
          label: 'Conectando',
          description: 'Estableciendo conexión con WhatsApp'
        };
      case 'disconnected':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          icon: 'XCircle',
          label: 'Desconectado',
          description: 'No hay conexión con WhatsApp'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-border',
          icon: 'Circle',
          label: 'Sin configurar',
          description: 'Configura la integración para comenzar'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Estado de Conexión</h2>
          <p className="text-sm text-muted-foreground">Monitor en tiempo real de WhatsApp</p>
        </div>
      </div>
      {/* Status Card */}
      <div className={`border rounded-lg p-4 mb-6 ${statusConfig?.borderColor} ${statusConfig?.bgColor}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusConfig?.bgColor}`}>
            <Icon 
              name={statusConfig?.icon} 
              size={16} 
              className={`${statusConfig?.color} ${status === 'connecting' ? 'animate-spin' : ''}`} 
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium ${statusConfig?.color}`}>{statusConfig?.label}</h3>
              {status === 'connected' && (
                <div className={`w-2 h-2 rounded-full ${statusConfig?.color?.replace('text-', 'bg-')} animate-pulse`} />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{statusConfig?.description}</p>
          </div>
        </div>
      </div>
      {/* Connection Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Última conexión</span>
          <span className="text-sm font-medium text-foreground">
            {lastConnected ? new Date(lastConnected)?.toLocaleString('es-ES') : 'Nunca'}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-sm text-muted-foreground">Número conectado</span>
          <span className="text-sm font-medium text-foreground">
            {status === 'connected' ? '+34 612 345 678' : 'No disponible'}
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-muted-foreground">Tiempo de actividad</span>
          <span className="text-sm font-medium text-foreground">
            {status === 'connected' ? '2h 45m' : '0m'}
          </span>
        </div>
      </div>
      {/* Message Statistics */}
      {messageStats && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-4">Estadísticas de Mensajes (Hoy)</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold text-success">{messageStats?.sent}</div>
              <div className="text-xs text-muted-foreground">Enviados</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold text-primary">{messageStats?.received}</div>
              <div className="text-xs text-muted-foreground">Recibidos</div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex gap-2">
          {status === 'connected' && (
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-colors">
              <Icon name="Power" size={14} />
              Desconectar
            </button>
          )}
          {status === 'disconnected' && (
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-success hover:bg-success/10 rounded-md transition-colors">
              <Icon name="Power" size={14} />
              Reconectar
            </button>
          )}
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md transition-colors">
            <Icon name="RefreshCw" size={14} />
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;