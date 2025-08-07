import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle }) => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/products-management', label: 'Products', icon: 'Package' },
    { path: '/customers-management', label: 'Customers', icon: 'Users' },
    { path: '/orders-management', label: 'Orders', icon: 'ShoppingCart' },
  ];

  const secondaryNavItems = [
    { path: '/whats-app-integration-settings', label: 'WhatsApp Settings', icon: 'MessageSquare' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const handleMoreMenuClose = () => {
    setIsMoreMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            iconName="Menu"
          />
          
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <Icon name="MessageSquare" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">WhatsApp CRM</h1>
              <p className="text-xs text-muted-foreground -mt-1">Store Management</p>
            </div>
          </Link>
        </div>

        {/* Center Section - Primary Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              {item?.label}
            </Link>
          ))}
        </nav>

        {/* Right Section - More Menu and User Actions */}
        <div className="flex items-center gap-2">
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMoreMenuToggle}
              iconName="MoreHorizontal"
              className="hidden lg:flex"
            >
              More
            </Button>

            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={handleMoreMenuClose}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-floating z-20 animate-fade-in">
                  <div className="p-1">
                    {secondaryNavItems?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        onClick={handleMoreMenuClose}
                        className={`flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors-smooth ${
                          isActivePath(item?.path)
                            ? 'bg-accent text-accent-foreground'
                            : 'text-popover-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} />
                        {item?.label}
                      </Link>
                    ))}
                    <div className="h-px bg-border my-1" />
                    <button className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors-smooth w-full text-left">
                      <Icon name="Settings" size={16} />
                      Settings
                    </button>
                    <button className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors-smooth w-full text-left">
                      <Icon name="HelpCircle" size={16} />
                      Help & Support
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full bg-muted"
          >
            <Icon name="User" size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;