import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  active?: boolean;
}

/**
 * NavLink Component
 * Features:
 * - Hubot font with smooth hover color change
 * - Scale animation on hover
 * - Ripple effect on click with zoom and fade
 * - Active state styling
 *
 * @example
 * <NavLink href="/about" active={location === '/about'}>
 *   About Us
 * </NavLink>
 */
const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  onClick,
  className = '',
  active = false,
}) => {
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const rippleCountRef = React.useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Create ripple effect at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleCountRef.current++;

    setRipples((prev) => [...prev, { id, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    // Trigger navigation
    if (onClick) {
      onClick(e);
    } else {
      // Default navigation
      window.location.href = href;
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`relative inline-block font-hubot font-normal text-[15px]
         transition-colors duration-300 overflow-hidden px-3.5 py-1 rounded rounded-md
         group ${className} outline-none focus:outline-none 
         focus:ring-0 focus:border-none focus:bg-yellow-200/10`}
      style={{
        color: active ? COLORS.primary : COLORS.text,
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Main text */}
      <motion.span
        className="relative z-10 block"
        animate={{
          color: active ? COLORS.primary : COLORS.text,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Hover color change effect */}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-full flex items-center"
        style={{
          color: COLORS.primary,
          pointerEvents: 'none',
        }}
        initial={{ y: 30, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Underline effect on hover (subtle) */}
      <motion.span
        className="absolute bottom-[-4px] left-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple effects container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              backgroundColor: COLORS.primary,
              borderRadius: '50%',
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </div>
    </motion.a>
  );
};

export default NavLink;