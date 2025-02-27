import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import useMarkdownData from './useMarkdownData';
import CodeBlock from './codeBlock/codeBlock';
import VideoBlock from './videoBlock/videoBlock';
import ImageBlock from './imageBlock'
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import './markdownRender.css';
import { useTheme } from "../Provider/themeProvider";
import PropTypes from 'prop-types'
import Placeholder from 'react-bootstrap/Placeholder';
import { visit } from 'unist-util-visit';


CodeBlock.propTypes = {
    inline: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string
};


/**
 * 自定义 rehype 插件，修正 `id`
 */
function rehypeCustomSlug() {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (node.tagName.match(/^h[1-6]$/) && node.properties && node.properties.id) {
                node.properties.id = node.properties.id
                    .replace(/\d+/g, '')       // **去掉所有数字**
                    .replace(/\./g, '-')       // **替换 `.` 为 `-`**
                    .trim()
                    .replace(/\s+/g, '-')      // **用 `-` 替换空格**
                    .replace(/-+/g, '-')       // **合并多个 `-`**
                    .replace(/^-/, '');        // **去掉开头的 `-`（如果存在）**
            }
        });
    };
}


const MarkdownRender = ({ markdownPath, onTocUpdate }) => {
    const { isDarkMode } = useTheme()
    const { markdown, error } = useMarkdownData(markdownPath, onTocUpdate);

    if (error) {
        return (
            <div className="error-container">
                <span>Error: {error}</span>
                <button onClick={() => window.location.reload()}>Reload</button>
            </div>
        );
    }


    return (
        <div className={`markdown-container markdown-body markdown ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {markdown ? (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath, [remarkToc, { tight: true }]]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex, rehypeSlug, rehypeCustomSlug]}
                    components={{
                        code({inline, className, children }) {
                            return (
                                <CodeBlock
                                    inline={inline}
                                    className={className}
                                >
                                    {children}
                                </CodeBlock>
                            )
                        },
                        video: VideoBlock,
                        blockquote({ children }) {
                            return <blockquote style={{ color: isDarkMode ? "#999" : "#555" }}>{children}</blockquote>;
                        },
                        img: ({ src, alt, width, height }) => {
                            if (alt === 'video') {
                                return (
                                    <VideoBlock href={src}/>
                                );
                            }
                            return (
                                <ImageBlock
                                    markdownPath={markdownPath}
                                    src={src}
                                    alt={alt}
                                    width={width}
                                    height={height}
                                />
                            );
                        },
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            ) : (
                <div>
                    <Placeholder xs={6} animation="glow"/>
                    <Placeholder xs={6} animation="glow"/>
                    <Placeholder xs={6} animation="glow"/>
                    <Placeholder xs={6} animation="glow"/>
                    <Placeholder xs={6} animation="glow"/>
                </div>
            )}
        </div>
    );
};


export default MarkdownRender;
