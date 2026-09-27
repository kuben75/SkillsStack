import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LessonContent } from '../../core/models/Lesson';

interface LessonBriefProps {
    content: LessonContent;
    lang: 'pl' | 'en';
}

export const LessonBrief = ({ content, lang }: LessonBriefProps) => {
    const { t } = useTranslation();
    const [mode, setMode] = useState<'guided' | 'engineering'>('guided');

    return (
        <div className="flex flex-col h-full">
            <div className="flex bg-[#121212] rounded-lg p-1 mb-6 border border-gray-800 shrink-0">
                <button
                    onClick={() => setMode('guided')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                        mode === 'guided' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                    {t('mode_guided')}
                </button>
                <button
                    onClick={() => setMode('engineering')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                        mode === 'engineering' ? 'bg-purple-600 text-white shadow' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                    {t('mode_engineering')}
                </button>
            </div>

            <h2 className="text-lg text-white mb-4 shrink-0">{t('your_task')}</h2>

            <div className="text-sm leading-relaxed text-gray-400 flex-1 overflow-y-auto pr-2">
                {mode === 'engineering' ? (
                    <p className="border-l-2 border-purple-500 pl-3 italic text-gray-300">
                        "{content.businessBrief[lang]}"
                    </p>
                ) : (
                    <ul className="space-y-3">
                        {content.guidedSteps[lang].map((step, index) => (
                            <li key={index} className="flex gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};