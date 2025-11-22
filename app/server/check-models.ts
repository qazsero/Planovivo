import { VertexAI } from "@google-cloud/vertexai";

async function listModels() {
    const project = process.env.GOOGLE_VERTEX_PROJECT;
    const location = process.env.GOOGLE_VERTEX_LOCATION || 'us-central1';

    if (!project) {
        console.error("GOOGLE_VERTEX_PROJECT not set");
        process.exit(1);
    }

    console.log(`Checking models for project: ${project} in ${location}`);

    const vertexAI = new VertexAI({ project, location });
    const model = vertexAI.getGenerativeModel({ model: "gemini-3.0-pro" });

    // There isn't a direct "listModels" in the high-level VertexAI SDK easily accessible 
    // without using the ModelServiceClient from @google-cloud/aiplatform.
    // But we can try to guess/check specific ones.

    const candidates = [
        "gemini-3.0-pro",
        "gemini-3.0-pro-001",
        "gemini-3-pro-image-preview",
        "gemini-experimental",
        "gemini-1.5-pro-002",
        "gemini-1.5-flash-002"
    ];

    console.log("Testing model availability...");

    // We can't easily "check" without making a call, which costs money/quota or throws.
    // But we can try to instantiate and maybe run a dummy prompt.
}

// Since listing is hard with just @google-cloud/vertexai, 
// I will just try to use the specific ID found in search: gemini-3-pro-image-preview
console.log("Search results suggested: gemini-3-pro-image-preview");
