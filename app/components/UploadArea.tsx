import { useState } from "react";

interface UploadAreaProps {
    onFileSelect: (file: File) => void;
    isProcessing: boolean;
}

export function UploadArea({ onFileSelect, isProcessing }: UploadAreaProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!isProcessing) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (isProcessing) return;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            validateAndSelect(files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            validateAndSelect(e.target.files[0]);
        }
    };

    const validateAndSelect = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file (PNG or JPG).");
            return;
        }
        // 10MB limit
        if (file.size > 10 * 1024 * 1024) {
            alert("File size must be under 10MB.");
            return;
        }
        onFileSelect(file);
    };

    return (
        <label
            className={`
        relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer block
        ${isDragging ? "border-accent-500 bg-accent-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}
        ${isProcessing ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
      `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                disabled={isProcessing}
            />

            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                    </svg>
                </div>
                <div>
                    <p className="text-lg font-medium text-gray-900">
                        {isProcessing ? "Processing..." : "Upload floor plan"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Drag & drop or click to select. PNG or JPG up to 10MB.
                    </p>
                </div>
            </div>
        </label>
    );
}
