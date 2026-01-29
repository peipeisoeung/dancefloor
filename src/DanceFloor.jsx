import { useState, useEffect } from 'react';
import Frog from './Frog';
import discoBall from './assets/decor/disco.png';
import './DanceFloor.css';

const DanceFloor = () => {
  const GRID_WIDTH = 12;
  const GRID_HEIGHT = 8;
  const TILE_COUNT = GRID_WIDTH * GRID_HEIGHT;

  // Generate random pastel colors
  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.floor(Math.random() * 20);
    const lightness = 60 + Math.floor(Math.random() * 20);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Initialize tiles with random colors
  const [tiles, setTiles] = useState(() =>
    Array.from({ length: TILE_COUNT }, () => ({
      color: generateRandomColor(),
      isAnimating: false,
    }))
  );

  const [frogColor, setFrogColor] = useState('#4CAF50');
  const [isPulse, setIsPulse] = useState(false);

  // Animate tiles to change colors periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTiles((prevTiles) =>
        prevTiles.map((tile) => ({
          ...tile,
          color: generateRandomColor(),
          isAnimating: true,
        }))
      );

      // Reset animation flag after animation completes
      setTimeout(() => {
        setTiles((prevTiles) =>
          prevTiles.map((tile) => ({
            ...tile,
            isAnimating: false,
          }))
        );
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Handle tile click
  const handleTileClick = (index) => {
    const clickedColor = tiles[index].color;
    setFrogColor(clickedColor);

    // Trigger pulse animation on frog
    setIsPulse(true);
    setTimeout(() => setIsPulse(false), 300);
  };

  return (
    <div className="dance-floor-container">
      {/* Disco ball at the top */}
      <div
        className="disco-ball-wrapper"
        style={{
          filter: `drop-shadow(0 0 30px ${frogColor}) drop-shadow(0 0 60px ${frogColor})`,
        }}
      >
        <img src={discoBall} alt="Disco Ball" className="disco-ball" />
      </div>

      {/* Dance floor grid with frog in center */}
      <div className="grid-wrapper">
        <div
          className="dance-floor-grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
          }}
        >
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={`tile ${tile.isAnimating ? 'tile-animate' : ''}`}
              style={{ backgroundColor: tile.color }}
              onClick={() => handleTileClick(index)}
            />
          ))}
        </div>

        {/* Frog in the center */}
        <div className={`frog-container ${isPulse ? 'pulse' : ''}`}>
          <Frog color={frogColor} />
        </div>
      </div>
    </div>
  );
};

export default DanceFloor;
