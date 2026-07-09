import React from 'react';
import Link from 'next/link';
import { FooterProps } from './Footer.types';
import { footerStyles } from './Footer.styles';
import { Shield } from 'lucide-react';
import { AEGIS_CONFIG } from '../../../contents/index';

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${footerStyles.container} ${className || ''}`}>
      <div className={footerStyles.inner}>
        <div className={footerStyles.logoGroup}>
          <Shield className="w-4 h-4 text-primary" />
          <span className={footerStyles.logoText}>AEGIS</span>
          <span className="hidden sm:inline-block ml-1">&copy; {currentYear}</span>
        </div>
        
        <div className={footerStyles.linksGroup}>
          <span className="hidden sm:inline-block">v{AEGIS_CONFIG.version}</span>
          <Link href="/privacy" className={footerStyles.link}>
            Privacy
          </Link>
          <Link href="/terms" className={footerStyles.link}>
            Terms
          </Link>
          <Link href="/support" className={footerStyles.link}>
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
