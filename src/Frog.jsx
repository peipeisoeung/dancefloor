import { useEffect, useState } from 'react';
import frogSvg from './assets/frog/frog4.svg';

const Frog = ({ color = "#4CAF50" }) => {
  const [filterStyle, setFilterStyle] = useState({});

  useEffect(() => {
    // Convert hex/hsl color to hue rotation filter
    const getHueRotation = (color) => {
      // Parse HSL color if provided
      if (color.startsWith('hsl')) {
        const hueMatch = color.match(/hsl\((\d+)/);
        if (hueMatch) {
          const hue = parseInt(hueMatch[1]);
          // Base hue is around 15 (orange/red from original)
          const rotation = hue - 15;
          return rotation;
        }
      }

      // For hex colors, convert to HSL
      const hexToHue = (hex) => {
        // Remove # if present
        hex = hex.replace('#', '');

        // Convert to RGB
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;

        let h = 0;

        if (diff !== 0) {
          if (max === r) {
            h = 60 * (((g - b) / diff) % 6);
          } else if (max === g) {
            h = 60 * (((b - r) / diff) + 2);
          } else {
            h = 60 * (((r - g) / diff) + 4);
          }
        }

        if (h < 0) h += 360;

        return Math.round(h);
      };

      const hue = hexToHue(color);
      return hue - 15; // Adjust from base orange color
    };

    const rotation = getHueRotation(color);
    setFilterStyle({
      filter: `hue-rotate(${rotation}deg) saturate(1.2)`,
    });
  }, [color]);

  return (
    <div style={filterStyle}>
      <img
        src={frogSvg}
        alt="Dancing Frog"
        style={{
          width: '150px',
          height: 'auto',
          transition: 'filter 0.5s ease',
        }}
      />
    </div>
  );
};

export default Frog;
