import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

export interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * FooterLink Component
 * Features:
 * - Animated underline from left to right on hover
 * - Color transition to primary yellow
 * - Smooth timing for elegant feel
 *
 * @example
 * <FooterLink href="/privacy">Privacy Policy</FooterLink>
 */
const FooterLink: React.FC<FooterLinkProps> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-block text-gray-400 text-sm font-medium group transition-colors duration-300 ${className}`}
      whileHover={{ color: COLORS.primary }}
    >
      {/* Main link text */}
      <span className="relative z-10 block">{children}</span>

      {/* Animated underline - grows from left to right */}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-primary"
        initial={{ width: 0, originX: 0 }}
        whileHover={{ width: '100%' }}
        transition={{
          duration: 0.35,
          ease: 'easeOut',
        }}
      />
    </motion.a>
  );
};

export default FooterLink;