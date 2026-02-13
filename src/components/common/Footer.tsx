import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Refund Policy', href: '#refund' },
    { label: 'Terms & Conditions', href: '#terms' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const companyLinks: FooterLink[] = [
    { label: 'About Us', href: '#about' },
    { label: 'Live Chat', href: '#live-chat' },
    { label: 'Careers', href: '#careers' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Download App', href: '#download' },
  ];

  const contactInfo = [
    {
      icon: <Phone size={18} />,
      text: '+1 (234) 567-890',
      href: 'tel:+1234567890',
    },
    {
      icon: <Mail size={18} />,
      text: 'hello@urbangravity.com',
      href: 'mailto:hello@urbangravity.com',
    },
    {
      icon: <MapPin size={18} />,
      text: '123 Main Street, NY',
      href: '#location',
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: <Instagram size={20} />,
      href: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: <Twitter size={20} />,
      href: 'https://twitter.com',
      label: 'Twitter',
    },
    {
      icon: <Linkedin size={20} />,
      href: 'https://linkedin.com',
      label: 'LinkedIn',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const linkHoverVariants = {
    initial: { color: '#d1d5db' },
    hover: { color: '#fbbf24' },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white py-16 sm:py-20">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-base font-bold">🏢</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-hubot tracking-tight">
                Urban Gravity
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Urban Gravity is a housing app. It's a platform for tenant
              experience and choice. Taking an educated, agent-controlled system
              and fixing it for the digital way.
            </p>
          </motion.div>

          {/* Legal Links */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-bold text-white font-hubot tracking-tight">
              Legal
            </h3>
            <nav className="space-y-3 flex flex-col">
              {legalLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-300 w-fit"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Company Links */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-bold text-white font-hubot tracking-tight">
              Company
            </h3>
            <nav className="space-y-3 flex flex-col">
              {companyLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-300 w-fit"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Section */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-bold text-white font-hubot tracking-tight">
              Get In Touch
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </span>
                  <span className="text-sm">{info.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12 sm:my-16" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left order-2 sm:order-1">
            {currentYear} © Urban Gravity Corporation. All rights reserved.
          </p>

          {/* Social Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 order-1 sm:order-2">
            <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap font-hubot">
              Follow Us
            </span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;