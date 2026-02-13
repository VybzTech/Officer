import { useEffect, useState } from "react";

/**
 * Hook to load custom fonts (Poppins and Hubot)
 * Hubot loads from local assets first, with Google Fonts as fallback
 */
export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<string | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Create a style element for Google Fonts and local fonts
        const link = document.createElement("link");
        link.href =
          "https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&family=Hubot+Sans:wght@200;400;500;600;700;800&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Load local Hubot font files as fallback
        const fontFaces = `
          @font-face {
            font-family: 'Hubot';
            src: url('@/assets/fonts/HubotSans-Light.ttf') format('truetype');
            font-weight: 200;
          }
          @font-face {
            font-family: 'Hubot';
            src: url('@/assets/fonts/HubotSans-Regular.ttf') format('truetype');
            font-weight: 400;
          }
          @font-face {
            font-family: 'Hubot';
            src: url('@/assets/fonts/HubotSans-Medium.ttf') format('truetype');
            font-weight: 500;
          }
          @font-face {
            font-family: 'Hubot';
            src: url('@/assets/fonts/HubotSans-SemiBold.ttf') format('truetype');
            font-weight: 600;
          }
          @font-face {
            font-family: 'Hubot';
            src: url('@/assets/fonts/HubotSans-Bold.ttf') format('truetype');
            font-weight: 700;
          }
          @font-face {
            font-family: 'Hubot';
            src: url('/fonts/HubotSans-ExtraBold.ttf') format('truetype');
            font-weight: 900;
          }
        `;

        const style = document.createElement("style");
        style.innerHTML = fontFaces;
        document.head.appendChild(style);

        // Wait for fonts to load
        if ("fonts" in document) {
          await (document as any).fonts.ready;
        }

        setFontsLoaded(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
        setFontError(error instanceof Error ? error.message : "Unknown error");
        // Still mark as loaded even if there's an error - will use fallbacks
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  return { fontsLoaded, fontError };
};
