/**
 * 根据 Markdown 内容解析生成目录
 * @param {string} markdown - Markdown 文本
 * @param {Function} [idGenerator] - 可选的自定义 ID 生成器
 * @returns {Array} - ToC 数据结构 [{ level, title, id }]
 */

export const generateToC = (markdown, idGenerator = null) => {
    const lines = markdown.split("\n");
    const toc = [];
    let inCodeBlock = false; // 用于标记是否在代码块中

    lines.forEach((line) => {
        // 检测代码块开始或结束
        if (line.trim().startsWith("```")) {
            inCodeBlock = !inCodeBlock;
            return;
        }
        if (inCodeBlock) return; // 跳过代码块内容

        // 匹配标题
        const match = /^(#{1,6})\s+(.+)$/.exec(line.trim());
        if (match) {
            const [, hashes, title] = match;
            const level = hashes.length; // 根据 `#` 数量判断标题层级
            const id = idGenerator
                ? idGenerator(title, level) // 如果提供了自定义 ID 生成器，则使用
                : title
                    .toLowerCase()
                    .replace(/[^\w]+/g, "-") // 替换非单词字符为 `-`
                    .replace(/^-+|-+$/g, ""); // 去掉首尾的 `-`
            toc.push({ level, title, id });
        }
    });

    return toc;
};
