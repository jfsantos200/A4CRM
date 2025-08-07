import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import LanguageSelector from './LanguageSelector';

const LoginHeader = () => {
  return (
    <header className="w-full bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/login" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <Icon name="MessageSquare" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">WhatsApp CRM</h1>
              <p className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                Gestión de Tienda
              </p>
            </div>
          </Link>

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;