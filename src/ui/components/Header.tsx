import { useTranslation } from 'react-i18next';

interface HeaderProps {
    title: string;
    currentLang: string;
    onToggleLang: () => void;
}

export const Header = ({ title, currentLang, onToggleLang }: HeaderProps) => {
    const { t } = useTranslation();

    return (
        <header className="p-4 border-b border-gray-700 bg-[#252526] flex justify-between items-center h-16">
            <div>
                <h1 className="text-xl font-bold text-white tracking-wide">{t('app_title')}</h1>
                <p className="text-sm text-gray-400 mt-1">{title}</p>
            </div>
            <button
                onClick={onToggleLang}
                className="px-3 py-1 text-xs font-bold bg-[#1e1e1e] hover:bg-gray-700 text-gray-400 border border-gray-600 rounded transition-colors uppercase"
            >
                {currentLang}
            </button>
        </header>
    );
};