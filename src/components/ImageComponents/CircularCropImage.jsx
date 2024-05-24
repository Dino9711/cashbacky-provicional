import React from 'react';

export const CircularCropImage = ({ image, width, height }) => {
  return (
    <>
      <img
        src={image}
        alt='product'
        style={{
          borderRadius: '50%',
          width: width ?? '75px',
          height: height ?? 'auto',
          objectFit: 'cover',
        }}
      />
    </>
  );
};
