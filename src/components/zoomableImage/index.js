import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const ZoomableImage = ({ src }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const zoomInterval = setInterval(() => {
      // Réglage du niveau de zoom entre 0.5 et 2 (par exemple)
      setZoomLevel((prevZoomLevel) =>
        prevZoomLevel === 2 ? 0.5 : prevZoomLevel + 0.5
      );
    }, 1000); // Changer la vitesse de zoom/dézoom en ajustant l'intervalle
    return () => clearInterval(zoomInterval);
  }, []);

  return (
    <div>
      <img
        src={src}
        style={{
          transform: `scale(${zoomLevel})`,
          display: "block", // Pour éviter l'espace sous l'image
          margin: "0 auto", // Centrer horizontalement
          zIndex: -10
        }}
      />
    </div>
  );
};

export default ZoomableImage;
