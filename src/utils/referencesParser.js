
// 用于解析多篇 BibTeX 格式的文献
const parseBibData = (text) => {
    // 将bib文献两个@之间的内容进行分段
    const bibRegex = /(@article[\s\S]*?)(?=@article|$)/g;

    // 构建正则表达式
    const titleRegex = /title\s*=\s*\{(.*?)}/i;
    const authorsRegex = /author\s*=\s*\{(.*?)}/i;
    const journalRegex = /journal\s*=\s*\{(.*?)}/i;
    const yearRegex = /year\s*=\s*\{(\d{4})}/i;
    const doiRegex = /DOI\s*=\s*\{(.*?)}/i;
    const abstractRegex = /abstract\s*=\s*\{(.*?)}/i
    const imageRegex =  /image\s*=\s*\{(.*?)}/i

    const references = [];
    let match;

    // 遍历每一篇文献
    while ((match = bibRegex.exec(text)) !== null) {
        // 提取所需字段
        const title = titleRegex.exec(match);
        const authors = authorsRegex.exec(match);
        const journal = journalRegex.exec(match);
        const year = yearRegex.exec(match);
        const doi = doiRegex.exec(match);
        const abstract = abstractRegex.exec(match);
        const image = imageRegex.exec(match);

        // 构建参考文献对象
        const reference = {
            title: title ? title[1] : "Unknown Title",
            authors: authors ? authors[1].split(' and ') : ["Unknown Author"],
            journal: journal ? journal[1]: "Unknown Journal",
            year: year ? year[1] : "Unknown Year",
            doi: doi ? doi[1]: "Unknown DOI",
            abstract : abstract ? abstract[1] : "No Abstract Available",
            image : image ? image[1] : "/images/avatar_init.jpg"
        };

        // 将参考文献添加到数组
        references.push(reference);
    }

    return references;
};




// 用于解析多篇 .nbib 格式的文献
const parseNbibData = (text) => {
    // Regex rules
    const titleRegex = /TI\s*-\s*([^.\r\n]+)/g;
    const authorRegex = /AU\s*-\s*(.+)/g;
    const journalRegex = /JT\s*-\s*(.+)/g;
    const yearRegex = /DP\s*-\s*(\d{4})/g;
    const doiRegex = /LID\s*-\s*(\d+\.\d+\/[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)(?:\s*\[doi])?/g;
    const dateRegex = /DP\s*-\s*(\d{4}\s+[A-Za-z]{3})/g;
    const abstractRegex = /AB\s*-\s*([\s\S]+?)(?=\n[A-Z]{2,}\s*-|$)/g;

    const references = [];

    let match;
    while ((match = titleRegex.exec(text)) !== null) {
        let ref = {};  // 每篇文献单独存储

        ref.title = match[1];

        const authorsMatch = [...text.matchAll(authorRegex)].map((match) => match[1]);
        ref.authors = authorsMatch.length > 0 ? authorsMatch : ["Unknown Author"];

        const journalMatch = journalRegex.exec(text);
        ref.journal = journalMatch ? journalMatch[1] : "Unknown Journal";

        const yearMatch = yearRegex.exec(text);
        ref.year = yearMatch ? yearMatch[1] : "Unknown Year";

        const doiMatch = doiRegex.exec(text);
        ref.doi = doiMatch ? doiMatch[1] : "Unknown DOI";

        const dateMatch = dateRegex.exec(text);
        ref.date = dateMatch ? dateMatch[1] : "Unknown Date";

        const abstractMatch = abstractRegex.exec(text);
        ref.abstract = abstractMatch ? abstractMatch[1] : "No Abstract Available";

        references.push(ref);
    }

    return references;
};

// 自动检测文件类型并解析内容
const parseReferenceContent = (text) => {
    // 判断文件内容是否为 bib 或 nbib 格式
    const detectFileType = (text) => {
        const isBib = /@\w+\s*\{/.test(text);  // 检查是否是 BibTeX 格式
        const isNbib = /TI\s*-/.test(text);    // 检查是否是 .nbib 格式

        if (isBib) return "bib";
        if (isNbib) return "nbib";
        return null;
    };

    const fileType = detectFileType(text);

    // 根据检测到的文件类型调用相应的解析函数
    if (fileType === "bib") {
        return parseBibData(text);  // 返回多篇文献的数组
    } else if (fileType === "nbib") {
        return parseNbibData(text); // 返回多篇文献的数组
    }

    return null;  // 无法识别的格式
};

export { parseReferenceContent };
