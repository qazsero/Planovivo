import { Link } from "react-router";
import { Hero } from "~/components/Hero";
import type { Route } from "./+types/_index";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Planovivo - 2D to 3D Visualization" },
        { name: "description", content: "Convert 2D floor plans to 3D visualizations using AI." },
    ];
};

export default function Index() {
    return (
        <div className="flex flex-col">
            <Hero />

            {/* How it works */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works</h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            We use Google Cloud Vertex AI to interpret your layout and generate a realistic visualization.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Upload floor plan",
                                desc: "Upload a PNG or JPG of your 2D floor plan. Sketches work too.",
                            },
                            {
                                step: "02",
                                title: "AI Processing",
                                desc: "Our model analyzes the geometry and infers room types and materials.",
                            },
                            {
                                step: "03",
                                title: "Download 3D Render",
                                desc: "Get a high-quality isometric view to use in your presentations.",
                            },
                        ].map((item) => (
                            <div key={item.step} className="relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <span className="text-6xl font-bold text-gray-100 absolute top-4 right-4 select-none">
                                    {item.step}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{item.title}</h3>
                                <p className="text-gray-600 relative z-10">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Example Showcase */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">See the results</h2>
                        <p className="text-gray-600">
                            From simple line drawings to furnished 3D concepts.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800">
                                <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 mb-4">
                                    {/* Placeholder for Plan Image */}
                                    <span className="text-sm">Floor Plan Image</span>
                                </div>
                                <p className="text-center text-gray-400 text-sm">Original 2D Plan</p>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-800/50">
                                <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 mb-4">
                                    {/* Placeholder for Render Image */}
                                    <span className="text-sm">AI Rendered Image</span>
                                </div>
                                <p className="text-center text-gray-400 text-sm">AI Generated 3D View</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consulting CTA */}
            <section className="py-24 bg-accent-50 border-t border-accent-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Need custom AI tools for your firm?
                    </h2>
                    <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                        This tool is just a demo. We build bespoke AI workflows for architecture and real estate companies—from document automation to custom image generation models.
                    </p>
                    <Link
                        to="/consulting"
                        className="inline-block px-8 py-4 bg-accent-600 text-white font-semibold rounded-lg hover:bg-accent-700 transition-colors shadow-md"
                    >
                        Book a free consultation
                    </Link>
                </div>
            </section>
        </div>
    );
}
