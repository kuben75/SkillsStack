import { useTranslation } from 'react-i18next';
import { ExecutionResult } from '../../infrastructure/tauriAdapter';

interface TerminalProps {
    result: ExecutionResult | null;
}

export const Terminal = ({ result }: TerminalProps) => {
    const { t } = useTranslation();

    return (
        <div className="h-full bg-[#121212] flex flex-col overflow-hidden">
            <div className="bg-[#1e1e1e] px-4 py-2 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center h-10">
                {t('terminal_output')}
            </div>
            <div className="p-4 overflow-y-auto font-mono text-sm flex-1">
                {!result && <span className="text-gray-600 italic">{t('waiting_for_run')}</span>}
                {result?.stdout && <pre className="text-gray-300 whitespace-pre-wrap">{result.stdout}</pre>}
                {result?.stderr && <pre className="text-red-400 whitespace-pre-wrap mt-2">{result.stderr}</pre>}
            </div>
        </div>
    );
};