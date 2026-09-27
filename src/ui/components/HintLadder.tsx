import {Hint} from "../../core/models/Lesson.ts";
import {useTranslation} from "react-i18next";
import {useState} from "react";

interface HintLadderProps {
    hints: Hint[] | undefined;
    lang: "pl" | "en"
}


export const HintLadder = ({hints = [], lang}: HintLadderProps) => {
    const {t} = useTranslation();
    const [revealedCount, setRevealedCount] = useState(0);

    const handleReveal = () => {
        if (revealedCount < hints.length) {
            setRevealedCount(prev => prev + 1);
        }
    };

    if(hints.length === 0) {
        return <div className="text-gray-500 italic">{t('no_hints')}</div>
    }
    return (
        <div className="flex flex-col h-full">
            <h2 className="text-lg text-white mb-4 shrink-0">{t('hints_title')}</h2>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {hints.map((hint, index) => {
                    const isRevealed = index < revealedCount;
                    return (
                        <div key={index} className={`p-4 rounded-md border transition-all duration-300 ${isRevealed ? 'bg-[#1e1e1e]' : 'bg-[#121212]'}`}>
                            <div className="flex justify-center items-center mb-2">
                                <span className={`text-xs font-bold uppercase tracking-wider ${isRevealed ? 'text-blue-400' : 'text-gray-600'}`}>
                                    {t("level")} {hint.level}
                                </span>
                            </div>
                            {isRevealed ? (
                                <p className="text-sm text-gray-300 leading-relaxed">{hint.content[lang]}</p>
                            ) : (
                                <div className="flex items-center justify-center py-2">
                                    <span className="text-gray-600 text-sm italic">
                                        {t('hint_locked')}
                                    </span>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="mt-6 shrink-0">
                <button
                    onClick={handleReveal}
                    disabled={revealedCount === hints.length}
                    className={`w-full py-2 rounded-md font-medium transition-colors text-sm ${
                        revealedCount === hints.length
                            ? 'bg-[#121212] text-gray-600 cursor-not-allowed border border-gray-800'
                            : 'bg-[#2d2d2d] hover:bg-[#3d3d3d] text-blue-400 border border-gray-700'
                    }`}
                >
                    {revealedCount === hints.length
                        ? t('all_revealed')
                        : `${t('reveal_hint')} ${revealedCount + 1} / ${hints.length}`}
                </button>
            </div>
        </div>
    )

}