import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, className = '' }) => {
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Main',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
        { path: '/products-management', label: 'Products', icon: 'Package' },
        { path: '/customers-management', label: 'Customers', icon: 'Users' },
        { path: '/orders-management', label: 'Orders', icon: 'ShoppingCart' },
      ]
    },
    {
      section: 'Integration',
      items: [
        { path: '/whats-app-integration-settings', label: 'WhatsApp Settings', icon: 'MessageSquare' },
      ]
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-16 bottom-0 z-50 bg-card border-r border-border transition-all duration-300 ease-out ${
          isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-64'
        } ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="text-sm font-medium text-muted-foreground">Navigation</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="hidden lg:flex"
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {navigationItems?.map((section) => (
              <div key={section?.section}>
                {!isCollapsed && (
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    {section?.section}
                  </h3>
                )}
                <div className="space-y-1">
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => {
                        // Close mobile sidebar on navigation
                        if (window.innerWidth < 1024) {
                          onToggle();
                        }
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors-smooth group ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                      title={isCollapsed ? item?.label : ''}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={18} 
                        className={`flex-shrink-0 ${
                          isActivePath(item?.path) ? '' : 'group-hover:text-foreground'
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{item?.label}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon name="User" size={16} />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Store Admin</p>
                  <p className="text-xs text-muted-foreground truncate">admin@store.com</p>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="mt-3 space-y-1">
                <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors-smooth w-full text-left">
                  <Icon name="Settings" size={16} />
                  Settings
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors-smooth w-full text-left">
                  <Icon name="LogOut" size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;