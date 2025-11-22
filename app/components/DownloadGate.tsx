import { useState } from "react";
import { Form, useFetcher } from "react-router";

interface DownloadGateProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function DownloadGate({ isOpen, onClose, onSuccess }: DownloadGateProps) {
    const fetcher = useFetcher();
    const [email, setEmail] = useState("");

    if (!isOpen) return null;

    const isSubmitting = fetcher.state === "submitting";

    // If we got a success response from the server
    if (fetcher.data?.success) {
        // Call onSuccess immediately or after a short delay
        // For now, let's just call it immediately
        onSuccess();
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Descarga tu Render</h3>
                    <p className="text-gray-600 text-sm">
                        Introduce tu email para descargar la imagen en alta resolución.
                    </p>
                </div>

                <fetcher.Form method="post" action="/consulting" className="space-y-4">
                    {/* Hidden field to indicate source */}
                    <input type="hidden" name="source" value="download-gate" />
                    <input type="hidden" name="intent" value="capture-lead" />

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all"
                            placeholder="you@company.com"
                        />
                    </div>

                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            name="interested_in_ai"
                            id="interested_in_ai"
                            className="mt-1 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                        />
                        <label htmlFor="interested_in_ai" className="text-sm text-gray-600">
                            Quiero recibir información sobre soluciones de IA.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Procesando..." : "Descargar Imagen"}
                    </button>
                </fetcher.Form>
            </div>
        </div>
    );
}
