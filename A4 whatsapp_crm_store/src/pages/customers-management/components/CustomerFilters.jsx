import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerFilters = ({ onFilterChange, onClearFilters, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    segment: '',
    purchaseRange: '',
    interactionFrequency: '',
    tags: [],
    dateRange: '',
    location: ''
  });

  const segments = [
    { value: 'vip', label: 'VIP' },
    { value: 'regular', label: 'Regular' },
    { value: 'new', label: 'Nuevo' },
    { value: 'inactive', label: 'Inactivo' }
  ];

  const purchaseRanges = [
    { value: '0-100', label: '0€ - 100€' },
    { value: '100-500', label: '100€ - 500€' },
    { value: '500-1000', label: '500€ - 1.000€' },
    { value: '1000+', label: '1.000€+' }
  ];

  const interactionFrequencies = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'rarely', label: 'Raramente' }
  ];

  const availableTags = [
    { value: 'premium', label: 'Premium', color: 'purple' },
    { value: 'wholesale', label: 'Mayorista', color: 'blue' },
    { value: 'loyal', label: 'Fiel', color: 'green' },
    { value: 'potential', label: 'Potencial', color: 'yellow' },
    { value: 'problematic', label: 'Problemático', color: 'red' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagToggle = (tagValue) => {
    const newTags = filters?.tags?.includes(tagValue)
      ? filters?.tags?.filter(t => t !== tagValue)
      : [...filters?.tags, tagValue];
    
    handleFilterChange('tags', newTags);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      segment: '',
      purchaseRange: '',
      interactionFrequency: '',
      tags: [],
      dateRange: '',
      location: ''
    };
    setFilters(emptyFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.filter(value => 
      Array.isArray(value) ? value?.length > 0 : value !== ''
    )?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} />
          <h3 className="font-medium text-foreground">Filtros Avanzados</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
            >
              Limpiar
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? 'Contraer' : 'Expandir'}
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Segment Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Segmento de Cliente
              </label>
              <select
                value={filters?.segment}
                onChange={(e) => handleFilterChange('segment', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos los segmentos</option>
                {segments?.map(segment => (
                  <option key={segment?.value} value={segment?.value}>
                    {segment?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Purchase Range Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rango de Compras
              </label>
              <select
                value={filters?.purchaseRange}
                onChange={(e) => handleFilterChange('purchaseRange', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos los rangos</option>
                {purchaseRanges?.map(range => (
                  <option key={range?.value} value={range?.value}>
                    {range?.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Interaction Frequency Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Frecuencia de Interacción
              </label>
              <select
                value={filters?.interactionFrequency}
                onChange={(e) => handleFilterChange('interactionFrequency', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todas las frecuencias</option>
                {interactionFrequencies?.map(freq => (
                  <option key={freq?.value} value={freq?.value}>
                    {freq?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Etiquetas
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags?.map(tag => (
                <button
                  key={tag?.value}
                  onClick={() => handleTagToggle(tag?.value)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    filters?.tags?.includes(tag?.value)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:bg-muted'
                  }`}
                >
                  {tag?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Rango de Fechas"
              type="date"
              value={filters?.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
            />
            <Input
              label="Ubicación"
              type="text"
              placeholder="Filtrar por ciudad o región"
              value={filters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFilters;