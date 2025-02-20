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
        <div style={{ textAlign: 'center', width: "100%" }}>
            <img
                src={imageSrc(markdownPath, src)}
                alt={alt}
                style={{ width: "80%", height: "auto" }}
            />
        </div>
    );
}

export default imageBlock;