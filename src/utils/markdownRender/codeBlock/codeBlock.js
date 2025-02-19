import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import useExecuteCode from './useExecuteCode';
import { useTheme } from "../../themeProvider";

const CodeBlock = ({ inline=true, children, className = ''}) => {
    const { isDarkMode } = useTheme();


    // 处理块级代码
    const langMatch = className.match(/language-(\w+)/);
    const language = langMatch ? langMatch[1] : 'python';

    const code = React.Children.toArray(children).join('');

    const languageParams = {
        python_language: language === "python" ? code : "",
        r_language: language === "r" ? code : ""
    };

    const { loading, localOutput, executeCode } = useExecuteCode(code, languageParams);

    // 处理内联代码
    if (inline) {
        return (
            <code
                className={className}
                style={{
                    color: isDarkMode ? "#fff" : "#000",
                    backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
                    padding: '0.2em 0.4em',
                    borderRadius: 3,
                    fontSize: '0.9em',
                }}
            >
                {children}
            </code>
        );
    }


    return (
        <div className="code-container">
            <pre className={`code-block ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <code
                    className={className}
                    style={{ color: isDarkMode ? "#fff" : "#000" }}
                >
                    {children}
                </code>
            </pre>

            {/* 执行控件 */}
            {['python', 'r'].includes(language) && (
                <div className="execution-controls" >
                    <Button
                        onClick={executeCode}
                        disabled={loading}
                        className="execute-button"
                        aria-label="Run Code"
                    >
                        {loading ? 'Running...' : `Run Code`}
                    </Button>

                    {loading && <Spinner animation="border" variant="primary" />}

                    {localOutput && (
                        <div className="output">
                            <strong>Output:</strong>
                            <pre>{localOutput}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CodeBlock;