import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateOrderModal = ({ isOpen, onClose, onCreateOrder }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    customerId: '',
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    notes: ''
  });

  // Mock customers data
  const customers = [
    { value: '1', label: 'María García López', email: 'maria.garcia@email.com', phone: '+34 666 123 456' },
    { value: '2', label: 'Carlos Rodríguez Martín', email: 'carlos.rodriguez@email.com', phone: '+34 666 234 567' },
    { value: '3', label: 'Ana Fernández Ruiz', email: 'ana.fernandez@email.com', phone: '+34 666 345 678' },
    { value: '4', label: 'Luis Martínez Sánchez', email: 'luis.martinez@email.com', phone: '+34 666 456 789' },
    { value: '5', label: 'Carmen Jiménez Torres', email: 'carmen.jimenez@email.com', phone: '+34 666 567 890' }
  ];

  // Mock products data
  const products = [
    { id: '1', name: 'Camiseta Básica Blanca', price: 19.99, stock: 50, category: 'Ropa' },
    { id: '2', name: 'Pantalón Vaquero Azul', price: 49.99, stock: 30, category: 'Ropa' },
    { id: '3', name: 'Zapatillas Deportivas', price: 79.99, stock: 25, category: 'Calzado' },
    { id: '4', name: 'Bolso de Cuero Negro', price: 89.99, stock: 15, category: 'Accesorios' },
    { id: '5', name: 'Reloj Digital', price: 129.99, stock: 20, category: 'Accesorios' },
    { id: '6', name: 'Chaqueta de Invierno', price: 99.99, stock: 18, category: 'Ropa' }
  ];

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');

  useEffect(() => {
    calculateTotals();
  }, [selectedProducts, orderData?.discount]);

  const calculateTotals = () => {
    const subtotal = selectedProducts?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
    const tax = subtotal * 0.21; // 21% IVA
    const discount = orderData?.discount || 0;
    const total = subtotal + tax - discount;

    setOrderData(prev => ({
      ...prev,
      subtotal,
      tax,
      total: Math.max(0, total)
    }));
  };

  const handleCustomerSelect = (customerId) => {
    setOrderData(prev => ({ ...prev, customerId }));
  };

  const handleAddProduct = (product) => {
    const existingItem = selectedProducts?.find(item => item?.id === product?.id);
    if (existingItem) {
      setSelectedProducts(prev =>
        prev?.map(item =>
          item?.id === product?.id
            ? { ...item, quantity: Math.min(item?.quantity + 1, product?.stock) }
            : item
        )
      );
    } else {
      setSelectedProducts(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setSelectedProducts(prev => prev?.filter(item => item?.id !== productId));
    } else {
      const product = products?.find(p => p?.id === productId);
      const maxQuantity = product ? product?.stock : 1;
      setSelectedProducts(prev =>
        prev?.map(item =>
          item?.id === productId
            ? { ...item, quantity: Math.min(quantity, maxQuantity) }
            : item
        )
      );
    }
  };

  const handleDiscountChange = (discount) => {
    setOrderData(prev => ({ ...prev, discount: Math.max(0, parseFloat(discount) || 0) }));
  };

  const handleCreateOrder = () => {
    const selectedCustomer = customers?.find(c => c?.value === orderData?.customerId);
    const newOrder = {
      id: Date.now()?.toString(),
      orderNumber: `ORD-${Date.now()?.toString()?.slice(-6)}`,
      customerId: orderData?.customerId,
      customerName: selectedCustomer?.label || '',
      customerEmail: selectedCustomer?.email || '',
      date: new Date()?.toISOString(),
      items: selectedProducts,
      itemCount: selectedProducts?.reduce((sum, item) => sum + item?.quantity, 0),
      subtotal: orderData?.subtotal,
      tax: orderData?.tax,
      discount: orderData?.discount,
      total: orderData?.total,
      status: 'pending',
      paymentStatus: 'pending',
      notes: orderData?.notes
    };

    onCreateOrder(newOrder);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setOrderData({
      customerId: '',
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      notes: ''
    });
    setSelectedProducts([]);
    setProductSearch('');
    onClose();
  };

  const filteredProducts = products?.filter(product =>
    product?.name?.toLowerCase()?.includes(productSearch?.toLowerCase()) ||
    product?.category?.toLowerCase()?.includes(productSearch?.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  const canProceedToStep2 = orderData?.customerId;
  const canProceedToStep3 = selectedProducts?.length > 0;
  const canCreateOrder = orderData?.customerId && selectedProducts?.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Crear Nuevo Pedido</h2>
            <p className="text-sm text-muted-foreground">Paso {currentStep} de 3</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose} iconName="X" />
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Cliente</span>
            </div>
            <div className={`w-8 h-px ${currentStep >= 2 ? 'bg-primary' : 'bg-border'}`} />
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Productos</span>
            </div>
            <div className={`w-8 h-px ${currentStep >= 3 ? 'bg-primary' : 'bg-border'}`} />
            <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                3
              </div>
              <span className="text-sm font-medium">Resumen</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Customer Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Seleccionar Cliente</h3>
              <Select
                label="Cliente"
                placeholder="Buscar y seleccionar cliente..."
                searchable
                options={customers}
                value={orderData?.customerId}
                onChange={handleCustomerSelect}
              />
              
              {orderData?.customerId && (
                <div className="bg-muted/50 rounded-lg p-4">
                  {(() => {
                    const customer = customers?.find(c => c?.value === orderData?.customerId);
                    return customer ? (
                      <div>
                        <h4 className="font-medium text-foreground">{customer?.label}</h4>
                        <p className="text-sm text-muted-foreground">{customer?.email}</p>
                        <p className="text-sm text-muted-foreground">{customer?.phone}</p>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Product Selection */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Seleccionar Productos</h3>
              
              <Input
                type="search"
                placeholder="Buscar productos..."
                value={productSearch}
                onChange={(e) => setProductSearch(e?.target?.value)}
              />

              {/* Selected Products */}
              {selectedProducts?.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-3">Productos Seleccionados</h4>
                  <div className="space-y-2">
                    {selectedProducts?.map((item) => (
                      <div key={item?.id} className="flex items-center justify-between bg-card p-3 rounded-md">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item?.name}</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(item?.price)} c/u</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Minus"
                            onClick={() => handleUpdateQuantity(item?.id, item?.quantity - 1)}
                          />
                          <span className="w-8 text-center text-foreground">{item?.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Plus"
                            onClick={() => handleUpdateQuantity(item?.id, item?.quantity + 1)}
                          />
                          <span className="ml-2 font-medium text-foreground">
                            {formatCurrency(item?.price * item?.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts?.map((product) => (
                  <div key={product?.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{product?.name}</h4>
                        <p className="text-sm text-muted-foreground">{product?.category}</p>
                        <p className="text-lg font-semibold text-foreground">{formatCurrency(product?.price)}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">Stock: {product?.stock}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => handleAddProduct(product)}
                      disabled={product?.stock === 0}
                      className="w-full"
                    >
                      Agregar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Order Summary */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Resumen del Pedido</h3>
              
              {/* Customer Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Cliente</h4>
                {(() => {
                  const customer = customers?.find(c => c?.value === orderData?.customerId);
                  return customer ? (
                    <div>
                      <p className="text-foreground">{customer?.label}</p>
                      <p className="text-sm text-muted-foreground">{customer?.email}</p>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Products Summary */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Productos</h4>
                <div className="space-y-2">
                  {selectedProducts?.map((item) => (
                    <div key={item?.id} className="flex justify-between">
                      <span className="text-foreground">{item?.name} x{item?.quantity}</span>
                      <span className="font-medium text-foreground">{formatCurrency(item?.price * item?.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Totales</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="text-foreground">{formatCurrency(orderData?.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IVA (21%):</span>
                    <span className="text-foreground">{formatCurrency(orderData?.tax)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Descuento:</span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={orderData?.discount}
                        onChange={(e) => handleDiscountChange(e?.target?.value)}
                        className="w-24 text-right"
                      />
                      <span className="text-muted-foreground">€</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total:</span>
                      <span className="font-semibold text-lg text-foreground">{formatCurrency(orderData?.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Input
                  label="Notas del pedido (opcional)"
                  placeholder="Agregar notas o instrucciones especiales..."
                  value={orderData?.notes}
                  onChange={(e) => setOrderData(prev => ({ ...prev, notes: e?.target?.value }))}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                iconName="ChevronLeft"
                iconPosition="left"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Anterior
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleClose}>
              Cancelar
            </Button>
            
            {currentStep < 3 ? (
              <Button
                variant="default"
                iconName="ChevronRight"
                iconPosition="right"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && !canProceedToStep2) ||
                  (currentStep === 2 && !canProceedToStep3)
                }
              >
                Siguiente
              </Button>
            ) : (
              <Button
                variant="default"
                iconName="Check"
                iconPosition="left"
                onClick={handleCreateOrder}
                disabled={!canCreateOrder}
              >
                Crear Pedido
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderModal;