import React from 'react';
import Icon from '../../../components/AppIcon';

const ProviderSelection = ({ selectedProvider, onProviderChange }) => {
  const providers = [
    {
      id: 'whatsapp-web',
      name: 'WhatsApp-web.js',
      description: 'Biblioteca de código abierto que se conecta a través de WhatsApp Web',
      features: ['Gratuito', 'Fácil configuración', 'Funciones básicas'],
      icon: 'MessageSquare',
      recommended: false
    },
    {
      id: 'ultramsg',
      name: 'UltraMsg API',
      description: 'API comercial con funciones avanzadas y soporte técnico',
      features: ['API REST', 'Webhooks', 'Soporte 24/7'],
      icon: 'Zap',
      recommended: true
    },
    {
      id: 'chatapi',
      name: 'ChatAPI',
      description: 'Plataforma robusta para integración empresarial',
      features: ['Alta disponibilidad', 'Escalable', 'Análisis avanzado'],
      icon: 'MessageCircle',
      recommended: false
    },
    {
      id: 'meta-api',
      name: 'Meta WhatsApp API',
      description: 'API oficial de Meta para WhatsApp Business',
      features: ['Oficial', 'Máxima confiabilidad', 'Funciones completas'],
      icon: 'Shield',
      recommended: false
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Seleccionar Proveedor</h2>
          <p className="text-sm text-muted-foreground">Elige el proveedor de API de WhatsApp para tu tienda</p>
        </div>
      </div>
      <div className="grid gap-4">
        {providers?.map((provider) => (
          <div
            key={provider?.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedProvider === provider?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => onProviderChange(provider?.id)}
          >
            {provider?.recommended && (
              <div className="absolute -top-2 right-4">
                <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                  Recomendado
                </span>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="provider"
                  value={provider?.id}
                  checked={selectedProvider === provider?.id}
                  onChange={() => onProviderChange(provider?.id)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    selectedProvider === provider?.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <Icon name={provider?.icon} size={16} />
                  </div>
                  <h3 className="font-medium text-foreground">{provider?.name}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{provider?.description}</p>

                <div className="flex flex-wrap gap-2">
                  {provider?.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderSelection;