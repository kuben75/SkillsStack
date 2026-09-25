import {useState} from 'react';
import { invokeCodeExecution, ExecutionResult } from './infrastructure/tauriAdapter';
import { CodeEditor } from './ui/components/CodeEditor';
import './infrastructure/i18n';
import { useTranslation } from 'react-i18next';

import lessonData from './infrastructure/data/lesson_1.json';

// Definiujemy typy dla naszego suwaka (Type Safety)
type DifficultyMode = 'guided' | 'engineering';

export default function App() {
    const { t, i18n } = useTranslation();

    // Stan domyślnego kodu ładujemy z naszego pliku JSON!
    const [userCode, setUserCode] = useState(lessonData.workspace.initialCode);

    const [result, setResult] = useState<ExecutionResult | null>(null);
    const [isExecuting, setIsExecuting] = useState(false);

    // NOWOŚĆ: Stan suwaka personalizacji
    const [mode, setMode] = useState<DifficultyMode>('guided');

    const handleRunCode = async () => {
        if (!userCode.trim()) return;
        setIsExecuting(true);
        setResult(null);

        try {
            const response = await invokeCodeExecution(userCode);
            setResult(response);
        } catch (error) {
            setResult({
                success: false,
                stdout: "",
                stderr: `${t('system_error')} ${error}`
            });
        } finally {
            setIsExecuting(false);
        }
    };

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl');
    };

    return (
        <div className="h-screen w-screen bg-[#1e1e1e] text-gray-300 flex overflow-hidden font-sans">

            {/* PANEL LEWY */}
            <aside className="w-2/5 h-full border-r border-gray-700 flex flex-col">
                <header className="p-6 border-b border-gray-700 bg-[#252526] flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-wide">{t('app_title')}</h1>
                        {/* Tytuł lekcji również pobieramy z danych! */}
                        <p className="text-sm text-gray-400 mt-1">{lessonData.title}</p>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1 text-xs font-bold bg-[#1e1e1e] hover:bg-gray-700 text-gray-400 border border-gray-600 rounded transition-colors uppercase"
                    >
                        {i18n.language}
                    </button>
                </header>

                <main className="p-6 flex-1 flex flex-col overflow-hidden">

                    <div className="flex bg-[#121212] rounded-lg p-1 mb-6 border border-gray-800">
                        <button
                            onClick={() => setMode('guided')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                                mode === 'guided'
                                    ? 'bg-blue-600 text-white shadow'
                                    : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            {t('mode_guided')}
                        </button>
                        <button
                            onClick={() => setMode('engineering')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                                mode === 'engineering'
                                    ? 'bg-purple-600 text-white shadow'
                                    : 'text-gray-500 hover:text-gray-300'
                            }`}
                        >
                            {t('mode_engineering')}
                        </button>
                    </div>

                    <h2 className="text-lg text-white mb-4">{t('your_task')}</h2>

                    <div className="mb-6 text-sm leading-relaxed text-gray-400 h-32 overflow-y-auto pr-2">
                        {mode === 'engineering' ? (
                            <p className="border-l-2 border-purple-500 pl-3 italic text-gray-300">
                                "{lessonData.content.businessBrief}"
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {lessonData.content.guidedSteps.map((step, index) => (
                                    <li key={index} className="flex gap-2">
                                        <span className="text-blue-500 font-bold">•</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        onClick={handleRunCode}
                        disabled={isExecuting}
                        className={`w-full py-3 text-white rounded-md transition-colors font-medium shadow-lg flex justify-center items-center gap-2
              ${isExecuting ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'}`}
                    >
                        {isExecuting ? t('executing') : t('run_code')}
                    </button>

                    <div className="mt-6 flex-1 bg-[#121212] rounded-md border border-gray-800 flex flex-col overflow-hidden">
                        <div className="bg-[#1e1e1e] px-4 py-2 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {t('terminal_output')}
                        </div>
                        <div className="p-4 overflow-y-auto font-mono text-sm flex-1">
                            {!result && <span className="text-gray-600 italic">{t('waiting_for_run')}</span>}
                            {result?.stdout && <pre className="text-gray-300 whitespace-pre-wrap">{result.stdout}</pre>}
                            {result?.stderr && <pre className="text-red-400 whitespace-pre-wrap mt-2">{result.stderr}</pre>}
                        </div>
                    </div>
                </main>
            </aside>

            <section className="w-3/5 h-full flex flex-col">
                <div className="h-10 bg-[#2d2d2d] flex items-center px-4 border-b border-gray-800">
                    <div className="px-3 py-1 bg-[#1e1e1e] text-yellow-400 text-sm border-t-2 border-yellow-500 flex items-center gap-2">
                        script.js
                    </div>
                </div>
                <div className="flex-1">
                    <CodeEditor code={userCode} onChange={(val) => setUserCode(val || "")} />
                </div>
            </section>

        </div>
    );
}