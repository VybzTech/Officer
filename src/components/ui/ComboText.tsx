import React from "react";
import { useFonts } from "@/hooks/useFonts";
import { COLORS } from "@/constants/colors";

export type FontWeight =
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";
export type FontFamily = "poppins" | "hubot" | "sans";

export interface ComboTextProps {
  firstText: string;
  secondText: string;
  firstColor?: string;
  secondColor?: string;
  fontFamily?: FontFamily;
  fontWeight?: FontWeight;
  size?: number;
  className?: string;
  gap?: number; // Gap between first and second text in rem units
  lineHeight?: number;
  letterSpacing?: number;
}

/**
 * ComboText Component
 * Renders two text segments with different colors and styles
 *
 * @example
 * <ComboText
 *   firstText="Welcome to"
 *   secondText="MyApp"
 *   firstColor={COLORS.text}
 *   secondColor={COLORS.primary}
 *   fontFamily="hubot"
 *   fontWeight="bold"
 *   size={28}
 *   gap={3}
 * />
 */
const ComboText: React.FC<ComboTextProps> = ({
  firstText,
  secondText,
  firstColor = COLORS.text,
  secondColor = COLORS.primary,
  fontFamily = "poppins",
  fontWeight = "regular",
  size = 16,
  className = "",
  gap = 3,
  lineHeight,
  letterSpacing,
}) => {
  const { fontsLoaded } = useFonts();

  // Font weight to numeric mapping for CSS
  const fontWeightMap: Record<FontWeight, number> = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800, // Fixed: was 900, should be 800
  };

  // Font family mapping to Tailwind values
  const fontFamilyMap: Record<FontFamily, string> = {
    poppins: "'Poppins', sans-serif",
    hubot: "'Hubot', sans-serif",
    sans: "system-ui, sans-serif",
  };

  const fontWeightValue = fontWeightMap[fontWeight];
  const fontFamilyValue = fontFamilyMap[fontFamily];
  const gapValue = gap * 0.25; // Convert to rem units (gap-3 = 0.75rem)

  const textStyle: React.CSSProperties = {
    fontFamily: fontFamilyValue,
    fontWeight: fontWeightValue,
    fontSize: `${size}px`,
    lineHeight: lineHeight ? `${lineHeight}px` : "inherit",
    letterSpacing: letterSpacing ? `${letterSpacing}px` : "normal",
    display: "inline",
  };

  const firstTextStyle: React.CSSProperties = {
    ...textStyle,
    color: firstColor,
  };

  const secondTextStyle: React.CSSProperties = {
    ...textStyle,
    color: secondColor,
    marginLeft: `${gapValue}rem`,
  };

  return (
    <span className={className} style={{ display: "inline" }}>
      <span style={firstTextStyle}>{firstText}</span>
      <span style={secondTextStyle}>{secondText}</span>
    </span>
  );
};

export default ComboText;