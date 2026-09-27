import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LessonBrief } from './LessonBrief';
import { HintLadder } from './HintLadder';
import { Lesson } from '../../core/models/Lesson';

interface SidebarPanelProps {
    lesson: Lesson;
    lang: 'pl' | 'en';
    isExecuting: boolean;
    onRunCode: () => void;
}

export const SidebarPanel = ({ lesson, lang, isExecuting, onRunCode }: SidebarPanelProps) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'lesson' | 'hints' | 'ai'>('lesson');

    return (
        <aside className="w-1/3 flex flex-col border-r border-gray-700 bg-[#252526]">
            <div className="flex border-b border-gray-700 bg-[#1e1e1e] px-4 pt-2 gap-4">
                <button onClick={() => setActiveTab('lesson')} className={`pb-2 ${activeTab === 'lesson' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-500'}`}>{t('tab_lesson')}</button>
                <button onClick={() => setActiveTab('hints')} className={`pb-2 ${activeTab === 'hints' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-500'}`}>{t('tab_hints', { count: lesson?.hints?.length || 0 })}</button>
                <button onClick={() => setActiveTab('ai')} className={`pb-2 ${activeTab === 'ai' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-500'}`}>{t('tab_ai')}</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'lesson' && <LessonBrief content={lesson.content} lang={lang} />}
                {activeTab === 'hints' && <HintLadder hints={lesson.hints} lang={lang} />}
                {activeTab === 'ai' && <div className="text-gray-400">{t('tab_ai')} (Wkrótce)</div>}
            </div>

            <div className="p-4 border-t border-gray-700 bg-[#1e1e1e]">
                <button
                    onClick={onRunCode}
                    disabled={isExecuting}
                    className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-md font-medium"
                >
                    {isExecuting ? t('executing') : t('run_code')}
                </button>
            </div>
        </aside>
    );
};