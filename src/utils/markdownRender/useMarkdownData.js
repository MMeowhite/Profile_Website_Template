import { useState, useEffect } from 'react';

const useMarkdownData = (markdownPath, onTocUpdate) => {
    const [markdown, setMarkdownFile] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                // 根据 markdownPath 解析 markdown 文件
                const response = await fetch(markdownPath);
                console.log("Fetching markdown from:", markdownPath);

                if (!response.ok) {
                    throw new Error(`Failed to fetch markdown file: ${response.status}`);
                }
                const text = await response.text();
                setMarkdownFile(text);

                // 目录生成
                if (onTocUpdate) {
                    const lines = text.split("\n");
                    const toc = [];
                    let inCodeBlock = false;

                    lines.forEach((line) => {
                        if (line.trim().startsWith("```")) inCodeBlock = !inCodeBlock; // 跳过代码块
                        if (inCodeBlock) return;

                        const match = /^(#{1,6})\s+(.+)$/.exec(line.trim());
                        if (match) {
                            const [, hashes, title] = match;
                            const level = hashes.length;
                            const id = title
                                .replace(/^\d+(\.\d+)*\s*/, "")  // **去掉标题前的数字**
                                .toLowerCase()
                                .replace(/[^\w\s-]/g, "")  // **仅保留字母、数字、短横线**
                                .trim()
                                .replace(/\s+/g, "-"); // **用短横线替换空格**

                            toc.push({ level, title, id });
                        }
                    });

                    onTocUpdate(toc); // 更新 Table of Contents
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
