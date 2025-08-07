import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const OrderFilters = ({ 
  filters, 
  onFiltersChange, 
  onCreateOrder, 
  onClearFilters,
  activeFiltersCount 
}) => {
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'processing', label: 'Procesando' },
    { value: 'shipped', label: 'Enviado' },
    { value: 'delivered', label: 'Entregado' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const paymentStatusOptions = [
    { value: '', label: 'Todos los pagos' },
    { value: 'paid', label: 'Pagado' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'failed', label: 'Fallido' },
    { value: 'refunded', label: 'Reembolsado' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Más recientes' },
    { value: 'date-asc', label: 'Más antiguos' },
    { value: 'total-desc', label: 'Mayor importe' },
    { value: 'total-asc', label: 'Menor importe' },
    { value: 'customer-asc', label: 'Cliente A-Z' },
    { value: 'customer-desc', label: 'Cliente Z-A' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Top Row - Create Button and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={onCreateOrder}
          className="sm:w-auto"
        >
          Crear Nuevo Pedido
        </Button>
        
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Buscar por cliente o número de pedido..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
          />
        </div>
      </div>
      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
        <Select
          placeholder="Estado del pedido"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
        
        <Select
          placeholder="Estado del pago"
          options={paymentStatusOptions}
          value={filters?.paymentStatus}
          onChange={(value) => handleFilterChange('paymentStatus', value)}
        />
        
        <Input
          type="date"
          placeholder="Fecha desde"
          value={filters?.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
        />
        
        <Input
          type="date"
          placeholder="Fecha hasta"
          value={filters?.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
        />
        
        <Select
          placeholder="Ordenar por"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        />
        
        <div className="flex gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
              className="flex-1"
            >
              Limpiar ({activeFiltersCount})
            </Button>
          )}
        </div>
      </div>
      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters?.status && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              Estado: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              <button
                onClick={() => handleFilterChange('status', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                ×
              </button>
            </span>
          )}
          {filters?.paymentStatus && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              Pago: {paymentStatusOptions?.find(opt => opt?.value === filters?.paymentStatus)?.label}
              <button
                onClick={() => handleFilterChange('paymentStatus', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                ×
              </button>
            </span>
          )}
          {filters?.dateFrom && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              Desde: {filters?.dateFrom}
              <button
                onClick={() => handleFilterChange('dateFrom', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                ×
              </button>
            </span>
          )}
          {filters?.dateTo && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
              Hasta: {filters?.dateTo}
              <button
                onClick={() => handleFilterChange('dateTo', '')}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderFilters;