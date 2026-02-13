import React from "react";

/**
 * PageHero Component
 * Reusable hero section with background image and customizable gradient overlay
 *
 * @example
 * <PageHero
 *   backgroundImage="/path/to/image.jpg"
 *   overlayFrom="rgba(255, 212, 59, 0.6)"
 *   overlayTo="rgba(0, 0, 0, 0.4)"
 * >
 *   <HubotH1 fontWeight="extrabold" size={72}>About Us</HubotH1>
 * </PageHero>
 */

interface PageHeroProps {
  /** Background image URL or CSS gradient */
  backgroundImage?: string;
  /** Starting color of the gradient overlay (supports rgba, hex, etc.) */
  overlayFrom?: string;
  /** Ending color of the gradient overlay (supports rgba, hex, etc.) */
  overlayTo?: string;
  /** Gradient direction (default: 135deg) */
  gradientDirection?: string;
  /** Custom height classes (default: h-80 md:h-96) */
  heightClass?: string;
  /** Children to render in the hero section */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Enable parallax effect (background-attachment: fixed) */
  parallax?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({
  backgroundImage,
  overlayFrom = "rgba(0, 0, 0, 0.4)",
  overlayTo = "rgba(0, 0, 0, 0.6)",
  gradientDirection = "135deg",
  heightClass = "h-80 md:h-96",
  children,
  className = "",
  parallax = false,
}) => {
  const overlayStyle: React.CSSProperties = {
    background: `linear-gradient(${gradientDirection}, ${overlayFrom}, ${overlayTo})`,
  };

  const backgroundStyle: React.CSSProperties = backgroundImage
    ? {
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: parallax ? "fixed" : "scroll",
      }
    : {};

  return (
    <section
      className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden ${className}`}
      style={backgroundStyle}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0" style={overlayStyle} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full">{children}</div>
    </section>
  );
};

export default PageHero;
