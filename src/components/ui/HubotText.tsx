import React from 'react';

export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

/**
 * HubotH1 Component
 * Heading component using Hubot font with full HTML props support
 *
 * @example
 * <HubotH1 className="text-center">Welcome</HubotH1>
 * <HubotH1 fontWeight="extrabold" size={48}>Large Heading</HubotH1>
 */
interface HubotH1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  fontWeight?: FontWeight;
  size?: number;
  children: React.ReactNode;
}

export const HubotH1: React.FC<HubotH1Props> = ({
  fontWeight = 'bold',
  size = 48,
  className = '',
  style,
  children,
  ...props
}) => {
  const fontWeightMap: Record<FontWeight, number> = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  };

  return (
    <h1
      className={`font-hubot ${className}`}
      style={{
        fontWeight: fontWeightMap[fontWeight],
        fontSize: `${size}px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </h1>
  );
};

/**
 * HubotH2 Component
 * Subheading component using Hubot font with full HTML props support
 *
 * @example
 * <HubotH2>Section Title</HubotH2>
 * <HubotH2 fontWeight="semibold" size={32}>Subtitle</HubotH2>
 */
interface HubotH2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  fontWeight?: FontWeight;
  size?: number;
  children: React.ReactNode;
}

export const HubotH2: React.FC<HubotH2Props> = ({
  fontWeight = 'bold',
  size = 36,
  className = '',
  style,
  children,
  ...props
}) => {
  const fontWeightMap: Record<FontWeight, number> = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  };

  return (
    <h2
      className={`font-hubot ${className}`}
      style={{
        fontWeight: fontWeightMap[fontWeight],
        fontSize: `${size}px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </h2>
  );
};

/**
 * HubotH3 Component
 * Small heading component using Hubot font with full HTML props support
 *
 * @example
 * <HubotH3>Card Title</HubotH3>
 */
interface HubotH3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  fontWeight?: FontWeight;
  size?: number;
  children: React.ReactNode;
}

export const HubotH3: React.FC<HubotH3Props> = ({
  fontWeight = 'semibold',
  size = 28,
  className = '',
  style,
  children,
  ...props
}) => {
  const fontWeightMap: Record<FontWeight, number> = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  };

  return (
    <h3
      className={`font-hubot ${className}`}
      style={{
        fontWeight: fontWeightMap[fontWeight],
        fontSize: `${size}px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  );
};

/**
 * HubotP Component
 * Paragraph component using Hubot font with full HTML props support
 *
 * @example
 * <HubotP>Body text with Hubot font</HubotP>
 * <HubotP fontWeight="medium" size={16}>Larger paragraph</HubotP>
 */
interface HubotPProps extends React.HTMLAttributes<HTMLParagraphElement> {
  fontWeight?: FontWeight;
  size?: number;
  children: React.ReactNode;
}

export const HubotP: React.FC<HubotPProps> = ({
  fontWeight = 'regular',
  size = 16,
  className = '',
  style,
  children,
  ...props
}) => {
  const fontWeightMap: Record<FontWeight, number> = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  };

  return (
    <p
      className={`font-hubot ${className}`}
      style={{
        fontWeight: fontWeightMap[fontWeight],
        fontSize: `${size}px`,
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  );
};

/**
 * HubotSpan Component
 * Inline text component using Hubot font with full HTML props support
 *
 * @example
 * <p>This is <HubotSpan fontWeight="bold">important</HubotSpan> text</p>
 */
interface HubotSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  fontWeight?: FontWeight;
  size?: number;
  children: React.ReactNode;
}

export const HubotSpan: React.FC<HubotSpanProps> = ({
  fontWeight = 'regular',
  size,
  className = '',
  style,
  children,
  ...props
}) => {
  const fontWeightMap: Record<FontWeight, number> = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  };

  const baseStyle: React.CSSProperties = {
    fontWeight: fontWeightMap[fontWeight],
    ...style,
  };

  if (size) {
    baseStyle.fontSize = `${size}px`;
  }

  return (
    <span className={`font-hubot ${className}`} style={baseStyle} {...props}>
      {children}
    </span>
  );
};