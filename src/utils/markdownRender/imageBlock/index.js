import React from 'react';

const imageBlock = ({ src, alt, width, height }) => (
    <div style={{ textAlign: 'center' }}>
        <img
            src={src}
            alt={alt}
            style={{ width: width || 'auto', height: height || 'auto' }}
        />
    </div>
);

export default imageBlock;