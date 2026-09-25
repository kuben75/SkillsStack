import {Editor} from "@monaco-editor/react";
export interface CodeEditorProps {
    code: string;
    language?: string;
    onChange: (value: string | undefined) => void;
    readOnly?: boolean;
}

export const CodeEditor = ({
    code,
    language = 'javascript',
    onChange,
    readOnly = false
}: CodeEditorProps) => {
    return (
        <Editor height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={onChange}
               options={{
                   minimap: {enabled: false},
                   fontSize: 15,
                   wordWrap: "on",
                   scrollBeyondLastLine: false,
                   readOnly: readOnly,
                   padding: {top: 16}
               }}
        />
    )
}
