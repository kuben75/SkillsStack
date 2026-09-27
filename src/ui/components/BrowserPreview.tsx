import {useTranslation} from "react-i18next";

interface BrowserPreviewProps {
    htmlContent: string;
}

export const BrowserPreview = ({htmlContent}: BrowserPreviewProps) => {
    const {t} = useTranslation();

    const blob = new Blob([htmlContent], {type: 'text/html'});
    const blobUrl = URL.createObjectURL(blob);

    if (!htmlContent) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#1e1e1e] text-gray-500 italic">
                {t('preview_empty')}
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white flex flex-col relative">
            <div className="h-8 bg-[#2d2d2d] flex items-center px-4 border-b border-gray-800 shrink-0">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto bg-[#1e1e1e] text-gray-400 text-xs px-16 py-1 rounded-md font-mono">
                    localhost:3000
                </div>
            </div>
            <iframe
                src={blobUrl}
                title="Live Preview"
                className="w-full h-full border-none"
                sandbox="allow-scripts"
            />
        </div>
    );
};