import {invoke} from '@tauri-apps/api/core';
export interface ExecutionResult {
    success: boolean;
    stdout: string;
    stderr: string;
}
export const invokeProjectStatus = async (projectId: string): Promise<string>  =>{
    try {
        return await invoke<string>('validate_project_status', {projectId});
    }
    catch (error) {
        console.error("błąd podczas połączenia z Rustem", error)
        throw new Error("Błąd podczas połączenia z Rustem");
    }
}

export const invokeCodeExecution = async (code: string): Promise<ExecutionResult> => {
    try {
        return await invoke<ExecutionResult>('execute_js_code', {code});
    }
    catch (e) {
        console.error("Błąd systemowy podczas uruchamiania kodu");
        throw new Error(String(e));
    }
}