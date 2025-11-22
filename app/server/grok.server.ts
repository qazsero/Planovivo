import OpenAI from "openai";
import { FLOORPLAN_VALIDATION_PROMPT } from "./prompts/grok";

// Initialize OpenAI client pointing to xAI's Grok API
const getGrokClient = () => {
    const apiKey = process.env.XAI_API_KEY;

    if (!apiKey) {
        throw new Error("XAI_API_KEY environment variable is not set");
    }

    return new OpenAI({
        apiKey,
        baseURL: "https://api.x.ai/v1",
    });
};

export interface FloorplanAnalysisValid {
    isValid: true;
    confidence: number;
}

export interface FloorplanAnalysisInvalid {
    isValid: false;
    reason: string;
}

export type FloorplanAnalysis = FloorplanAnalysisValid | FloorplanAnalysisInvalid;

/**
 * Analyze an image to determine if it's a valid floorplan and extract architectural details
 */
export async function analyzeFloorplan(
    imageBuffer: Buffer,
    mimeType: string
): Promise<FloorplanAnalysis> {
    const client = getGrokClient();

    // Convert buffer to base64
    const base64Image = imageBuffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    try {
        const response = await client.chat.completions.create({
            model: "grok-4-1-fast-non-reasoning",
            messages: [
                {
                    role: "system",
                    content: FLOORPLAN_VALIDATION_PROMPT,
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Analyze this image and determine if it's a valid architectural floorplan. Return your analysis as JSON.",
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: dataUrl,
                            },
                        },
                    ],
                },
            ],
            temperature: 0.1, // Low temperature for consistent validation
            max_tokens: 1000,
        });

        const content = response.choices[0]?.message?.content;

        if (!content) {
            throw new Error("No response from Grok");
        }

        // Parse JSON response
        // Remove markdown code blocks if present
        const cleanContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const analysis = JSON.parse(cleanContent) as FloorplanAnalysis;

        return analysis;
    } catch (error) {
        console.error("Grok analysis error:", error);

        // If Grok fails, we'll assume it's valid to not block the user
        // but log the error for investigation
        return {
            isValid: true,
            confidence: 0.5,
        };
    }
}
