import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProductFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    { value: 'electronics', label: 'Electrónicos' },
    { value: 'clothing', label: 'Ropa' },
    { value: 'home', label: 'Hogar' },
    { value: 'books', label: 'Libros' },
    { value: 'sports', label: 'Deportes' },
    { value: 'beauty', label: 'Belleza' },
    { value: 'toys', label: 'Juguetes' }
  ];

  const stockStatusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'in-stock', label: 'En Stock' },
    { value: 'low-stock', label: 'Stock Bajo' },
    { value: 'out-of-stock', label: 'Agotado' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Nombre A-Z' },
    { value: 'name-desc', label: 'Nombre Z-A' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' },
    { value: 'stock-asc', label: 'Stock: Menor a Mayor' },
    { value: 'stock-desc', label: 'Stock: Mayor a Menor' },
    { value: 'created-desc', label: 'Más Recientes' },
    { value: 'created-asc', label: 'Más Antiguos' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.search) count++;
    if (filters?.category) count++;
    if (filters?.stockStatus) count++;
    if (filters?.minPrice) count++;
    if (filters?.maxPrice) count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="flex-1 min-w-0">
          <Input
            type="search"
            placeholder="Buscar productos por nombre, SKU o descripción..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <Select
            options={categoryOptions}
            value={filters?.category || ''}
            onChange={(value) => handleFilterChange('category', value)}
            placeholder="Categoría"
            className="min-w-[140px]"
          />

          <Select
            options={stockStatusOptions}
            value={filters?.stockStatus || ''}
            onChange={(value) => handleFilterChange('stockStatus', value)}
            placeholder="Estado"
            className="min-w-[120px]"
          />

          <Button
            variant="outline"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Más Filtros
            {getActiveFiltersCount() > 0 && (
              <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs">
                {getActiveFiltersCount()}
              </span>
            )}
          </Button>

          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Rango de Precio</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min €"
                  value={filters?.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e?.target?.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Max €"
                  value={filters?.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Ordenar Por</label>
              <Select
                options={sortOptions}
                value={filters?.sortBy || 'name-asc'}
                onChange={(value) => handleFilterChange('sortBy', value)}
                placeholder="Seleccionar orden"
              />
            </div>

            {/* Stock Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Rango de Stock</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters?.minStock || ''}
                  onChange={(e) => handleFilterChange('minStock', e?.target?.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters?.maxStock || ''}
                  onChange={(e) => handleFilterChange('maxStock', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Fecha de Creación</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={filters?.startDate || ''}
                  onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                  className="flex-1"
                />
                <Input
                  type="date"
                  value={filters?.endDate || ''}
                  onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Active Filter Tags */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {filters?.search && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                Búsqueda: "{filters?.search}"
                <button onClick={() => handleFilterChange('search', '')}>
                  <Icon name="X" size={14} />
                </button>
              </span>
            )}
            {filters?.category && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                Categoría: {categoryOptions?.find(opt => opt?.value === filters?.category)?.label}
                <button onClick={() => handleFilterChange('category', '')}>
                  <Icon name="X" size={14} />
                </button>
              </span>
            )}
            {filters?.stockStatus && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                Estado: {stockStatusOptions?.find(opt => opt?.value === filters?.stockStatus)?.label}
                <button onClick={() => handleFilterChange('stockStatus', '')}>
                  <Icon name="X" size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;