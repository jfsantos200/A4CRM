import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealtimeIndicator = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Simulate occasional connection issues
      setIsConnected(Math.random() > 0.1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = () => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - lastUpdate) / 1000);
    
    if (diffInSeconds < 60) {
      return `Actualizado hace ${diffInSeconds}s`;
    } else {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Actualizado hace ${minutes}m`;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 ${isConnected ? 'text-success' : 'text-warning'}`}>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-warning'}`}></div>
          <Icon name={isConnected ? 'Wifi' : 'WifiOff'} size={16} />
          <span className="text-sm font-medium">
            {isConnected ? 'En línea' : 'Reconectando...'}
          </span>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        {formatLastUpdate()}
      </div>
    </div>
  );
};

export default RealtimeIndicator;