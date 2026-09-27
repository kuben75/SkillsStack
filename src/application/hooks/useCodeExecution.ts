import {useState} from "react";
import {ExecutionResult, invokeCodeExecution} from "../../infrastructure/tauriAdapter.ts";


export const useCodeExecution = () => {
    const [result, setResult] = useState<ExecutionResult | null>(null);
    const [isExecuting, setIsExecuting] = useState(false);

    const runCode = async (code: string, systemErrorMsg: string) => {
        if (!code.trim()) {
            return;
        }
        setIsExecuting(true);
        setResult(null);

        try {
            const response = await invokeCodeExecution(code);
            setResult(response)
        }catch (e) {
            setResult({success: false, stdout: "", stderr: `${systemErrorMsg} ${e}`})
        }
        finally {
            setIsExecuting(false);
        }
    }
    return {result, isExecuting, runCode}
}