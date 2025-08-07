import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CustomersManagement from './pages/customers-management';
import LoginPage from './pages/login';
import ProductsManagement from './pages/products-management';
import Dashboard from './pages/dashboard';
import WhatsAppIntegrationSettings from './pages/whats-app-integration-settings';
import OrdersManagement from './pages/orders-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CustomersManagement />} />
        <Route path="/customers-management" element={<CustomersManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products-management" element={<ProductsManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/whats-app-integration-settings" element={<WhatsAppIntegrationSettings />} />
        <Route path="/orders-management" element={<OrdersManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
