import React from 'react';
import { embed } from 'video-embed';

const getVideoEmbedUrl = (url) => {
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

    return embedUrl ? (
        <iframe
            width="640"
            height="360"
            src={embedUrl}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Video"
        ></iframe>
    ) : (
        <a href={href}>Cannot load video</a>
    );
};

export default VideoBlock;
