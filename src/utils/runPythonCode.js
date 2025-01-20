import React, { useState } from "react";
import axios from "axios";

const RunCode = () => {
    const [code, setCode] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleRunCode = async () => {
        if (!code.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post("http://<Mac-mini-IP>:5000/run_code", {
                code: code,
            });
            setResult(response.data.result);
        } catch (error) {
            console.error("Error running code:", error);
            setResult("Error running code");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Run Python Code</h1>
            <textarea
                value={code}
                onChange={handleCodeChange}
                placeholder="Write your Python code here..."
                rows="10"
                cols="50"
            />
            <br />
            <button onClick={handleRunCode} disabled={loading}>
                {loading ? "Running..." : "Run Code"}
            </button>

            {result && (
                <div>
                    <h3>Output:</h3>
                    <pre>{result}</pre>
                </div>
            )}
        </div>
    );
};

export default RunCode;
