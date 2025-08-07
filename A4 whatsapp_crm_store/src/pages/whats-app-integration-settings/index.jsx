import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProviderSelection from './components/ProviderSelection';
import ConfigurationForm from './components/ConfigurationForm';
import ConnectionStatus from './components/ConnectionStatus';
import PhoneNumberManagement from './components/PhoneNumberManagement';
import MessageTemplates from './components/MessageTemplates';
import ConnectionLogs from './components/ConnectionLogs';

const WhatsAppIntegrationSettings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('ultramsg');
  const [config, setConfig] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Mock data for phone numbers
  const [phoneNumbers, setPhoneNumbers] = useState([
    {
      id: 1,
      number: '+34612345678',
      isPrimary: true,
      status: 'connected',
      addedAt: '2025-01-15T10:30:00Z',
      stats: {
        messagesSent: 245,
        messagesReceived: 189,
        uptime: '2h 45m'
      }
    },
    {
      id: 2,
      number: '+34687654321',
      isPrimary: false,
      status: 'disconnected',
      addedAt: '2025-01-10T14:20:00Z',
      stats: {
        messagesSent: 67,
        messagesReceived: 43,
        uptime: '0m'
      }
    }
  ]);

  // Mock data for message templates
  const [messageTemplates, setMessageTemplates] = useState([
    {
      id: 1,
      name: 'Bienvenida Cliente Nuevo',
      category: 'greeting',
      content: `¡Hola {{nombre}}! 👋\n\nGracias por contactarnos. Somos {{empresa}} y estamos aquí para ayudarte.\n\n¿En qué podemos asistirte hoy?`,
      variables: ['nombre', 'empresa'],
      updatedAt: '2025-01-15T09:30:00Z'
    },
    {
      id: 2,
      name: 'Confirmación de Pedido',
      category: 'order_confirmation',
      content: `✅ ¡Pedido confirmado!\n\nHola {{nombre}}, tu pedido #{{numero_pedido}} ha sido confirmado.\n\nTotal: {{total}}€\nFecha estimada de entrega: {{fecha_entrega}}\n\nGracias por tu compra.`,
      variables: ['nombre', 'numero_pedido', 'total', 'fecha_entrega'],
      updatedAt: '2025-01-14T16:45:00Z'
    },
    {
      id: 3,
      name: 'Seguimiento de Envío',
      category: 'shipping',
      content: `📦 Tu pedido está en camino\n\nHola {{nombre}}, tu pedido #{{numero_pedido}} ha sido enviado.\n\nNúmero de seguimiento: {{tracking}}\nTransportista: {{transportista}}\n\nPuedes seguir tu envío en: {{url_seguimiento}}`,
      variables: ['nombre', 'numero_pedido', 'tracking', 'transportista', 'url_seguimiento'],
      updatedAt: '2025-01-13T11:20:00Z'
    }
  ]);

  // Mock data for connection logs
  const [connectionLogs, setConnectionLogs] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Conexión establecida',
      message: 'WhatsApp API conectado exitosamente',
      timestamp: '2025-01-15T10:30:00Z',
      details: 'Provider: UltraMsg, Instance: instance12345'
    },
    {
      id: 2,
      type: 'info',
      title: 'Mensaje enviado',
      message: 'Mensaje de bienvenida enviado a +34612345678',
      timestamp: '2025-01-15T10:25:00Z'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Límite de mensajes',
      message: 'Se ha alcanzado el 80% del límite diario de mensajes',
      timestamp: '2025-01-15T09:45:00Z',
      action: 'Ver detalles del plan'
    },
    {
      id: 4,
      type: 'error',
      title: 'Error de autenticación',
      message: 'Token de API inválido o expirado',
      timestamp: '2025-01-15T08:15:00Z',
      details: 'HTTP 401: Unauthorized - Please check your API credentials',
      action: 'Renovar token'
    },
    {
      id: 5,
      type: 'info',
      title: 'Webhook configurado',
      message: 'URL de webhook actualizada correctamente',
      timestamp: '2025-01-15T07:30:00Z'
    }
  ]);

  const messageStats = {
    sent: 47,
    received: 32
  };

  useEffect(() => {
    // Initialize config based on selected provider
    if (selectedProvider === 'ultramsg') {
      setConfig({
        instanceId: 'instance12345',
        apiKey: '••••••••••••••••',
        webhookUrl: 'https://mi-tienda.com/webhook'
      });
    }
  }, [selectedProvider]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleProviderChange = (provider) => {
    setSelectedProvider(provider);
    setConfig({});
  };

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Configuración guardada:', { provider: selectedProvider, config });
      setConnectionStatus('connected');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPhoneNumber = async (number) => {
    const newPhone = {
      id: Date.now(),
      number: number,
      isPrimary: phoneNumbers?.length === 0,
      status: 'connecting',
      addedAt: new Date()?.toISOString(),
      stats: {
        messagesSent: 0,
        messagesReceived: 0,
        uptime: '0m'
      }
    };
    
    setPhoneNumbers([...phoneNumbers, newPhone]);
    
    // Simulate connection process
    setTimeout(() => {
      setPhoneNumbers(prev => prev?.map(phone => 
        phone?.id === newPhone?.id 
          ? { ...phone, status: 'connected' }
          : phone
      ));
    }, 3000);
  };

  const handleRemovePhoneNumber = (id) => {
    setPhoneNumbers(phoneNumbers?.filter(phone => phone?.id !== id));
  };

  const handleSetPrimaryNumber = (id) => {
    setPhoneNumbers(phoneNumbers?.map(phone => ({
      ...phone,
      isPrimary: phone?.id === id
    })));
  };

  const handleSaveTemplate = (template) => {
    if (template?.id && messageTemplates?.find(t => t?.id === template?.id)) {
      // Update existing template
      setMessageTemplates(messageTemplates?.map(t => 
        t?.id === template?.id ? template : t
      ));
    } else {
      // Add new template
      setMessageTemplates([...messageTemplates, template]);
    }
  };

  const handleDeleteTemplate = (id) => {
    setMessageTemplates(messageTemplates?.filter(t => t?.id !== id));
  };

  const handleRefreshLogs = () => {
    // Simulate refresh
    console.log('Actualizando logs...');
  };

  const handleClearLogs = () => {
    setConnectionLogs([]);
  };

  return (
    <>
      <Helmet>
        <title>Configuración de WhatsApp - WhatsApp CRM Store</title>
        <meta name="description" content="Configura y gestiona la integración de WhatsApp API para tu tienda online" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header onMenuToggle={handleToggleSidebar} />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={handleToggleSidebar}
        />
        
        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Configuración de WhatsApp
              </h1>
              <p className="text-muted-foreground">
                Configura y gestiona la integración de WhatsApp API para comunicarte con tus clientes
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Configuration */}
              <div className="xl:col-span-2 space-y-6">
                <ProviderSelection
                  selectedProvider={selectedProvider}
                  onProviderChange={handleProviderChange}
                />
                
                <ConfigurationForm
                  provider={selectedProvider}
                  config={config}
                  onConfigChange={handleConfigChange}
                  onSave={handleSaveConfig}
                  isSaving={isSaving}
                />

                <PhoneNumberManagement
                  phoneNumbers={phoneNumbers}
                  onAddNumber={handleAddPhoneNumber}
                  onRemoveNumber={handleRemovePhoneNumber}
                  onSetPrimary={handleSetPrimaryNumber}
                />

                <MessageTemplates
                  templates={messageTemplates}
                  onSaveTemplate={handleSaveTemplate}
                  onDeleteTemplate={handleDeleteTemplate}
                />
              </div>

              {/* Right Column - Status & Logs */}
              <div className="space-y-6">
                <ConnectionStatus
                  status={connectionStatus}
                  lastConnected="2025-01-15T10:30:00Z"
                  messageStats={messageStats}
                />

                <ConnectionLogs
                  logs={connectionLogs}
                  onRefresh={handleRefreshLogs}
                  onClearLogs={handleClearLogs}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default WhatsAppIntegrationSettings;