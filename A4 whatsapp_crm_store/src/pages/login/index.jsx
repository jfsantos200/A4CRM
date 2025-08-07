import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/dashboard');
    }

    // Set language preference if not exists
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (!savedLanguage) {
      localStorage.setItem('preferredLanguage', 'es');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LoginHeader />
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <LoginForm />
            </div>

            {/* Right Column - Trust Signals */}
            <div className="order-1 lg:order-2">
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Gestiona tu Tienda con WhatsApp
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  La plataforma CRM diseñada para pequeños negocios que venden a través de WhatsApp. 
                  Controla inventario, clientes y pedidos desde un solo lugar.
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Fácil de usar
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    Sin comisiones
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                    Soporte 24/7
                  </span>
                </div>
              </div>

              <TrustSignals />
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} WhatsApp CRM Store. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors-smooth">
                Términos de Servicio
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors-smooth">
                Política de Privacidad
              </a>
              <span>•</span>
              <a href="#" className="hover:text-foreground transition-colors-smooth">
                Soporte
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;