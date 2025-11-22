import { useActionData } from "react-router";
import { LeadForm } from "~/components/LeadForm";
import type { Route } from "./+types/consulting";
import { saveLead } from "~/server/leads";

export const meta: Route.MetaFunction = () => {
    return [{ title: "AI Consulting - FloorPlan Render AI" }];
};

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "consulting-inquiry") {
        const name = formData.get("name") as string;
        const company = formData.get("company") as string;
        const email = formData.get("email") as string;
        const role = formData.get("role") as string;
        const message = formData.get("message") as string;

        const result = await saveLead({
            name,
            company,
            email,
            role,
            message,
            source: "consulting-page",
        });

        return result;
    }

    // Handle download gate lead capture (reused endpoint or separate?)
    // The download gate posts to /consulting as well in the component
    if (intent === "capture-lead") {
        const email = formData.get("email") as string;
        const interestedInAi = formData.get("interested_in_ai") === "on";
        const source = formData.get("source") as string;

        const result = await saveLead({
            email,
            interestedInAi,
            source: source || "download-gate",
        });

        return result;
    }

    return { success: false, error: "Invalid intent" };
}

export default function Consulting() {
    const actionData = useActionData<typeof action>();

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Custom AI Solutions for Architecture & Real Estate
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    The floor plan tool is just a demo. We help forward-thinking firms build and deploy custom AI workflows.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Document Automation</h3>
                        <p className="text-gray-600">
                            Automatically process permits, contracts, and specs. Extract data and generate reports in seconds.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Generative Design Tools</h3>
                        <p className="text-gray-600">
                            Custom models trained on your firm's portfolio to generate concepts, renderings, and variations.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Intelligent Assistants</h3>
                        <p className="text-gray-600">
                            Chatbots that know your project history, building codes, and internal standards.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    {actionData?.success ? (
                        <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                            <p className="text-gray-600">
                                Thanks for reaching out. We'll review your inquiry and get back to you shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get in touch</h3>
                            <LeadForm />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
