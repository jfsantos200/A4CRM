import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';

// Import components
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import ProductModal from './components/ProductModal';
import BulkActionsBar from './components/BulkActionsBar';
import InventoryAlerts from './components/InventoryAlerts';
import ProductStats from './components/ProductStats';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const ProductsManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  
  // Modal states
  const [productModal, setProductModal] = useState({
    isOpen: false,
    mode: 'create', // create, edit, duplicate
    product: null
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: 'single', // single, bulk
    products: null
  });

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    stockStatus: '',
    minPrice: '',
    maxPrice: '',
    minStock: '',
    maxStock: '',
    startDate: '',
    endDate: '',
    sortBy: 'name-asc'
  });

  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.7 pulgadas.",
      category: "electronics",
      price: 1199.99,
      originalPrice: 1299.99,
      stock: 25,
      sku: "IPH-15-PM-256",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      isActive: true,
      isFeatured: true,
      soldCount: 45,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:22:00Z",
      tags: ["smartphone", "apple", "premium"],
      weight: 0.221,
      dimensions: { length: 15.9, width: 7.6, height: 0.83 },
      seoTitle: "iPhone 15 Pro Max - Smartphone Premium Apple",
      seoDescription: "Compra el nuevo iPhone 15 Pro Max con chip A17 Pro y cámara profesional. Envío gratis y garantía oficial.",
      metaKeywords: "iphone, apple, smartphone, premium, a17 pro"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      description: "Smartphone premium con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X de 6.8 pulgadas.",
      category: "electronics",
      price: 1099.99,
      originalPrice: null,
      stock: 8,
      sku: "SAM-S24-ULT-512",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      isActive: true,
      isFeatured: true,
      soldCount: 32,
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-01-18T16:45:00Z",
      tags: ["smartphone", "samsung", "s-pen"],
      weight: 0.232,
      dimensions: { length: 16.2, width: 7.9, height: 0.86 },
      seoTitle: "Samsung Galaxy S24 Ultra - Smartphone con S Pen",
      seoDescription: "Descubre el Galaxy S24 Ultra con S Pen integrado y cámara de 200MP. Tecnología de vanguardia.",
      metaKeywords: "samsung, galaxy, s24, ultra, s-pen, smartphone"
    },
    {
      id: 3,
      name: "MacBook Air M3",
      description: "Laptop ultraligera con chip M3, pantalla Liquid Retina de 13.6 pulgadas y hasta 18 horas de batería.",
      category: "electronics",
      price: 1299.99,
      originalPrice: 1399.99,
      stock: 15,
      sku: "MBA-M3-256-SG",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      isActive: true,
      isFeatured: false,
      soldCount: 28,
      createdAt: "2024-01-08T11:20:00Z",
      updatedAt: "2024-01-19T13:30:00Z",
      tags: ["laptop", "apple", "m3", "ultrabook"],
      weight: 1.24,
      dimensions: { length: 30.41, width: 21.5, height: 1.13 },
      seoTitle: "MacBook Air M3 - Laptop Apple Ultraligera",
      seoDescription: "MacBook Air con chip M3, diseño ultraligero y batería de larga duración. Ideal para profesionales.",
      metaKeywords: "macbook, air, m3, apple, laptop, ultrabook"
    },
    {
      id: 4,
      name: "Camiseta Básica Algodón",
      description: "Camiseta de algodón 100% orgánico, corte regular, disponible en múltiples colores.",
      category: "clothing",
      price: 19.99,
      originalPrice: 24.99,
      stock: 150,
      sku: "CAM-BAS-ALG-M",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      isActive: true,
      isFeatured: false,
      soldCount: 89,
      createdAt: "2024-01-05T14:45:00Z",
      updatedAt: "2024-01-17T10:15:00Z",
      tags: ["camiseta", "algodón", "básica", "unisex"],
      weight: 0.18,
      dimensions: { length: 28, width: 20, height: 0.1 },
      seoTitle: "Camiseta Básica de Algodón Orgánico",
      seoDescription: "Camiseta básica de algodón 100% orgánico, cómoda y sostenible. Múltiples colores disponibles.",
      metaKeywords: "camiseta, algodón, orgánico, básica, ropa"
    },
    {
      id: 5,
      name: "Auriculares Sony WH-1000XM5",
      description: "Auriculares inalámbricos con cancelación de ruido líder en la industria y hasta 30 horas de batería.",
      category: "electronics",
      price: 349.99,
      originalPrice: 399.99,
      stock: 0,
      sku: "SON-WH1000XM5-BLK",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
      isActive: true,
      isFeatured: true,
      soldCount: 67,
      createdAt: "2024-01-12T16:30:00Z",
      updatedAt: "2024-01-21T09:45:00Z",
      tags: ["auriculares", "sony", "inalámbricos", "noise-cancelling"],
      weight: 0.25,
      dimensions: { length: 19, width: 17, height: 8 },
      seoTitle: "Sony WH-1000XM5 - Auriculares Noise Cancelling",
      seoDescription: "Auriculares Sony WH-1000XM5 con la mejor cancelación de ruido y calidad de sonido premium.",
      metaKeywords: "sony, auriculares, wh-1000xm5, noise cancelling, inalámbricos"
    },
    {
      id: 6,
      name: "Lámpara de Mesa LED",
      description: "Lámpara de escritorio LED regulable con carga inalámbrica integrada y control táctil.",
      category: "home",
      price: 79.99,
      originalPrice: null,
      stock: 45,
      sku: "LAM-LED-DESK-WH",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      isActive: true,
      isFeatured: false,
      soldCount: 23,
      createdAt: "2024-01-14T12:15:00Z",
      updatedAt: "2024-01-20T15:20:00Z",
      tags: ["lámpara", "led", "escritorio", "carga inalámbrica"],
      weight: 1.2,
      dimensions: { length: 20, width: 20, height: 45 },
      seoTitle: "Lámpara LED de Escritorio con Carga Inalámbrica",
      seoDescription: "Lámpara LED regulable con carga inalámbrica integrada. Perfecta para oficina y estudio.",
      metaKeywords: "lámpara, led, escritorio, carga inalámbrica, regulable"
    },
    {
      id: 7,
      name: "Zapatillas Running Nike",
      description: "Zapatillas de running con tecnología Air Zoom, ideales para entrenamientos y competiciones.",
      category: "sports",
      price: 129.99,
      originalPrice: 149.99,
      stock: 35,
      sku: "NIK-RUN-AIR-42",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      isActive: true,
      isFeatured: true,
      soldCount: 56,
      createdAt: "2024-01-09T08:45:00Z",
      updatedAt: "2024-01-18T11:30:00Z",
      tags: ["zapatillas", "nike", "running", "air zoom"],
      weight: 0.6,
      dimensions: { length: 30, width: 12, height: 10 },
      seoTitle: "Nike Air Zoom - Zapatillas Running Profesionales",
      seoDescription: "Zapatillas Nike con tecnología Air Zoom para runners. Comodidad y rendimiento garantizados.",
      metaKeywords: "nike, zapatillas, running, air zoom, deportes"
    },
    {
      id: 8,
      name: "Libro: El Arte de la Programación",
      description: "Guía completa sobre algoritmos y estructuras de datos, edición actualizada 2024.",
      category: "books",
      price: 45.99,
      originalPrice: null,
      stock: 75,
      sku: "LIB-PROG-ART-2024",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      isActive: true,
      isFeatured: false,
      soldCount: 34,
      createdAt: "2024-01-11T13:20:00Z",
      updatedAt: "2024-01-19T14:45:00Z",
      tags: ["libro", "programación", "algoritmos", "educativo"],
      weight: 0.8,
      dimensions: { length: 24, width: 17, height: 3 },
      seoTitle: "El Arte de la Programación - Libro Algoritmos 2024",
      seoDescription: "Libro completo sobre algoritmos y programación. Edición actualizada con ejemplos modernos.",
      metaKeywords: "libro, programación, algoritmos, estructuras datos, código"
    }
  ]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchTerm) ||
        product?.description?.toLowerCase()?.includes(searchTerm) ||
        product?.sku?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Category filter
    if (filters?.category) {
      filtered = filtered?.filter(product => product?.category === filters?.category);
    }

    // Stock status filter
    if (filters?.stockStatus) {
      switch (filters?.stockStatus) {
        case 'in-stock':
          filtered = filtered?.filter(product => product?.stock > 10);
          break;
        case 'low-stock':
          filtered = filtered?.filter(product => product?.stock > 0 && product?.stock <= 10);
          break;
        case 'out-of-stock':
          filtered = filtered?.filter(product => product?.stock === 0);
          break;
      }
    }

    // Price range filter
    if (filters?.minPrice) {
      filtered = filtered?.filter(product => product?.price >= parseFloat(filters?.minPrice));
    }
    if (filters?.maxPrice) {
      filtered = filtered?.filter(product => product?.price <= parseFloat(filters?.maxPrice));
    }

    // Stock range filter
    if (filters?.minStock) {
      filtered = filtered?.filter(product => product?.stock >= parseInt(filters?.minStock));
    }
    if (filters?.maxStock) {
      filtered = filtered?.filter(product => product?.stock <= parseInt(filters?.maxStock));
    }

    // Date range filter
    if (filters?.startDate) {
      filtered = filtered?.filter(product => new Date(product.createdAt) >= new Date(filters.startDate));
    }
    if (filters?.endDate) {
      filtered = filtered?.filter(product => new Date(product.createdAt) <= new Date(filters.endDate));
    }

    // Sort products
    switch (filters?.sortBy) {
      case 'name-asc':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'name-desc':
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name));
        break;
      case 'price-asc':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-desc':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'stock-asc':
        filtered?.sort((a, b) => a?.stock - b?.stock);
        break;
      case 'stock-desc':
        filtered?.sort((a, b) => b?.stock - a?.stock);
        break;
      case 'created-desc':
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'created-asc':
        filtered?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters]);

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Handle product selection
  const handleProductSelect = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev?.filter(id => id !== productId));
    }
  };

  // Handle select all
  const handleSelectAll = (isSelected) => {
    setSelectAll(isSelected);
    if (isSelected) {
      setSelectedProducts(filteredProducts?.map(p => p?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // Update select all state when products change
  useEffect(() => {
    if (filteredProducts?.length === 0) {
      setSelectAll(false);
    } else {
      const allSelected = filteredProducts?.every(product => selectedProducts?.includes(product?.id));
      setSelectAll(allSelected);
    }
  }, [selectedProducts, filteredProducts]);

  // Handle product actions
  const handleEditProduct = (product) => {
    setProductModal({
      isOpen: true,
      mode: 'edit',
      product
    });
  };

  const handleDuplicateProduct = (product) => {
    setProductModal({
      isOpen: true,
      mode: 'duplicate',
      product
    });
  };

  const handleDeleteProduct = (product) => {
    setDeleteModal({
      isOpen: true,
      type: 'single',
      products: product
    });
  };

  const handleCreateProduct = () => {
    setProductModal({
      isOpen: true,
      mode: 'create',
      product: null
    });
  };

  // Handle modal save
  const handleProductSave = (productData) => {
    if (productModal?.mode === 'create' || productModal?.mode === 'duplicate') {
      setProducts(prev => [...prev, productData]);
    } else if (productModal?.mode === 'edit') {
      setProducts(prev => prev?.map(p => p?.id === productData?.id ? productData : p));
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action, productIds) => {
    const selectedProductsData = products?.filter(p => productIds?.includes(p?.id));
    
    switch (action) {
      case 'delete':
        setDeleteModal({
          isOpen: true,
          type: 'bulk',
          products: selectedProductsData
        });
        break;
      case 'activate':
        setProducts(prev => prev?.map(p => 
          productIds?.includes(p?.id) ? { ...p, isActive: true } : p
        ));
        setSelectedProducts([]);
        break;
      case 'deactivate':
        setProducts(prev => prev?.map(p => 
          productIds?.includes(p?.id) ? { ...p, isActive: false } : p
        ));
        setSelectedProducts([]);
        break;
      case 'feature':
        setProducts(prev => prev?.map(p => 
          productIds?.includes(p?.id) ? { ...p, isFeatured: true } : p
        ));
        setSelectedProducts([]);
        break;
      case 'unfeature':
        setProducts(prev => prev?.map(p => 
          productIds?.includes(p?.id) ? { ...p, isFeatured: false } : p
        ));
        setSelectedProducts([]);
        break;
      case 'export':
        // Handle export logic
        console.log('Exporting products:', selectedProductsData);
        break;
      default:
        break;
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = (productsToDelete) => {
    if (Array.isArray(productsToDelete)) {
      // Bulk delete
      const idsToDelete = productsToDelete?.map(p => p?.id);
      setProducts(prev => prev?.filter(p => !idsToDelete?.includes(p?.id)));
      setSelectedProducts([]);
    } else {
      // Single delete
      setProducts(prev => prev?.filter(p => p?.id !== productsToDelete?.id));
    }
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      stockStatus: '',
      minPrice: '',
      maxPrice: '',
      minStock: '',
      maxStock: '',
      startDate: '',
      endDate: '',
      sortBy: 'name-asc'
    });
  };

  return (
    <>
      <Helmet>
        <title>Gestión de Productos - WhatsApp CRM Store</title>
        <meta name="description" content="Administra tu inventario de productos con herramientas avanzadas de filtrado, búsqueda y gestión de stock." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onMenuToggle={handleSidebarToggle} />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={handleSidebarToggle}
        />

        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="flex">
            {/* Main Content */}
            <div className={`flex-1 p-4 lg:p-6 ${showRightPanel ? 'lg:mr-80' : ''}`}>
              {/* Page Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    Gestión de Productos
                  </h1>
                  <p className="text-muted-foreground">
                    Administra tu inventario, precios y stock de manera eficiente
                  </p>
                </div>
                
                <div className="flex items-center gap-3 mt-4 lg:mt-0">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-muted rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name="Grid3X3" size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name="List" size={16} />
                    </button>
                  </div>

                  {/* Right Panel Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    iconName={showRightPanel ? "PanelRightClose" : "PanelRightOpen"}
                    onClick={() => setShowRightPanel(!showRightPanel)}
                    className="hidden lg:flex"
                  >
                    {showRightPanel ? 'Ocultar Panel' : 'Mostrar Panel'}
                  </Button>

                  {/* Add Product Button */}
                  <Button
                    onClick={handleCreateProduct}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Nuevo Producto
                  </Button>
                </div>
              </div>

              {/* Product Stats */}
              <ProductStats products={products} />

              {/* Filters */}
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />

              {/* Bulk Selection Header */}
              {filteredProducts?.length > 0 && (
                <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {selectedProducts?.length > 0 
                        ? `${selectedProducts?.length} de ${filteredProducts?.length} productos seleccionados`
                        : `Seleccionar todos (${filteredProducts?.length} productos)`
                      }
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Mostrando {filteredProducts?.length} de {products?.length} productos
                  </div>
                </div>
              )}

              {/* Products Grid/List */}
              {filteredProducts?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Package" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {Object.values(filters)?.some(filter => filter) 
                      ? 'Intenta ajustar los filtros de búsqueda' :'Comienza agregando tu primer producto al inventario'
                    }
                  </p>
                  <Button
                    onClick={Object.values(filters)?.some(filter => filter) ? handleClearFilters : handleCreateProduct}
                    iconName={Object.values(filters)?.some(filter => filter) ? "X" : "Plus"}
                    iconPosition="left"
                  >
                    {Object.values(filters)?.some(filter => filter) ? 'Limpiar Filtros' : 'Crear Primer Producto'}
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                }`}>
                  {filteredProducts?.map((product) => (
                    <div key={product?.id} className="relative">
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <Checkbox
                          checked={selectedProducts?.includes(product?.id)}
                          onChange={(e) => handleProductSelect(product?.id, e?.target?.checked)}
                          className="bg-white/90 backdrop-blur-sm"
                        />
                      </div>
                      
                      <ProductCard
                        product={product}
                        onEdit={handleEditProduct}
                        onDuplicate={handleDuplicateProduct}
                        onDelete={handleDeleteProduct}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Panel */}
            {showRightPanel && (
              <div className="hidden lg:block fixed right-0 top-16 bottom-0 w-80 bg-card border-l border-border overflow-y-auto">
                <div className="p-4 space-y-6">
                  <InventoryAlerts 
                    products={products} 
                    onProductClick={handleEditProduct}
                  />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Bulk Actions Bar */}
        <BulkActionsBar
          selectedProducts={selectedProducts}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedProducts([])}
        />

        {/* Product Modal */}
        <ProductModal
          isOpen={productModal?.isOpen}
          onClose={() => setProductModal({ isOpen: false, mode: 'create', product: null })}
          product={productModal?.product}
          mode={productModal?.mode}
          onSave={handleProductSave}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={deleteModal?.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, type: 'single', products: null })}
          onConfirm={handleDeleteConfirm}
          products={deleteModal?.products}
          type={deleteModal?.type}
        />
      </div>
    </>
  );
};

export default ProductsManagement;