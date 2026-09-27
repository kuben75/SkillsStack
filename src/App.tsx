import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCodeExecution } from './application/hooks/useCodeExecution';
import { Header } from './ui/components/Header';
import { SidebarPanel } from './ui/components/SidebarPanel';
import { WorkspacePanel } from './ui/components/WorkspacePanel';

import { Lesson } from "./core/models/Lesson";
import rawLessonData from './infrastructure/data/lesson_1.json';

type Lang = 'pl' | 'en';
const lessonData = rawLessonData as unknown as Lesson;

export default function App() {
    const { t, i18n } = useTranslation();
    const currentLang = (i18n.language || 'pl') as Lang;

    const [userCode, setUserCode] = useState(lessonData.workspace.initialCode);
    const { result, isExecuting, runCode } = useCodeExecution();

    return (
        <div className="h-screen w-screen bg-[#1e1e1e] text-gray-300 flex flex-col font-sans overflow-hidden">
            <Header
                title={lessonData.title[currentLang]}
                currentLang={currentLang}
                onToggleLang={() => i18n.changeLanguage(currentLang === 'pl' ? 'en' : 'pl')}
            />

            <div className="flex flex-1 overflow-hidden">
                <SidebarPanel
                    lesson={lessonData}
                    lang={currentLang}
                    isExecuting={isExecuting}
                    onRunCode={() => runCode(userCode, t('system_error'))}
                />

                <WorkspacePanel
                    userCode={userCode}
                    setUserCode={setUserCode}
                    result={result}
                    lessonType={lessonData.type}
                />
            </div>
        </div>
    );
}