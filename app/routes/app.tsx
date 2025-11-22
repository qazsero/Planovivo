import { useState, useEffect } from "react";
import { Form, useActionData, useNavigation, useSubmit, useLoaderData, useFetcher, useRevalidator } from "react-router";
import { UploadArea } from "~/components/UploadArea";
import { RenderResult } from "~/components/RenderResult";
import { generateRenderFromFloorplan } from "~/server/vertex.server";
import { analyzeFloorplan } from "~/server/grok.server";
import { getUserId } from "~/server/session.server";
import type { Route } from "./+types/app";
import posthog from "posthog-js";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Genera tu Render 3D - Planovivo" }];
};

export async function loader({ request }: Route.LoaderArgs) {
    const userId = await getUserId(request);
    return { isLoggedIn: !!userId };
}

export async function action({ request }: Route.ActionArgs) {
    const userId = await getUserId(request);
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const prompt = formData.get("prompt") as string;
    const submissionId = formData.get("submissionId") as string;

    if (!file || file.size === 0) {
        return { error: "No se ha subido ningún archivo", submissionId };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Step 1: Validate with Grok
        console.log("Validating floorplan with Grok...");
        const analysis = await analyzeFloorplan(buffer, file.type);

        if (!analysis.isValid) {
            return {
                error: "La imagen no parece ser un plano arquitectónico. Por favor, sube un plano técnico, boceto o diagrama de distribución.",
                validationError: true,
                submissionId,
            };
        }

        console.log("Floorplan validated. Confidence:", analysis.confidence);

        // Step 2: Auth Wall
        // If not logged in, return requiresAuth to show modal
        if (!userId) {
            return { requiresAuth: true, submissionId };
        }

        // Step 3: Generate render with Gemini
        const renderUrl = await generateRenderFromFloorplan({
            imageBuffer: buffer,
            mimeType: file.type,
            prompt,
        });

        return { success: true, renderUrl, submissionId };
    } catch (error) {
        console.error("Render error:", error);
        return { error: "Error al generar el render. Por favor, intenta de nuevo.", submissionId };
    }
}

export default function App() {
    const { isLoggedIn } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const submit = useSubmit();
    const loginFetcher = useFetcher();
    const revalidator = useRevalidator();

    useEffect(() => {
        posthog.capture("$pageview");
    }, []);

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [stylePrompt, setStylePrompt] = useState("");
    const [lastSubmissionId, setLastSubmissionId] = useState<string | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const isSubmitting = navigation.state === "submitting";
    const isLoggingIn = loginFetcher.state === "submitting";
    const magicLinkSent = loginFetcher.data?.success;

    useEffect(() => {
        if (actionData?.requiresAuth) {
            setShowAuthModal(true);
            posthog.capture("auth_wall_shown");
        }
    }, [actionData]);

    useEffect(() => {
        if (isLoggedIn && showAuthModal) {
            setShowAuthModal(false);
        }
    }, [isLoggedIn, showAuthModal]);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);

        posthog.capture("file_uploaded", {
            file_type: selectedFile.type,
            file_size: selectedFile.size
        });

        // Clear any previous errors when new file is selected
        if (actionData?.error) {
            // Force re-render by resetting state
            setPreviewUrl(null);
        }
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
    };

    const handleGenerate = () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("prompt", stylePrompt);

        // Generate unique ID for this submission
        const submissionId = crypto.randomUUID();
        formData.append("submissionId", submissionId);
        setLastSubmissionId(submissionId);

        submit(formData, { method: "post", encType: "multipart/form-data" });
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setStylePrompt("");
        setLastSubmissionId(null);
        setShowAuthModal(false); // Close auth modal on reset
    };

    useEffect(() => {
        if (actionData?.success && actionData.renderUrl) {
            posthog.capture("render_generated", {
                submission_id: actionData.submissionId
            });
        }
    }, [actionData]);

    const handleDownloadClick = () => {
        // If logged in, just download directly (or show gate if we want to double check)
        // For now, since we have auth wall, we can skip download gate or keep it for extra info?
        // User said: "Botón 'Descargar' -> descarga directa (sin modal)"
        // So we close the gate if it was open, or just don't open it.
        // But wait, the DownloadGate component handles the download logic?
        // Let's look at DownloadGate. It asks for email.
        // We should probably replace DownloadGate with a direct download button if logged in.
        // For now, let's just open the gate if we want to capture more info, OR just download.
        // Actually, let's just download.
        if (actionData?.renderUrl) {
            const link = document.createElement('a');
            link.href = actionData.renderUrl;
            link.download = 'render-planovivo.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            posthog.capture("render_downloaded");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                        Transforma tus Planos en <span className="text-indigo-600">Renders 3D</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Sube tu plano arquitectónico y obtén una visualización profesional en segundos con Inteligencia Artificial.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Upload & Controls */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Sube tu Plano</h2>
                            <UploadArea
                                onFileSelect={handleFileSelect}
                                selectedFile={file}
                                previewUrl={previewUrl}
                            />
                            {actionData?.error && actionData.submissionId === lastSubmissionId && (
                                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                                    {actionData.error}
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Personaliza el Estilo</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                                        Preferencia de Estilo (Opcional)
                                    </label>
                                    <input
                                        type="text"
                                        id="style"
                                        placeholder="Ej: Estilo nórdico, iluminación natural, minimalista..."
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                                        value={stylePrompt}
                                        onChange={(e) => setStylePrompt(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handleGenerate}
                                    disabled={!file || isSubmitting}
                                    className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg shadow-lg transition-all duration-200 ${!file || isSubmitting
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transform hover:-translate-y-0.5"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generando...
                                        </span>
                                    ) : (
                                        "Generar Visualización"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Result */}
                    <div className="lg:sticky lg:top-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[600px] flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Resultado</h2>
                            <div className="flex-1 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                                {actionData?.success && actionData.renderUrl ? (
                                    <RenderResult
                                        imageUrl={actionData.renderUrl}
                                        onDownload={handleDownloadClick}
                                    />
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500">
                                            Tu render aparecerá aquí
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative">
                        <button
                            onClick={() => setShowAuthModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Accede para continuar</h3>
                            <p className="text-gray-600 mt-2">
                                Tu plano es válido y está listo para procesar. Ingresa tu email para generar tu render 3D profesional.
                            </p>
                        </div>

                        {magicLinkSent ? (
                            <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center">
                                <p className="font-medium">¡Enlace enviado!</p>
                                <p className="text-sm mt-1">Revisa tu bandeja de entrada y haz clic en el enlace para acceder.</p>
                                <button
                                    onClick={() => revalidator.revalidate()}
                                    className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium underline"
                                >
                                    Ya he verificado mi email
                                </button>
                            </div>
                        ) : (
                            <loginFetcher.Form
                                action="/auth/login"
                                method="post"
                                className="space-y-4"
                                onSubmit={() => {
                                    posthog.capture("magic_link_requested");
                                }}
                            >
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email profesional
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        placeholder="tu@email.com"
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                >
                                    {isLoggingIn ? "Enviando..." : "Continuar"}
                                </button>
                                <p className="text-xs text-center text-gray-500 mt-4">
                                    Al continuar, aceptas recibir actualizaciones sobre Planovivo.
                                </p>
                            </loginFetcher.Form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
