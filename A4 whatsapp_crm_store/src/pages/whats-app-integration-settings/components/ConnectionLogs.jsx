import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConnectionLogs = ({ logs, onRefresh, onClearLogs }) => {
  const [filter, setFilter] = useState('all');

  const logTypes = [
    { value: 'all', label: 'Todos', count: logs?.length },
    { value: 'info', label: 'Info', count: logs?.filter(log => log?.type === 'info')?.length },
    { value: 'warning', label: 'Advertencias', count: logs?.filter(log => log?.type === 'warning')?.length },
    { value: 'error', label: 'Errores', count: logs?.filter(log => log?.type === 'error')?.length },
    { value: 'success', label: 'Éxito', count: logs?.filter(log => log?.type === 'success')?.length }
  ];

  const filteredLogs = filter === 'all' ? logs : logs?.filter(log => log?.type === filter);

  const getLogConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20'
        };
      case 'error':
        return {
          icon: 'XCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20'
        };
      default:
        return {
          icon: 'Info',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20'
        };
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Registro de Conexión</h2>
            <p className="text-sm text-muted-foreground">Historial de eventos y errores</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Actualizar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearLogs}
            iconName="Trash2"
            iconPosition="left"
            className="text-error hover:text-error hover:bg-error/10"
          >
            Limpiar
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {logTypes?.map((type) => (
          <button
            key={type?.value}
            onClick={() => setFilter(type?.value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === type?.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {type?.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              filter === type?.value
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {type?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Logs List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredLogs?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              {filter === 'all' ? 'No hay registros' : `No hay registros de ${logTypes?.find(t => t?.value === filter)?.label?.toLowerCase()}`}
            </h3>
            <p className="text-muted-foreground">Los eventos de conexión aparecerán aquí</p>
          </div>
        ) : (
          filteredLogs?.map((log) => {
            const config = getLogConfig(log?.type);
            return (
              <div
                key={log?.id}
                className={`border rounded-lg p-4 ${config?.borderColor} ${config?.bgColor}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config?.bgColor}`}>
                    <Icon name={config?.icon} size={16} className={config?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground">{log?.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(log?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{log?.message}</p>
                    
                    {log?.details && (
                      <div className="bg-muted/50 rounded-md p-2 mt-2">
                        <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                          {typeof log?.details === 'object' ? JSON.stringify(log?.details, null, 2) : log?.details}
                        </pre>
                      </div>
                    )}

                    {log?.action && (
                      <div className="mt-2">
                        <button className={`text-xs font-medium ${config?.color} hover:underline`}>
                          {log?.action}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Auto-refresh indicator */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Actualización automática cada 30 segundos</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span>En vivo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionLogs;