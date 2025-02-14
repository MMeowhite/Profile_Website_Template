import React from 'react';
import { embed } from 'video-embed';
import { useMediaQuery } from "react-responsive";

const getVideoEmbedUrl = (url) => {
    // 视频网站正则表达式
    const youtubeRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|.*\/)([a-zA-Z0-9_-]+)|youtu\.be\/([a-zA-Z0-9_-]+))/;
    const vimeoRegex = /(?:https?:\/\/(?:www\.)?vimeo\.com\/([0-9]+))/;
    const bilibiliRegex = /(?:https?:\/\/(?:www\.)?bilibili\.com\/video\/([a-zA-Z0-9]+))/;


    if (youtubeRegex.test(url)) {
        const match = url.match(youtubeRegex);
        const videoId = match[1] || match[2];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    if (vimeoRegex.test(url)) {
        const videoId = url.split("/").pop();
        return `https://player.vimeo.com/video/${videoId}`;
    }

    if (bilibiliRegex.test(url)) {
        const videoId = url.split("/").pop();
        return `https://player.bilibili.com/player.html?bvid=${videoId}&autoplay=0`;
    }

    try {
        return embed(url);  // If no specific match, let video-embed library handle it
    } catch (e) {
        console.error("Error embedding video:", e);
        return url;
    }
};

const VideoBlock = ({ href }) => {
    const embedUrl = getVideoEmbedUrl(href);
    const isSmallScreen = useMediaQuery( { maxWidth: 768 });

    return embedUrl ? (
        <iframe
            width={isSmallScreen ?  "500px":  "800px"}  // 移动端100%宽度，PC端自动
            height={isSmallScreen ?  "281.25px" : "450px"} // 移动端自动高度，PC端100%
            src={embedUrl}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Video"
            style={{
                objectFit: isSmallScreen ? "contain" : "cover",  // 根据设备调整适应方式
                maxWidth: "100%", // 保证宽度不会超过容器
                maxHeight: "100%", // 保证高度不会超过容器
                display: "block" // 让 iframe 成为块级元素，避免内联布局问题
            }}
        />
    ) : (
        <a href={href}>Cannot load video</a>
    );
};

export default VideoBlock;
