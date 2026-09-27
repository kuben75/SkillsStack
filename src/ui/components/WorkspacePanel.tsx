import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CodeEditor } from './CodeEditor';
import { BrowserPreview } from './BrowserPreview';
import { Terminal } from './Terminal';
import { ExecutionResult } from '../../infrastructure/tauriAdapter';

interface WorkspacePanelProps {
    userCode: string;
    setUserCode: (code: string) => void;
    result: ExecutionResult | null;
    lessonType: 'console' | 'ui';
}

export const WorkspacePanel = ({ userCode, setUserCode, result, lessonType }: WorkspacePanelProps) => {
    const { t } = useTranslation();
    const [workspaceTab, setWorkspaceTab] = useState<'editor' | 'preview'>('editor');

    return (
        <section className="w-2/3 flex flex-col relative bg-[#1e1e1e]">
            {lessonType === 'ui' && (
                <div className="h-10 bg-[#1e1e1e] flex items-end px-4 border-b border-gray-800 gap-2 shrink-0 pt-2">
                    <button
                        onClick={() => setWorkspaceTab('editor')}
                        className={`px-4 py-1.5 text-sm rounded-t-md border-t border-x transition-colors ${
                            workspaceTab === 'editor'
                                ? 'bg-[#2d2d2d] border-gray-700 text-yellow-400'
                                : 'bg-[#1e1e1e] border-transparent text-gray-500 hover:bg-[#252526]'
                        }`}
                    >
                        <span className="text-yellow-500 mr-2">JS</span>
                        {t('tab_editor')}
                    </button>

                    <button
                        onClick={() => setWorkspaceTab('preview')}
                        className={`px-4 py-1.5 text-sm rounded-t-md border-t border-x transition-colors ${
                            workspaceTab === 'preview'
                                ? 'bg-white border-gray-300 text-black'
                                : 'bg-[#1e1e1e] border-transparent text-gray-500 hover:bg-[#252526]'
                        }`}
                    >
                        <span className="mr-2">👁️</span>
                        {t('tab_preview')}
                    </button>
                </div>
            )}

            {lessonType === 'console' && (
                <div className="h-10 bg-[#2d2d2d] flex items-center px-4 border-b border-gray-800">
                    <div className="px-3 py-1 bg-[#1e1e1e] text-yellow-400 text-sm border-t-2 border-yellow-500 flex items-center gap-2">
                        script.js
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-hidden flex flex-col">
                {workspaceTab === 'editor' || lessonType === 'console' ? (
                    <CodeEditor code={userCode} onChange={(val) => setUserCode(val || "")} />
                ) : (
                    <BrowserPreview htmlContent={`<html><body><script>${userCode}</script><h1>Live UI</h1></body></html>`} />
                )}
            </div>

            <div className="h-1/3 border-t border-gray-800 shrink-0">
                <Terminal result={result} />
            </div>
        </section>
    );
};