// src/components/MarkdownRender/useMarkdownData.js
import { useState, useEffect } from 'react';

const useMarkdownData = (markdownPath, onTocUpdate) => {
    const [markdown, setMarkdownFile] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(markdownPath);
                if (!response.ok) {
                    throw new Error(`Failed to fetch markdown file: ${response.status}`);
                }
                const text = await response.text();
                setMarkdownFile(text);

                if (onTocUpdate) {
                    // Generate ToC (Table of Contents)
                    const lines = text.split("\n");
                    const toc = [];
                    let inCodeBlock = false;

                    lines.forEach((line) => {
                        if (line.trim().startsWith("```")) inCodeBlock = !inCodeBlock; // Skip code blocks
                        if (inCodeBlock) return;

                        const match = /^(#{1,6})\s+(.+)$/.exec(line.trim());
                        if (match) {
                            const [, hashes, title] = match;
                            const level = hashes.length;
                            const id = title
                                .toLowerCase()
                                .replace(/[^\w]+/g, "-")
                                .replace(/^-+|-+$/g, "");
                            toc.push({ level, title, id });
                        }
                    });

                    onTocUpdate(toc); // Update Table of Contents in parent
                }
            } catch (error) {
                setError("Failed to load Markdown content.");
            }
        };

        if (markdownPath) {
            fetchMarkdown();
        }
    }, [markdownPath, onTocUpdate]);

    return { markdown, error };
};

export default useMarkdownData;
