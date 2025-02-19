import { useState, useCallback } from 'react';
import axios from 'axios';

const useExecuteCode = (code, languageParams) => {
    const [loading, setLoading] = useState(false);
    const [localOutput, setLocalOutput] = useState(null);

    const executeCode = useCallback(async () => {
        setLoading(true);
        setLocalOutput(null);

        try {
            // Trigger code execution
            const response = await axios.post('http://192.168.10.45:8080/run_code', {
                // the parameters passed to backend server
                code, // code part
                ...languageParams, // which language should be executed
            });
            setLocalOutput(response.data.result); // Only set the result
            setLoading(false);
        } catch (error) {
            setLocalOutput(`Error executing code: ${error.message}`);
            setLoading(false);
        }
    }, [code, languageParams]);

    return { loading, localOutput, executeCode };
};


export default useExecuteCode;
