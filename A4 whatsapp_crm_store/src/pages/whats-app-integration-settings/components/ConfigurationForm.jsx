import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ConfigurationForm = ({ provider, config, onConfigChange, onSave, isSaving }) => {
  const [showApiKey, setShowApiKey] = useState(false);

  const getProviderConfig = () => {
    switch (provider) {
      case 'whatsapp-web':
        return {
          title: 'Configuración WhatsApp-web.js',
          fields: [
            { key: 'sessionName', label: 'Nombre de Sesión', type: 'text', required: true, placeholder: 'mi-tienda-session' },
            { key: 'webhookUrl', label: 'URL del Webhook', type: 'url', required: false, placeholder: 'https://mi-tienda.com/webhook' }
          ]
        };
      case 'ultramsg':
        return {
          title: 'Configuración UltraMsg API',
          fields: [
            { key: 'instanceId', label: 'ID de Instancia', type: 'text', required: true, placeholder: 'instance12345' },
            { key: 'apiKey', label: 'Clave API', type: 'password', required: true, placeholder: 'tu-api-key-aqui' },
            { key: 'webhookUrl', label: 'URL del Webhook', type: 'url', required: false, placeholder: 'https://mi-tienda.com/webhook' }
          ]
        };
      case 'chatapi':
        return {
          title: 'Configuración ChatAPI',
          fields: [
            { key: 'instanceId', label: 'ID de Instancia', type: 'text', required: true, placeholder: 'chatapi123' },
            { key: 'apiKey', label: 'Token API', type: 'password', required: true, placeholder: 'tu-token-aqui' },
            { key: 'webhookUrl', label: 'URL del Webhook', type: 'url', required: false, placeholder: 'https://mi-tienda.com/webhook' }
          ]
        };
      case 'meta-api':
        return {
          title: 'Configuración Meta WhatsApp API',
          fields: [
            { key: 'phoneNumberId', label: 'ID del Número de Teléfono', type: 'text', required: true, placeholder: '1234567890123456' },
            { key: 'accessToken', label: 'Token de Acceso', type: 'password', required: true, placeholder: 'tu-access-token' },
            { key: 'appSecret', label: 'Secreto de la Aplicación', type: 'password', required: true, placeholder: 'tu-app-secret' },
            { key: 'webhookUrl', label: 'URL del Webhook', type: 'url', required: false, placeholder: 'https://mi-tienda.com/webhook' },
            { key: 'verifyToken', label: 'Token de Verificación', type: 'text', required: true, placeholder: 'mi-verify-token' }
          ]
        };
      default:
        return { title: 'Configuración', fields: [] };
    }
  };

  const providerConfig = getProviderConfig();

  const handleInputChange = (key, value) => {
    onConfigChange({
      ...config,
      [key]: value
    });
  };

  if (!provider) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="Settings" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Selecciona un Proveedor</h3>
          <p className="text-muted-foreground">Elige un proveedor de API para configurar la integración</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Key" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{providerConfig?.title}</h2>
          <p className="text-sm text-muted-foreground">Configura los parámetros de conexión</p>
        </div>
      </div>
      <form onSubmit={(e) => { e?.preventDefault(); onSave(); }} className="space-y-4">
        {providerConfig?.fields?.map((field) => (
          <div key={field?.key}>
            <Input
              label={field?.label}
              type={field?.type === 'password' && field?.key === 'apiKey' && showApiKey ? 'text' : field?.type}
              placeholder={field?.placeholder}
              required={field?.required}
              value={config?.[field?.key] || ''}
              onChange={(e) => handleInputChange(field?.key, e?.target?.value)}
              className="w-full"
            />
            {field?.type === 'password' && field?.key === 'apiKey' && (
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="mt-1 text-xs text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={12} />
                {showApiKey ? 'Ocultar' : 'Mostrar'} clave
              </button>
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <div className="flex gap-3">
            <Button
              type="submit"
              variant="default"
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
            >
              Guardar Configuración
            </Button>
            <Button
              type="button"
              variant="outline"
              iconName="TestTube"
              iconPosition="left"
            >
              Probar Conexión
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Información Importante</h4>
            <p className="text-xs text-muted-foreground">
              Asegúrate de que tu webhook esté configurado correctamente para recibir mensajes entrantes.
              La URL debe ser accesible públicamente y responder con código 200.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationForm;