import React from 'react';

const NextImage = ({ src, alt, width, height, fill, className, style, ...props }) => {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ objectFit: 'cover', width: '100%', height: '100%', ...style }}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default NextImage;
