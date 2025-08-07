import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import OrderCard from './components/OrderCard';
import OrderTable from './components/OrderTable';
import OrderFilters from './components/OrderFilters';
import CreateOrderModal from './components/CreateOrderModal';
import OrderDetailsModal from './components/OrderDetailsModal';
import UpdateStatusModal from './components/UpdateStatusModal';

const OrdersManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    paymentStatus: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date-desc'
  });

  // Mock orders data
  const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-001234',
      customerId: '1',
      customerName: 'María García López',
      customerEmail: 'maria.garcia@email.com',
      date: '2025-01-07T10:30:00Z',
      items: [
        { id: '1', name: 'Camiseta Básica Blanca', price: 19.99, quantity: 2 },
        { id: '2', name: 'Pantalón Vaquero Azul', price: 49.99, quantity: 1 }
      ],
      itemCount: 3,
      subtotal: 89.97,
      tax: 18.89,
      discount: 0,
      total: 108.86,
      status: 'confirmed',
      paymentStatus: 'paid',
      notes: 'Entrega urgente solicitada'
    },
    {
      id: '2',
      orderNumber: 'ORD-001235',
      customerId: '2',
      customerName: 'Carlos Rodríguez Martín',
      customerEmail: 'carlos.rodriguez@email.com',
      date: '2025-01-07T09:15:00Z',
      items: [
        { id: '3', name: 'Zapatillas Deportivas', price: 79.99, quantity: 1 }
      ],
      itemCount: 1,
      subtotal: 79.99,
      tax: 16.80,
      discount: 10.00,
      total: 86.79,
      status: 'processing',
      paymentStatus: 'paid',
      notes: ''
    },
    {
      id: '3',
      orderNumber: 'ORD-001236',
      customerId: '3',
      customerName: 'Ana Fernández Ruiz',
      customerEmail: 'ana.fernandez@email.com',
      date: '2025-01-06T16:45:00Z',
      items: [
        { id: '4', name: 'Bolso de Cuero Negro', price: 89.99, quantity: 1 },
        { id: '5', name: 'Reloj Digital', price: 129.99, quantity: 1 }
      ],
      itemCount: 2,
      subtotal: 219.98,
      tax: 46.20,
      discount: 0,
      total: 266.18,
      status: 'shipped',
      paymentStatus: 'paid',
      notes: 'Regalo - incluir tarjeta'
    },
    {
      id: '4',
      orderNumber: 'ORD-001237',
      customerId: '4',
      customerName: 'Luis Martínez Sánchez',
      customerEmail: 'luis.martinez@email.com',
      date: '2025-01-06T14:20:00Z',
      items: [
        { id: '6', name: 'Chaqueta de Invierno', price: 99.99, quantity: 1 }
      ],
      itemCount: 1,
      subtotal: 99.99,
      tax: 21.00,
      discount: 0,
      total: 120.99,
      status: 'pending',
      paymentStatus: 'pending',
      notes: ''
    },
    {
      id: '5',
      orderNumber: 'ORD-001238',
      customerId: '5',
      customerName: 'Carmen Jiménez Torres',
      customerEmail: 'carmen.jimenez@email.com',
      date: '2025-01-05T11:30:00Z',
      items: [
        { id: '1', name: 'Camiseta Básica Blanca', price: 19.99, quantity: 3 },
        { id: '2', name: 'Pantalón Vaquero Azul', price: 49.99, quantity: 2 }
      ],
      itemCount: 5,
      subtotal: 159.95,
      tax: 33.59,
      discount: 15.00,
      total: 178.54,
      status: 'delivered',
      paymentStatus: 'paid',
      notes: 'Cliente habitual - descuento aplicado'
    },
    {
      id: '6',
      orderNumber: 'ORD-001239',
      customerId: '1',
      customerName: 'María García López',
      customerEmail: 'maria.garcia@email.com',
      date: '2025-01-04T15:45:00Z',
      items: [
        { id: '3', name: 'Zapatillas Deportivas', price: 79.99, quantity: 2 }
      ],
      itemCount: 2,
      subtotal: 159.98,
      tax: 33.60,
      discount: 0,
      total: 193.58,
      status: 'cancelled',
      paymentStatus: 'refunded',
      notes: 'Cancelado por el cliente - talla no disponible'
    }
  ];

  useEffect(() => {
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, orders]);

  const applyFilters = () => {
    let filtered = [...orders];

    // Search filter
    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter(order =>
        order?.customerName?.toLowerCase()?.includes(searchLower) ||
        order?.orderNumber?.toLowerCase()?.includes(searchLower) ||
        order?.customerEmail?.toLowerCase()?.includes(searchLower)
      );
    }

    // Status filter
    if (filters?.status) {
      filtered = filtered?.filter(order => order?.status === filters?.status);
    }

    // Payment status filter
    if (filters?.paymentStatus) {
      filtered = filtered?.filter(order => order?.paymentStatus === filters?.paymentStatus);
    }

    // Date range filter
    if (filters?.dateFrom) {
      filtered = filtered?.filter(order => new Date(order.date) >= new Date(filters.dateFrom));
    }
    if (filters?.dateTo) {
      const dateTo = new Date(filters.dateTo);
      dateTo?.setHours(23, 59, 59, 999);
      filtered = filtered?.filter(order => new Date(order.date) <= dateTo);
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'total-asc':
          return a?.total - b?.total;
        case 'total-desc':
          return b?.total - a?.total;
        case 'customer-asc':
          return a?.customerName?.localeCompare(b?.customerName);
        case 'customer-desc':
          return b?.customerName?.localeCompare(a?.customerName);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredOrders(filtered);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleCreateOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    // Simulate real-time metrics update
    setTimeout(() => {
      console.log('Metrics updated after order creation');
    }, 500);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setIsUpdateStatusModalOpen(true);
  };

  const handleStatusUpdate = (orderId, newStatus, options = {}) => {
    setOrders(prev =>
      prev?.map(order =>
        order?.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

    // Simulate WhatsApp notification
    if (options?.notifyCustomer && options?.customMessage) {
      console.log(`WhatsApp sent to customer: ${options?.customMessage}`);
    }

    setIsUpdateStatusModalOpen(false);
    setSelectedOrder(null);
  };

  const handleGenerateInvoice = (order) => {
    console.log('Generating invoice for order:', order?.orderNumber);
    // Simulate invoice generation
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.status) count++;
    if (filters?.paymentStatus) count++;
    if (filters?.dateFrom) count++;
    if (filters?.dateTo) count++;
    return count;
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      paymentStatus: '',
      dateFrom: '',
      dateTo: '',
      sortBy: 'date-desc'
    });
  };

  // Responsive view mode based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setViewMode('cards');
      } else {
        setViewMode('table');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="ShoppingCart" size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestión de Pedidos</h1>
                <p className="text-muted-foreground">Administra y procesa todos los pedidos de tu tienda</p>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="ShoppingCart" size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pedidos</p>
                    <p className="text-xl font-semibold text-foreground">{orders?.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pendientes</p>
                    <p className="text-xl font-semibold text-foreground">
                      {orders?.filter(o => o?.status === 'pending')?.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Entregados</p>
                    <p className="text-xl font-semibold text-foreground">
                      {orders?.filter(o => o?.status === 'delivered')?.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="Euro" size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ingresos</p>
                    <p className="text-xl font-semibold text-foreground">
                      {new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                      })?.format(orders?.filter(o => o?.paymentStatus === 'paid')?.reduce((sum, o) => sum + o?.total, 0))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <OrderFilters
            filters={filters}
            onFiltersChange={setFilters}
            onCreateOrder={() => setIsCreateModalOpen(true)}
            onClearFilters={handleClearFilters}
            activeFiltersCount={getActiveFiltersCount()}
          />

          {/* View Toggle and Results */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredOrders?.length} de {orders?.length} pedidos
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                iconName="Table"
                onClick={() => setViewMode('table')}
              >
                Tabla
              </Button>
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                iconName="Grid3x3"
                onClick={() => setViewMode('cards')}
              >
                Tarjetas
              </Button>
            </div>
          </div>

          {/* Orders Display */}
          {filteredOrders?.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShoppingCart" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron pedidos</h3>
              <p className="text-muted-foreground mb-4">
                {getActiveFiltersCount() > 0 
                  ? 'No hay pedidos que coincidan con los filtros aplicados.'
                  : 'Aún no tienes pedidos. Crea tu primer pedido para comenzar.'
                }
              </p>
              {getActiveFiltersCount() > 0 ? (
                <Button variant="outline" onClick={handleClearFilters}>
                  Limpiar Filtros
                </Button>
              ) : (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  Crear Primer Pedido
                </Button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'table' ? (
                <OrderTable
                  orders={filteredOrders}
                  onViewDetails={handleViewDetails}
                  onUpdateStatus={handleUpdateStatus}
                  onGenerateInvoice={handleGenerateInvoice}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredOrders?.map((order) => (
                    <OrderCard
                      key={order?.id}
                      order={order}
                      onViewDetails={handleViewDetails}
                      onUpdateStatus={handleUpdateStatus}
                      onGenerateInvoice={handleGenerateInvoice}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      {/* Modals */}
      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateOrder={handleCreateOrder}
      />
      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        order={selectedOrder}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedOrder(null);
        }}
        onUpdateStatus={handleUpdateStatus}
      />
      <UpdateStatusModal
        isOpen={isUpdateStatusModalOpen}
        order={selectedOrder}
        onClose={() => {
          setIsUpdateStatusModalOpen(false);
          setSelectedOrder(null);
        }}
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
};

export default OrdersManagement;