import React, { useState } from 'react';
import { Blurhash } from "react-blurhash";

function ImageWithPlaceholder({ blurhash, src, width = "100%", height = "100%", style = {} }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div style={{
      position: 'relative',
      width,
      height,
      ...style,
      overflow: "hidden",
    }}>
      {!imageLoaded && (
        <Blurhash 
          hash={blurhash}
          width={width} 
          height={height}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        />
      )}
      <img 
        src={src} 
        alt="real" 
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: imageLoaded ? "block" : "none"
        }}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

export default ImageWithPlaceholder;
