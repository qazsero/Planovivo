interface RenderResultProps {
    originalImage: string;
    renderedImage: string;
    onDownload: () => void;
    onReset: () => void;
}

export function RenderResult({ originalImage, renderedImage, onDownload, onReset }: RenderResultProps) {
    return (
        <div className="w-full animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Original */}
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

                {/* Render */}
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-accent-600 uppercase tracking-wider">Render 3D</h3>
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl aspect-[4/3] relative group">
                        <img
                            src={renderedImage}
                            alt="AI generated render"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    onClick={onDownload}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Descargar
                </button>
                <button
                    onClick={onReset}
                    className="w-full sm:w-auto px-6 py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Generar Otro
                </button>
            </div>
        </div>
    );
}
