import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CustomerCard from './components/CustomerCard';
import CustomerTable from './components/CustomerTable';
import CustomerFilters from './components/CustomerFilters';
import CustomerDetailModal from './components/CustomerDetailModal';
import AddCustomerModal from './components/AddCustomerModal';

const CustomersManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);

  // Mock customer data
  const mockCustomers = [
    {
      id: 1,
      name: "María García López",
      email: "maria.garcia@email.com",
      phone: "+34 612 345 678",
      location: "Madrid, España",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      totalPurchases: 1250.75,
      orderCount: 8,
      lastInteraction: "2024-01-16",
      interactionType: "WhatsApp",
      segment: "vip",
      tags: [
        { name: "Premium", color: "purple" },
        { name: "Fiel", color: "green" }
      ]
    },
    {
      id: 2,
      name: "Carlos Rodríguez Martín",
      email: "carlos.rodriguez@email.com",
      phone: "+34 623 456 789",
      location: "Barcelona, España",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      totalPurchases: 890.50,
      orderCount: 5,
      lastInteraction: "2024-01-15",
      interactionType: "Pedido",
      segment: "regular",
      tags: [
        { name: "Mayorista", color: "blue" }
      ]
    },
    {
      id: 3,
      name: "Ana Fernández Silva",
      email: "ana.fernandez@email.com",
      phone: "+34 634 567 890",
      location: "Valencia, España",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      totalPurchases: 2150.25,
      orderCount: 12,
      lastInteraction: "2024-01-14",
      interactionType: "WhatsApp",
      segment: "vip",
      tags: [
        { name: "Premium", color: "purple" },
        { name: "Fiel", color: "green" },
        { name: "Mayorista", color: "blue" }
      ]
    },
    {
      id: 4,
      name: "David López Ruiz",
      email: "david.lopez@email.com",
      phone: "+34 645 678 901",
      location: "Sevilla, España",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      totalPurchases: 450.00,
      orderCount: 3,
      lastInteraction: "2024-01-13",
      interactionType: "Email",
      segment: "new",
      tags: [
        { name: "Potencial", color: "yellow" }
      ]
    },
    {
      id: 5,
      name: "Laura Martínez González",
      email: "laura.martinez@email.com",
      phone: "+34 656 789 012",
      location: "Bilbao, España",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      totalPurchases: 1680.90,
      orderCount: 9,
      lastInteraction: "2024-01-12",
      interactionType: "WhatsApp",
      segment: "regular",
      tags: [
        { name: "Fiel", color: "green" }
      ]
    },
    {
      id: 6,
      name: "Javier Sánchez Torres",
      email: "javier.sanchez@email.com",
      phone: "+34 667 890 123",
      location: "Málaga, España",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      totalPurchases: 320.75,
      orderCount: 2,
      lastInteraction: "2024-01-10",
      interactionType: "Pedido",
      segment: "new",
      tags: [
        { name: "Nuevo", color: "orange" }
      ]
    }
  ];

  useEffect(() => {
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  useEffect(() => {
    let filtered = customers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(customer =>
        customer?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        customer?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        customer?.phone?.includes(searchTerm) ||
        customer?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply advanced filters
    if (activeFilters?.segment) {
      filtered = filtered?.filter(customer => customer?.segment === activeFilters?.segment);
    }

    if (activeFilters?.tags && activeFilters?.tags?.length > 0) {
      filtered = filtered?.filter(customer =>
        customer?.tags && customer?.tags?.some(tag =>
          activeFilters?.tags?.includes(tag?.name?.toLowerCase())
        )
      );
    }

    if (activeFilters?.purchaseRange) {
      filtered = filtered?.filter(customer => {
        const total = customer?.totalPurchases;
        switch (activeFilters?.purchaseRange) {
          case '0-100': return total >= 0 && total <= 100;
          case '100-500': return total > 100 && total <= 500;
          case '500-1000': return total > 500 && total <= 1000;
          case '1000+': return total > 1000;
          default: return true;
        }
      });
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, activeFilters, customers]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const handleWhatsAppCustomer = (customer) => {
    // In real app, this would open WhatsApp integration
    window.open(`https://wa.me/${customer?.phone?.replace(/[^0-9]/g, '')}`, '_blank');
  };

  const handleSaveCustomer = (customerData) => {
    if (selectedCustomer) {
      // Update existing customer
      setCustomers(prev => prev?.map(c => c?.id === selectedCustomer?.id ? { ...c, ...customerData } : c));
    } else {
      // Add new customer
      setCustomers(prev => [...prev, customerData]);
    }
    setShowDetailModal(false);
    setShowAddModal(false);
    setSelectedCustomer(null);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'export':
        // In real app, this would export selected customers
        console.log('Exporting customers:', selectedCustomers);
        break;
      case 'tag':
        // In real app, this would open tag assignment modal
        console.log('Tagging customers:', selectedCustomers);
        break;
      case 'delete':
        // In real app, this would show confirmation dialog
        setCustomers(prev => prev?.filter(c => !selectedCustomers?.includes(c?.id)));
        setSelectedCustomers([]);
        break;
      default:
        break;
    }
    setBulkActionOpen(false);
  };

  const getCustomerStats = () => {
    const total = customers?.length;
    const vip = customers?.filter(c => c?.segment === 'vip')?.length;
    const newCustomers = customers?.filter(c => c?.segment === 'new')?.length;
    const totalRevenue = customers?.reduce((sum, c) => sum + c?.totalPurchases, 0);

    return { total, vip, newCustomers, totalRevenue };
  };

  const stats = getCustomerStats();

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleToggleSidebar} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestión de Clientes</h1>
                <p className="text-muted-foreground">Administra y realiza seguimiento de tus clientes</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Clientes</p>
                    <p className="text-xl font-semibold text-foreground">{stats?.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="Crown" size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Clientes VIP</p>
                    <p className="text-xl font-semibold text-foreground">{stats?.vip}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="UserPlus" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nuevos Clientes</p>
                    <p className="text-xl font-semibold text-foreground">{stats?.newCustomers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Euro" size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                    <p className="text-xl font-semibold text-foreground">
                      {new Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                      })?.format(stats?.totalRevenue)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Buscar clientes por nombre, email, teléfono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="w-full"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  iconName="Filter"
                  className={showFilters ? 'bg-primary/10 text-primary' : ''}
                >
                  Filtros
                </Button>

                <div className="flex items-center gap-1 border border-border rounded-md">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    iconName="Table"
                    className="rounded-r-none border-0"
                  />
                  <Button
                    variant={viewMode === 'cards' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('cards')}
                    iconName="Grid3X3"
                    className="rounded-l-none border-0"
                  />
                </div>

                {selectedCustomers?.length > 0 && (
                  <div className="relative">
                    <Button
                      variant="outline"
                      onClick={() => setBulkActionOpen(!bulkActionOpen)}
                      iconName="MoreHorizontal"
                    >
                      Acciones ({selectedCustomers?.length})
                    </Button>
                    
                    {bulkActionOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setBulkActionOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-20">
                          <div className="p-1">
                            <button
                              onClick={() => handleBulkAction('export')}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-sm"
                            >
                              <Icon name="Download" size={16} />
                              Exportar
                            </button>
                            <button
                              onClick={() => handleBulkAction('tag')}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-sm"
                            >
                              <Icon name="Tag" size={16} />
                              Etiquetar
                            </button>
                            <div className="h-px bg-border my-1" />
                            <button
                              onClick={() => handleBulkAction('delete')}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-sm"
                            >
                              <Icon name="Trash2" size={16} />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <Button
                  onClick={() => setShowAddModal(true)}
                  iconName="Plus"
                >
                  Agregar Cliente
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-6">
              <CustomerFilters
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                activeFilters={activeFilters}
              />
            </div>
          )}

          {/* Customer List */}
          <div className="space-y-4">
            {filteredCustomers?.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron clientes</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || Object.keys(activeFilters)?.length > 0
                    ? 'Intenta ajustar los filtros de búsqueda' :'Comienza agregando tu primer cliente'
                  }
                </p>
                {!searchTerm && Object.keys(activeFilters)?.length === 0 && (
                  <Button onClick={() => setShowAddModal(true)} iconName="Plus">
                    Agregar Primer Cliente
                  </Button>
                )}
              </div>
            ) : (
              <>
                {viewMode === 'table' ? (
                  <CustomerTable
                    customers={filteredCustomers}
                    onEdit={handleEditCustomer}
                    onView={handleViewCustomer}
                    onWhatsApp={handleWhatsAppCustomer}
                    onSelectCustomer={setSelectedCustomers}
                    selectedCustomers={selectedCustomers}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCustomers?.map((customer) => (
                      <CustomerCard
                        key={customer?.id}
                        customer={customer}
                        onEdit={handleEditCustomer}
                        onView={handleViewCustomer}
                        onWhatsApp={handleWhatsAppCustomer}
                      />
                    ))}
                  </div>
                )}

                {/* Results Summary */}
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Mostrando {filteredCustomers?.length} de {customers?.length} clientes
                    {searchTerm && ` • Búsqueda: "${searchTerm}"`}
                    {Object.keys(activeFilters)?.length > 0 && ` • ${Object.keys(activeFilters)?.length} filtros activos`}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      {/* Modals */}
      <CustomerDetailModal
        customer={selectedCustomer}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSaveCustomer}
      />
      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveCustomer}
      />
    </div>
  );
};

export default CustomersManagement;