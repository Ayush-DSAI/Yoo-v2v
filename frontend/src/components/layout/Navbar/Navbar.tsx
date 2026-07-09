import React from 'react';
import { NavbarProps } from './Navbar.types';
import { navbarStyles } from './Navbar.styles';
import { Search, Globe, Bell, Moon, User, ShieldAlert, Menu } from 'lucide-react';
import { Button } from '../../ui/Button';

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, className }) => {
  return (
    <header className={`${navbarStyles.header} ${className || ''}`}>
      <div className={navbarStyles.logoGroup}>
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-surface text-text focus-visible:ring-2 focus-visible:ring-primary outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className={navbarStyles.logoText}>AEGIS</div>
      </div>
      
      <div className={navbarStyles.actionGroup}>
        <button className={navbarStyles.iconButton} aria-label="Search">
          <Search className="w-5 h-5" />
        </button>
        <button className={navbarStyles.iconButton} aria-label="Language">
          <Globe className="w-5 h-5" />
        </button>
        <button className={navbarStyles.iconButton} aria-label="Toggle Theme">
          <Moon className="w-5 h-5" />
        </button>
        <button className={navbarStyles.iconButton} aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </button>
        <button className={navbarStyles.iconButton} aria-label="Profile">
          <User className="w-5 h-5" />
        </button>
        
        <Button 
          variant="danger" 
          size="sm" 
          leftIcon={<ShieldAlert className="w-4 h-4" />}
          className="ml-1 sm:ml-2 shadow-[0_0_20px_rgba(255,59,48,0.35)]"
        >
          <span className="hidden sm:inline">SOS</span>
        </Button>
      </div>
    </header>
  );
};

Navbar.displayName = 'Navbar';
