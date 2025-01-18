import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css"; // 代码高亮样式
import "./markdownRender.css";

const MarkdownRender = ({ markdownPath }) => {
    const [markdown, setMarkdownFile] = useState(""); // Markdown 内容
    const [error, setError] = useState(null); // 错误信息
    const [outputs, setOutputs] = useState({}); // 存储代码块的执行结果
    const [pyodide, setPyodide] = useState(null); // Pyodide 实例加载状态
    const pyodideRef = useRef(null); // 使用 useRef 保存 Pyodide 实例

    // 初始化 Pyodide
    useEffect(() => {
        const loadPyodideInstance = async () => {
            try {
                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js";
                script.onload = async () => {
                    const pyodideInstance = await window.loadPyodide();
                    setPyodide(pyodideInstance); // 设置状态以触发渲染
                    pyodideRef.current = pyodideInstance; // 保存到 useRef
                };
                script.onerror = () => {
                    setError("Failed to load Pyodide.");
                };
                document.body.appendChild(script);
            } catch (error) {
                setError("Failed to initialize Python runtime.");
            }
        };

        loadPyodideInstance();
    }, []);

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
    const executeCode = async (code) => {
        if (!pyodideRef.current) {
            return "Python runtime is still loading. Please wait.";
        }

        try {
            const result = await pyodideRef.current.runPythonAsync(code);
            return result;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    };

    // 自定义代码块组件
    const CodeBlock = ({ children, className, ...props }) => {
        const code = children.map((child) => {
            if (typeof child === "object" && child.props && child.props.children) {
                return child.props.children; // 处理对象类型
            } else {
                return String(child)
            }
        }).join(""); // 合并为单个字符串

        const language = className ? className.replace("hljs language-", "") : null;
        // console.log(code)

        if (!outputs[code] && language === "python") {
            executeCode(code).then((result) => {
                setOutputs((prevOutputs) => ({
                    ...prevOutputs,
                    [code]: result || "Execution completed without output.",
                }));
            });
        }

        return (
            <div>
                <pre className="code-block">
                    <code className={className} {...props}>{children}</code>
                </pre>
                {language === "python" && (
                    <div className="output">
                        <strong>Output:</strong>
                        <pre>{outputs[code] || "Executing..."}</pre>
                    </div>
                )}
            </div>
        );
    };


    if (error) {
        return (
            <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
                {error}
            </div>
        );
    }

    return (
        <div className="markdown-container markdown-body markdown">
            {markdown ? (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                        code: CodeBlock, // 自定义代码块渲染
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