import React from 'react';


const imageBlock = ({ markdownPath, src, alt, width, height }) => {

    const imageSrc = (markdownPath, src) => {
        if (src.startsWith('.')) {
            const imageRootPath = markdownPath.replace(/[^/]+$/, "");

            const adjustedSrc = src.replace(/^\.\/+/, '');

            // 合并两者
            return imageRootPath + adjustedSrc;
        }

        return src
    };


    return (
        <div style={{ textAlign: 'center' }}>
            <img
                src={imageSrc(markdownPath, src)}
                alt={alt}
                style={{ width: width || 'auto', height: height || 'auto' }}
            />
        </div>
    );
}

export default imageBlock;