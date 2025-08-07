import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerDetailModal = ({ customer, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('contact');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(customer || {});
  const [newNote, setNewNote] = useState('');
  const [newReminder, setNewReminder] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  if (!isOpen || !customer) return null;

  const tabs = [
    { id: 'contact', label: 'Información de Contacto', icon: 'User' },
    { id: 'history', label: 'Historial de Compras', icon: 'ShoppingBag' },
    { id: 'interactions', label: 'Cronología de Interacciones', icon: 'MessageSquare' },
    { id: 'notes', label: 'Notas Internas', icon: 'FileText' },
    { id: 'reminders', label: 'Recordatorios', icon: 'Bell' }
  ];

  const mockPurchaseHistory = [
    {
      id: 1,
      date: '2024-01-15',
      orderNumber: 'ORD-001',
      total: 125.50,
      status: 'Completado',
      items: ['Producto A', 'Producto B']
    },
    {
      id: 2,
      date: '2024-01-10',
      orderNumber: 'ORD-002',
      total: 89.99,
      status: 'Completado',
      items: ['Producto C']
    }
  ];

  const mockInteractions = [
    {
      id: 1,
      type: 'whatsapp',
      date: '2024-01-16 14:30',
      content: 'Cliente preguntó sobre disponibilidad de productos',
      direction: 'incoming'
    },
    {
      id: 2,
      type: 'order',
      date: '2024-01-15 10:15',
      content: 'Pedido ORD-001 realizado',
      direction: 'system'
    },
    {
      id: 3,
      type: 'note',
      date: '2024-01-14 16:45',
      content: 'Cliente interesado en productos premium',
      direction: 'internal'
    }
  ];

  const mockNotes = [
    {
      id: 1,
      content: `Cliente muy satisfecho con la calidad de los productos.\nHa mostrado interés en la línea premium.\nPreferencia por comunicación vía WhatsApp.`,
      author: 'Admin',
      date: '2024-01-14 16:45',
      edited: false
    }
  ];

  const mockReminders = [
    {
      id: 1,
      title: 'Seguimiento post-venta',
      date: '2024-01-20',
      time: '10:00',
      description: 'Contactar para feedback del último pedido',
      completed: false
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const formatDateTime = (dateTime) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(dateTime));
  };

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'whatsapp': return 'MessageSquare';
      case 'order': return 'ShoppingCart';
      case 'note': return 'FileText';
      default: return 'Circle';
    }
  };

  const getInteractionColor = (type) => {
    switch (type) {
      case 'whatsapp': return 'text-green-600';
      case 'order': return 'text-blue-600';
      case 'note': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const handleSave = () => {
    onSave(formData);
    setEditMode(false);
  };

  const handleAddNote = () => {
    if (newNote?.trim()) {
      // In real app, this would save to backend
      setNewNote('');
    }
  };

  const handleAddReminder = () => {
    if (newReminder?.title && newReminder?.date) {
      // In real app, this would save to backend
      setNewReminder({ title: '', date: '', time: '', description: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <Image
                src={customer?.avatar}
                alt={customer?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{customer?.name}</h2>
              <p className="text-muted-foreground">{customer?.email}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-muted-foreground">{customer?.phone}</span>
                <span className="text-sm font-medium text-foreground">
                  {formatCurrency(customer?.totalPurchases)} total
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setEditMode(!editMode)}
              iconName="Edit"
            >
              {editMode ? 'Cancelar' : 'Editar'}
            </Button>
            {editMode && (
              <Button onClick={handleSave} iconName="Save">
                Guardar
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre Completo"
                  value={editMode ? formData?.name : customer?.name}
                  onChange={(e) => setFormData({...formData, name: e?.target?.value})}
                  disabled={!editMode}
                />
                <Input
                  label="Email"
                  type="email"
                  value={editMode ? formData?.email : customer?.email}
                  onChange={(e) => setFormData({...formData, email: e?.target?.value})}
                  disabled={!editMode}
                />
                <Input
                  label="Teléfono"
                  value={editMode ? formData?.phone : customer?.phone}
                  onChange={(e) => setFormData({...formData, phone: e?.target?.value})}
                  disabled={!editMode}
                />
                <Input
                  label="Ubicación"
                  value={editMode ? formData?.location : customer?.location}
                  onChange={(e) => setFormData({...formData, location: e?.target?.value})}
                  disabled={!editMode}
                />
              </div>
              
              {customer?.tags && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Etiquetas
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {customer?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag?.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Historial de Compras</h3>
                <div className="text-sm text-muted-foreground">
                  Total: {formatCurrency(customer?.totalPurchases)} • {customer?.orderCount} pedidos
                </div>
              </div>
              
              <div className="space-y-3">
                {mockPurchaseHistory?.map((order) => (
                  <div key={order?.id} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon name="ShoppingBag" size={16} className="text-primary" />
                        <span className="font-medium text-foreground">{order?.orderNumber}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order?.status === 'Completado' 
                            ? 'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order?.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-foreground">{formatCurrency(order?.total)}</div>
                        <div className="text-sm text-muted-foreground">{order?.date}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Productos: {order?.items?.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Cronología de Interacciones</h3>
              
              <div className="space-y-3">
                {mockInteractions?.map((interaction) => (
                  <div key={interaction?.id} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getInteractionColor(interaction?.type)}`}>
                      <Icon name={getInteractionIcon(interaction?.type)} size={14} />
                    </div>
                    <div className="flex-1">
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="text-sm text-foreground">{interaction?.content}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatDateTime(interaction?.date)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Notas Internas</h3>
                <Button size="sm" iconName="Plus">
                  Nueva Nota
                </Button>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e?.target?.value)}
                    placeholder="Escribir nueva nota..."
                    className="w-full h-24 p-3 border border-border rounded-md bg-background text-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" onClick={handleAddNote} disabled={!newNote?.trim()}>
                      Agregar Nota
                    </Button>
                  </div>
                </div>

                {mockNotes?.map((note) => (
                  <div key={note?.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="whitespace-pre-line text-foreground mb-2">{note?.content}</div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Por {note?.author}</span>
                      <span>{formatDateTime(note?.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reminders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Recordatorios</h3>
                <Button size="sm" iconName="Plus">
                  Nuevo Recordatorio
                </Button>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Título"
                    value={newReminder?.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e?.target?.value})}
                    placeholder="Título del recordatorio"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Fecha"
                      type="date"
                      value={newReminder?.date}
                      onChange={(e) => setNewReminder({...newReminder, date: e?.target?.value})}
                    />
                    <Input
                      label="Hora"
                      type="time"
                      value={newReminder?.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e?.target?.value})}
                    />
                  </div>
                </div>
                <Input
                  label="Descripción"
                  value={newReminder?.description}
                  onChange={(e) => setNewReminder({...newReminder, description: e?.target?.value})}
                  placeholder="Descripción opcional"
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={handleAddReminder} disabled={!newReminder?.title || !newReminder?.date}>
                    Agregar Recordatorio
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {mockReminders?.map((reminder) => (
                  <div key={reminder?.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{reminder?.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{reminder?.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Icon name="Calendar" size={14} />
                          <span>{reminder?.date}</span>
                          {reminder?.time && (
                            <>
                              <Icon name="Clock" size={14} />
                              <span>{reminder?.time}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" iconName="Edit" />
                        <Button variant="ghost" size="icon" iconName="Trash2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;