import { useState, useEffect } from "react";
import { Form, useActionData, useNavigation, useSubmit } from "react-router";
import { UploadArea } from "~/components/UploadArea";
import { RenderResult } from "~/components/RenderResult";
import { DownloadGate } from "~/components/DownloadGate";
import { generateRenderFromFloorplan } from "~/server/vertex";
import type { Route } from "./+types/app";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Demo - FloorPlan Render AI" }];
};

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const prompt = formData.get("prompt") as string;

    if (!file || file.size === 0) {
        return { error: "No file uploaded" };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const renderUrl = await generateRenderFromFloorplan({
            imageBuffer: buffer,
            mimeType: file.type,
            prompt,
        });

        return { success: true, renderUrl };
    } catch (error) {
        console.error("Render error:", error);
        return { error: "Failed to generate render. Please try again." };
    }
}

export default function App() {
    const actionData = useActionData<typeof action>();
    const navigation = useNavigation();
    const submit = useSubmit();

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [stylePrompt, setStylePrompt] = useState("");
    const [isDownloadGateOpen, setIsDownloadGateOpen] = useState(false);

    const isSubmitting = navigation.state === "submitting";

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
    };

    const handleGenerate = () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("prompt", stylePrompt);
        submit(formData, { method: "post", encType: "multipart/form-data" });
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setStylePrompt("");
    };

    const handleDownloadClick = () => {
        setIsDownloadGateOpen(true);
    };

    const handleGateSuccess = () => {
        setIsDownloadGateOpen(false);
        if (actionData?.renderUrl) {
            const link = document.createElement("a");
            link.href = actionData.renderUrl;
            link.download = "floorplan-render-ai.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Floor Plan to 3D Render
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Upload your 2D floor plan and let our AI generate a visualization.
                    <br />
                    <span className="text-sm text-gray-500">
                        Experimental demo. Results may vary.
                    </span>
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                {!file ? (
                    <UploadArea onFileSelect={handleFileSelect} isProcessing={isSubmitting} />
                ) : !actionData?.renderUrl ? (
                    <div className="max-w-xl mx-auto">
                        <div className="mb-8">
                            <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
                                <img
                                    src={previewUrl!}
                                    alt="Preview"
                                    className="w-full h-full object-contain p-4"
                                />
                                <button
                                    onClick={handleReset}
                                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white text-gray-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                                    Style Preference (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="style"
                                    value={stylePrompt}
                                    onChange={(e) => setStylePrompt(e.target.value)}
                                    placeholder="e.g. Minimalist, Scandinavian, Industrial..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                                />
                            </div>

                            {actionData?.error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                                    {actionData.error}
                                </div>
                            )}

                            <button
                                onClick={handleGenerate}
                                disabled={isSubmitting}
                                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md disabled:opacity-70"
                            >
                                {isSubmitting ? "Generating..." : "Generate Visualization"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <RenderResult
                        originalImage={previewUrl!}
                        renderedImage={actionData.renderUrl}
                        onDownload={handleDownloadClick}
                        onReset={handleReset}
                    />
                )}
            </div>

            <DownloadGate
                isOpen={isDownloadGateOpen}
                onClose={() => setIsDownloadGateOpen(false)}
                onSuccess={handleGateSuccess}
            />
        </div>
    );
}

