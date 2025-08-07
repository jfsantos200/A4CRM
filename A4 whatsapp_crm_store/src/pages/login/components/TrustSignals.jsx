import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const features = [
    {
      icon: 'Shield',
      title: 'Seguro y Confiable',
      description: 'Autenticación JWT y datos encriptados'
    },
    {
      icon: 'MessageSquare',
      title: 'Integración WhatsApp',
      description: 'Conecta directamente con tus clientes'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics en Tiempo Real',
      description: 'Métricas de ventas y clientes actualizadas'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      business: 'Boutique Luna',
      text: 'Desde que uso este CRM, mis ventas por WhatsApp aumentaron un 40%',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      business: 'Electrónicos CR',
      text: 'La gestión de inventario y clientes nunca fue tan fácil',
      rating: 5
    }
  ];

  return (
    <div className="space-y-8">
      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features?.map((feature, index) => (
          <div key={index} className="text-center p-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">
              {feature?.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-center text-sm font-medium text-foreground">
          Testimonios de Nuestros Usuarios
        </h3>
        <div className="space-y-3">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={12} color="var(--color-warning)" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                "{testimonial?.text}"
              </p>
              <div className="text-xs">
                <span className="font-medium text-foreground">{testimonial?.name}</span>
                <span className="text-muted-foreground"> - {testimonial?.business}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-success/10 rounded-full">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="text-xs font-medium text-success">
            Certificado SSL • Datos Protegidos
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;