import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import { useTheme } from '../../components/themeProvider';
import useMarkdownData from './useMarkdownData';
import CodeBlock from './codeBlock/codeBlock';
import VideoBlock from './videoBlock/videoBlock';
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import './markdownRender.css';

const MarkdownRender = ({ markdownPath, onTocUpdate }) => {
    const { markdown, error } = useMarkdownData(markdownPath, onTocUpdate);
    const { isDarkMode } = useTheme();

    if (error) {
        return (
            <div className="error-container">
                <span>Error: {error}</span>
                <button onClick={() => window.location.reload()}>Reload</button>
            </div>
        );
    }

    return (
        <div className="markdown-container markdown-body markdown" style={{ font: `${isDarkMode ? "#ffffff" : "#000000"}` }}>
            {markdown ? (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath, [remarkToc, { tight: true }]]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex, rehypeSlug]}
                    components={{
                        code: CodeBlock, // Custom code block rendering
                        a: VideoBlock,   // Custom video link rendering
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span>Loading...</span>
                </div>
            )}
        </div>
    );
};

export default MarkdownRender;
