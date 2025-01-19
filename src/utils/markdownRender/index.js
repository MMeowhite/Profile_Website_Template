import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "highlight.js/styles/github.css"; // 代码高亮样式
import "./markdownRender.css";
import "katex/dist/katex.min.css";
import {useTheme} from "../../components/themeProvider";

const MarkdownRender = ({ markdownPath }) => {
    const [markdown, setMarkdownFile] = useState(""); // Markdown 内容
    const [error, setError] = useState(null); // 错误信息
    const [outputs, setOutputs] = useState({}); // 存储代码块的执行结果
    const [pyodideLoading, setPyodideLoading] = useState(false); // Pyodide 加载状态
    const pyodideRef = useRef(null); // 使用 useRef 保存全局 Pyodide 实例
    const { isDarkMode } = useTheme();

    // 延迟加载 Pyodide（全局实例）
    const loadPyodide = async () => {
        if (pyodideRef.current) {
            return pyodideRef.current; // 如果已经加载过，直接返回实例
        }
        setPyodideLoading(true); // 设置加载状态
        try {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js";
            script.onload = async () => {
                const pyodideInstance = await window.loadPyodide();
                pyodideRef.current = pyodideInstance; // 保存全局实例
                setPyodideLoading(false); // 加载完成
            };
            script.onerror = () => {
                setError("Failed to load Pyodide.");
                setPyodideLoading(false);
            };
            document.body.appendChild(script);
        } catch (error) {
            setError("Failed to initialize Python runtime.");
            setPyodideLoading(false);
        }
    };

    // 从路径加载 Markdown 文件
    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(markdownPath);
                if (!response.ok) {
                    throw new Error(`Failed to fetch markdown file: ${response.status}`);
                }
                const text = await response.text();
                setMarkdownFile(text);
            } catch (error) {
                setError("Failed to load Markdown content.");
            }
        };
        fetchMarkdown();
    }, [markdownPath]);

    // 执行 Python 代码块
    const executeCode = useCallback(async (code) => {
        await loadPyodide(); // 确保 Pyodide 已加载

        if (!pyodideRef.current) {
            return "Python runtime failed to load.";
        }

        try {
            const pyodide = pyodideRef.current;

            // 提取代码中使用的库
            const importRegex = /import\s+([\w.]+)|from\s+([\w.]+)\s+import/g;
            const requiredPackages = [];
            let match;

            while ((match = importRegex.exec(code)) !== null) {
                const packageName = match[1] || match[2]; // 捕获 `import` 或 `from ... import` 的模块名
                if (packageName && !requiredPackages.includes(packageName)) {
                    requiredPackages.push(packageName.split(".")[0]); // 取库的主名称部分
                }
            }

            // 安装所需的第三方库
            if (requiredPackages.length > 0) {
                if (!pyodide.loadedPackages["micropip"]) {
                    await pyodide.loadPackage("micropip");
                }
                const micropip = pyodide.pyimport("micropip");
                for (const pkg of requiredPackages) {
                    if (!pyodide.loadedPackages[pkg]) {
                        try {
                            await micropip.install(pkg);
                        } catch (e) {
                            console.error(`Failed to install package ${pkg}:`, e);
                            return `Failed to install package: ${pkg}`;
                        }
                    }
                }
            }

            // 执行代码并转化结果
            const result = await pyodide.runPythonAsync(code);

            // 检查结果是否为 PyProxy 对象并转化为字符串
            if (result && typeof result.toString === "function") {
                return result.toString(); // 转为字符串
            }
            return result || "Execution completed without output.";
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }, []);

    // 自定义代码块组件
    const CodeBlock = ({ children, className, ...props }) => {
        const code = Array.isArray(children)
            ? children.map((child) => (typeof child === "object" ? child.props.children : String(child))).join("")
            : String(children);

        const language = className?.startsWith("hljs language-") ? className.replace("hljs language-", "") : null;
        const [localOutput, setLocalOutput] = useState(() => outputs[code]);
        const [loading, setLoading] = useState(false); // 单独的执行状态

        const handleExecute = useCallback(async () => {
            setLoading(true);
            try {
                const result = await executeCode(code);
                setOutputs((prevOutputs) => ({
                    ...prevOutputs,
                    [code]: result || "Execution completed without output.",
                }));
                setLocalOutput(result || "Execution completed without output.");
            } catch (error) {
                console.error("Execution error:", error);
                setLocalOutput(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }, [code]);

        if (language !== "python") {
            return (
                <div className="code-container">
          <pre className="code-block">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
                </div>
            );
        }

        return (
            <div className="code-container">
        <pre className="code-block">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
                <div className="execution-controls">
                    <button
                        onClick={handleExecute}
                        disabled={loading || pyodideLoading}
                        className="execute-button"
                        aria-label="Run Python Code"
                    >
                        {loading ? "Running..." : pyodideLoading ? "Loading Runtime..." : "Run Code"}
                    </button>
                    {localOutput && (
                        <div className="output" style={{backgroundColor: isDarkMode ? "#334155" : "#fafafa"}}>
                            <strong style={{ color: isDarkMode? "lightgreen" : "darkgreen" }}>Output:</strong>
                            <pre>{localOutput}</pre>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 视频嵌入组件
    const getVideoEmbedUrl = (url) => {
        const youtubeRegex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|.*\/)([a-zA-Z0-9_-]+))/;
        const vimeoRegex = /(?:https?:\/\/(?:www\.)?vimeo\.com\/([0-9]+))/;
        const bilibiliRegex = /(?:https?:\/\/(?:www\.)?bilibili\.com\/video\/([a-zA-Z0-9]+))/;

        if (youtubeRegex.test(url)) {
            const videoId = url.split("v=")[1];
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

        return null;
    };

    const VideoBlock = (props) => {
        const url = props.href;
        const embedUrl = getVideoEmbedUrl(url);

        if (embedUrl) {
            return (
                <iframe
                    width="640"
                    height="360"
                    src={embedUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="Video"
                ></iframe>
            );
        }

        return <a {...props}>cannot loading video block...</a>;
    };

    // 错误信息展示
    if (error) {
        return (
            <div className="error-container">
                <span>Error: {error}</span>
                <button onClick={() => window.location.reload()}>Reload</button>
            </div>
        );
    }

    return (
        <div className="markdown-container markdown-body markdown">
            {markdown ? (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
                    components={{
                        code: CodeBlock, // 自定义代码块渲染
                        a: VideoBlock,   // 自定义视频链接渲染
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            ) : (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <span>Loading...</span>
                </div>
            )}
        </div>
    );
};

export default MarkdownRender;
