"use client";
import React, { useState } from "react";
import Image from "next/image";

const ImageWithFallback: React.FC<{
  src: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
}> = ({ src, fallbackSrc, alt, width, height }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
