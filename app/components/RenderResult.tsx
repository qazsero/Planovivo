interface RenderResultProps {
    imageUrl: string;
    originalImage?: string;
    onDownload: () => void;
    onReset?: () => void;
}

export function RenderResult({ imageUrl, originalImage, onDownload, onReset }: RenderResultProps) {
    return (
        <div className="w-full h-full flex flex-col">
            {originalImage ? (
                // Comparison Mode (Legacy)
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Plano Original</h3>
                        <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 aspect-[4/3] relative group">
                            <img
                                src={originalImage}
                                alt="Original floor plan"
                                className="w-full h-full object-contain p-4"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Render 3D</h3>
                        <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 aspect-[4/3] relative group">
                            <img
                                src={imageUrl}
                                alt="Rendered 3D floor plan"
                                className="w-full h-full object-contain p-4"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // Single Result Mode
                <div className="flex-1 relative group">
                    <img
                        src={imageUrl}
                        alt="Rendered 3D floor plan"
                        className="w-full h-full object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                </div>
            )}

            <div className="mt-4 flex gap-4 justify-center">
                <button
                    onClick={onDownload}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar Render
                </button>
                {onReset && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Generar Otro
                    </button>
                )}
            </div>
        </div>
    );
}
