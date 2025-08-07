import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProductModal = ({ isOpen, onClose, product, onSave, mode = 'create' }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    originalPrice: '',
    stock: '',
    sku: '',
    image: '',
    images: [],
    isActive: true,
    isFeatured: false,
    tags: [],
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    seoTitle: '',
    seoDescription: '',
    metaKeywords: ''
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'electronics', label: 'Electrónicos' },
    { value: 'clothing', label: 'Ropa' },
    { value: 'home', label: 'Hogar' },
    { value: 'books', label: 'Libros' },
    { value: 'sports', label: 'Deportes' },
    { value: 'beauty', label: 'Belleza' },
    { value: 'toys', label: 'Juguetes' }
  ];

  const tabs = [
    { id: 'basic', label: 'Información Básica', icon: 'Info' },
    { id: 'pricing', label: 'Precios e Inventario', icon: 'DollarSign' },
    { id: 'images', label: 'Imágenes', icon: 'Image' },
    { id: 'seo', label: 'SEO', icon: 'Search' }
  ];

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        ...product,
        originalPrice: product?.originalPrice || '',
        tags: product?.tags || [],
        weight: product?.weight || '',
        dimensions: product?.dimensions || { length: '', width: '', height: '' },
        seoTitle: product?.seoTitle || '',
        seoDescription: product?.seoDescription || '',
        metaKeywords: product?.metaKeywords || ''
      });
    } else if (mode === 'duplicate' && product) {
      setFormData({
        ...product,
        name: `${product?.name} (Copia)`,
        sku: `${product?.sku}-copy-${Date.now()}`,
        originalPrice: product?.originalPrice || '',
        tags: product?.tags || [],
        weight: product?.weight || '',
        dimensions: product?.dimensions || { length: '', width: '', height: '' },
        seoTitle: product?.seoTitle || '',
        seoDescription: product?.seoDescription || '',
        metaKeywords: product?.metaKeywords || ''
      });
    } else {
      // Reset form for create mode
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        originalPrice: '',
        stock: '',
        sku: `PRD-${Date.now()}`,
        image: '',
        images: [],
        isActive: true,
        isFeatured: false,
        tags: [],
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        seoTitle: '',
        seoDescription: '',
        metaKeywords: ''
      });
    }
    setErrors({});
    setActiveTab('basic');
  }, [product, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDimensionChange = (dimension, value) => {
    setFormData(prev => ({
      ...prev,
      dimensions: {
        ...prev?.dimensions,
        [dimension]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio';
    }

    if (!formData?.category) {
      newErrors.category = 'La categoría es obligatoria';
    }

    if (!formData?.price || parseFloat(formData?.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (!formData?.stock || parseInt(formData?.stock) < 0) {
      newErrors.stock = 'El stock debe ser 0 o mayor';
    }

    if (!formData?.sku?.trim()) {
      newErrors.sku = 'El SKU es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const productData = {
        ...formData,
        price: parseFloat(formData?.price),
        originalPrice: formData?.originalPrice ? parseFloat(formData?.originalPrice) : null,
        stock: parseInt(formData?.stock),
        weight: formData?.weight ? parseFloat(formData?.weight) : null,
        id: mode === 'create' ? Date.now() : product?.id,
        createdAt: mode === 'create' ? new Date()?.toISOString() : product?.createdAt,
        updatedAt: new Date()?.toISOString()
      };

      onSave(productData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === 'create' && 'Crear Nuevo Producto'}
              {mode === 'edit' && 'Editar Producto'}
              {mode === 'duplicate' && 'Duplicar Producto'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'create' && 'Completa la información del nuevo producto'}
              {mode === 'edit' && 'Modifica la información del producto'}
              {mode === 'duplicate' && 'Revisa y ajusta la información del producto duplicado'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
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
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre del Producto"
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                  placeholder="Ej: iPhone 15 Pro Max"
                />

                <Select
                  label="Categoría"
                  options={categoryOptions}
                  value={formData?.category}
                  onChange={(value) => handleInputChange('category', value)}
                  error={errors?.category}
                  required
                  placeholder="Seleccionar categoría"
                />
              </div>

              <Input
                label="Descripción"
                type="text"
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Descripción detallada del producto..."
              />

              <Input
                label="SKU (Código del Producto)"
                type="text"
                value={formData?.sku}
                onChange={(e) => handleInputChange('sku', e?.target?.value)}
                error={errors?.sku}
                required
                placeholder="Ej: PRD-001"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Peso (kg)"
                  type="number"
                  value={formData?.weight}
                  onChange={(e) => handleInputChange('weight', e?.target?.value)}
                  placeholder="0.5"
                />

                <Input
                  label="Largo (cm)"
                  type="number"
                  value={formData?.dimensions?.length}
                  onChange={(e) => handleDimensionChange('length', e?.target?.value)}
                  placeholder="20"
                />

                <Input
                  label="Ancho (cm)"
                  type="number"
                  value={formData?.dimensions?.width}
                  onChange={(e) => handleDimensionChange('width', e?.target?.value)}
                  placeholder="15"
                />
              </div>

              <div className="flex gap-4">
                <Checkbox
                  label="Producto Activo"
                  checked={formData?.isActive}
                  onChange={(e) => handleInputChange('isActive', e?.target?.checked)}
                />

                <Checkbox
                  label="Producto Destacado"
                  checked={formData?.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e?.target?.checked)}
                />
              </div>
            </div>
          )}

          {/* Pricing & Inventory Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Precio de Venta"
                  type="number"
                  value={formData?.price}
                  onChange={(e) => handleInputChange('price', e?.target?.value)}
                  error={errors?.price}
                  required
                  placeholder="29.99"
                />

                <Input
                  label="Precio Original (Opcional)"
                  type="number"
                  value={formData?.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e?.target?.value)}
                  placeholder="39.99"
                  description="Para mostrar descuentos"
                />
              </div>

              <Input
                label="Stock Disponible"
                type="number"
                value={formData?.stock}
                onChange={(e) => handleInputChange('stock', e?.target?.value)}
                error={errors?.stock}
                required
                placeholder="100"
              />

              {/* Price Preview */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Vista Previa del Precio</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {formData?.price ? `€${parseFloat(formData?.price)?.toFixed(2)}` : '€0.00'}
                  </span>
                  {formData?.originalPrice && parseFloat(formData?.originalPrice) > parseFloat(formData?.price || 0) && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        €{parseFloat(formData?.originalPrice)?.toFixed(2)}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        -{Math.round(((parseFloat(formData?.originalPrice) - parseFloat(formData?.price || 0)) / parseFloat(formData?.originalPrice)) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <div className="space-y-4">
              <Input
                label="Imagen Principal (URL)"
                type="url"
                value={formData?.image}
                onChange={(e) => handleInputChange('image', e?.target?.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />

              {formData?.image && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Vista Previa</h4>
                  <div className="w-32 h-32 bg-background border border-border rounded-lg overflow-hidden">
                    <img
                      src={formData?.image}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <p>• Usa imágenes de alta calidad (mínimo 800x800px)</p>
                <p>• Formatos recomendados: JPG, PNG, WebP</p>
                <p>• Tamaño máximo recomendado: 2MB</p>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <Input
                label="Título SEO"
                type="text"
                value={formData?.seoTitle}
                onChange={(e) => handleInputChange('seoTitle', e?.target?.value)}
                placeholder="Título optimizado para buscadores"
                description="Recomendado: 50-60 caracteres"
              />

              <Input
                label="Descripción SEO"
                type="text"
                value={formData?.seoDescription}
                onChange={(e) => handleInputChange('seoDescription', e?.target?.value)}
                placeholder="Descripción que aparecerá en los resultados de búsqueda"
                description="Recomendado: 150-160 caracteres"
              />

              <Input
                label="Palabras Clave"
                type="text"
                value={formData?.metaKeywords}
                onChange={(e) => handleInputChange('metaKeywords', e?.target?.value)}
                placeholder="palabra1, palabra2, palabra3"
                description="Separadas por comas"
              />

              {/* SEO Preview */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Vista Previa en Buscadores</h4>
                <div className="space-y-1">
                  <div className="text-blue-600 text-lg">
                    {formData?.seoTitle || formData?.name || 'Título del producto'}
                  </div>
                  <div className="text-green-600 text-sm">
                    tienda.com/productos/{formData?.sku?.toLowerCase() || 'producto'}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formData?.seoDescription || formData?.description || 'Descripción del producto...'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-muted-foreground">
            {mode === 'create' && 'Los campos marcados con * son obligatorios'}
            {mode === 'edit' && 'Los cambios se guardarán inmediatamente'}
            {mode === 'duplicate' && 'Se creará una copia del producto con un nuevo SKU'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} iconName="Save" iconPosition="left">
              {mode === 'create' && 'Crear Producto'}
              {mode === 'edit' && 'Guardar Cambios'}
              {mode === 'duplicate' && 'Duplicar Producto'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;