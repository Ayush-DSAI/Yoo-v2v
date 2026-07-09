'use client';

import React from 'react';
import { NavbarProps } from './Navbar.types';
import { navbarStyles } from './Navbar.styles';
import { Globe, Bell, Moon, ShieldAlert, Menu, Search, Sparkles, Shield, Command } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Avatar } from '../../ui/Avatar';
import { motion } from 'framer-motion';

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, className }) => {
  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${navbarStyles.header} ${className || ''}`}
    >
      <div className={navbarStyles.logoGroup}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-surface/50 text-text focus-visible:ring-2 focus-visible:ring-primary outline-none"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-extrabold tracking-tight font-outfit text-white leading-none">AEGIS</span>
            <span className="text-[9px] text-text-muted/60 tracking-[0.2em] uppercase font-medium leading-none mt-0.5">Command Center</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className={navbarStyles.searchContainer}>
        <div className="relative w-full">
          <Input
            placeholder="Search routes, reports, places..."
            leftIcon={<Search className="w-4 h-4 text-text-muted" />}
            rightIcon={
              <kbd className="hidden lg:flex items-center gap-0.5 text-[10px] text-text-muted/50 bg-surface/50 px-1.5 py-0.5 rounded border border-white/10 font-mono">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            }
            className="rounded-xl bg-surface/30 hover:bg-surface/50 transition-colors border-white/5 focus-within:border-primary/30 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
          />
        </div>
      </div>

      <div className={navbarStyles.actionGroup}>
        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} className={navbarStyles.iconButton} aria-label="AI Assistant">
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} className={navbarStyles.iconButton} aria-label="Language">
          <Globe className="w-4 h-4" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} className={navbarStyles.iconButton} aria-label="Toggle Theme">
          <Moon className="w-4 h-4" />
        </motion.button>
        <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} className={`${navbarStyles.iconButton} relative`} aria-label="Notifications">
          <Bell className="w-4 h-4" />
          {/* Notification dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-danger border border-background animate-pulse" />
        </motion.button>

        <motion.div whileHover={{ scale: 1.05 }} className="ml-1 sm:ml-2 hidden sm:block cursor-pointer">
          <Avatar src="https://i.pravatar.cc/150?img=11" fallback="JD" size="sm" />
        </motion.div>

        <Button
          variant="danger"
          size="sm"
          leftIcon={<ShieldAlert className="w-4 h-4" />}
          className="ml-1 sm:ml-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] font-outfit rounded-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]"
          aria-label="Emergency SOS"
        >
          <span className="hidden sm:inline tracking-wider font-bold text-xs">SOS</span>
        </Button>
      </div>
    </motion.header>
  );
};

Navbar.displayName = 'Navbar';
