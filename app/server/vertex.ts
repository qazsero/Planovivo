// app/server/vertex.ts
// Note: This requires @google-cloud/vertexai and Google Cloud authentication
// For this demo, we will mock the actual API call if credentials are not present,
// or implement the real call if they are.

// You would typically install: npm install @google-cloud/vertexai

import { GoogleGenAI } from "@google/genai";
import { FLOOR_PLAN_PROMPT } from "./prompts";
import fs from "fs";
import path from "path";
import os from "os";

interface GenerateRenderOptions {
    imageBuffer: Buffer;
    mimeType: string;
    prompt?: string;
}

// Initialize Google Gen AI client for Vertex AI
let genAIClient: GoogleGenAI | null = null;

function getGenAIClient() {
    if (genAIClient) return genAIClient;

    const vertexProject = process.env.GOOGLE_VERTEX_PROJECT;
    const vertexLocation = process.env.GOOGLE_VERTEX_LOCATION ?? 'global';
    const vertexCredentialsBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!vertexProject) {
        console.warn("Vertex AI project ID not found.");
        return null;
    }

    try {
        // If credentials are base64-encoded (for CI/CD secret storage)
        if (vertexCredentialsBase64 && !vertexCredentialsBase64.startsWith('/')) {
            // Decode base64 credentials and write to temp file
            const credentialsJson = Buffer.from(vertexCredentialsBase64, 'base64').toString('utf-8');

            const tempPath = path.join(os.tmpdir(), 'gcp-credentials.json');
            fs.writeFileSync(tempPath, credentialsJson);
            process.env.GOOGLE_APPLICATION_CREDENTIALS = tempPath;
        }

        genAIClient = new GoogleGenAI({
            vertexai: true,
            project: vertexProject,
            location: vertexLocation,
        });

        return genAIClient;
    } catch (error) {
        console.error("Failed to initialize Gen AI client:", error);
        return null;
    }
}

export async function generateRenderFromFloorplan({
    imageBuffer,
    mimeType,
    prompt,
}: GenerateRenderOptions): Promise<string> {
    console.log("Generating render with options:", { mimeType, prompt });

    const client = getGenAIClient();

    if (!client) {
        throw new Error("Gen AI client not initialized. Please check your GOOGLE_VERTEX_PROJECT environment variable.");
    }

    try {
        const textPrompt = `
      ${FLOOR_PLAN_PROMPT}
      Style: ${prompt || "Modern, clean, realistic lighting"}.
    `;

        const response = await client.models.generateContent({
            model: "gemini-3-pro-image-preview",
            contents: [
                { text: textPrompt },
                {
                    inlineData: {
                        data: imageBuffer.toString("base64"),
                        mimeType: mimeType,
                    },
                },
            ],
        });

        // Check for image in response parts
        if (response.candidates?.[0]?.content?.parts) {
            const parts = response.candidates[0].content.parts;

            for (const part of parts) {
                // Check for text response with URL
                if (part.text) {
                    const text = part.text;
                    if (text.startsWith("http") || text.startsWith("data:image")) {
                        return text;
                    }
                }

                // Check for inline image data
                if (part.inlineData?.data) {
                    const mimeType = part.inlineData.mimeType || "image/png";
                    return `data:${mimeType};base64,${part.inlineData.data}`;
                }
            }
        }

        // If we get here, the model didn't return an image
        const responseText = JSON.stringify(response, null, 2);
        throw new Error(`Gemini 3 Pro Image did not return an image. The model may have returned text instead. Response: ${responseText}`);

    } catch (error) {
        console.error("Vertex AI Generation Error:", error);
        if (error instanceof Error && error.message.includes("404")) {
            throw new Error(`Vertex AI Model not found. Please ensure you have access to 'gemini-3-pro-image-preview' in your Google Cloud Project. Original error: ${error.message}`);
        }
        throw error;
    }
}
