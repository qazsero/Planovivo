import { Link } from "react-router";
import { Hero } from "~/components/Hero";
import type { Route } from "./+types/_index";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Planovivo - Renders 3D de Planos al Instante" },
        { name: "description", content: "Convierte planos 2D en renders 3D profesionales. Para arquitectos, interioristas y profesionales inmobiliarios en España." },
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tres pasos, resultados inmediatos</h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            No necesitas conocimientos técnicos. Sube tu plano y obtén un render 3D profesional en segundos.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Sube tu plano",
                                desc: "Planos técnicos, bocetos a mano, o esquemas básicos. Todos funcionan.",
                            },
                            {
                                step: "02",
                                title: "Personaliza el estilo",
                                desc: "Elige entre estilos modernos, clásicos, o minimalistas según tu proyecto.",
                            },
                            {
                                step: "03",
                                title: "Descarga tu render",
                                desc: "Visualizaciones 3D listas para presentar a tus clientes o portfolio.",
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
            <section id="ejemplos" className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">De plano a presentación en segundos</h2>
                        <p className="text-gray-600">
                            Usa los renders para catálogos inmobiliarios, presentaciones a clientes, o portafolio digital.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-800">
                                <div className="aspect-3/2 bg-gray-800 rounded-lg overflow-hidden mb-4">
                                    <img
                                        src="/images/floorplan1.png"
                                        alt="Plano 2D original"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="text-center text-gray-400 text-sm">Plano 2D Original</p>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-800/50">
                                <div className="aspect-3/2 bg-gray-700 rounded-lg overflow-hidden mb-4">
                                    <img
                                        src="/images/floorplan1_render.png"
                                        alt="Render 3D generado"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="text-center text-gray-400 text-sm">Render 3D Generado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consulting CTA */}
            <section className="py-24 bg-accent-50 border-t border-accent-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        ¿Necesitas más que renders de planos?
                    </h2>
                    <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                        Desarrollamos soluciones de IA personalizadas: generación de imágenes, automatización de procesos, y herramientas adaptadas a tu negocio.
                    </p>
                    <Link
                        to="/consulting"
                        className="inline-block px-8 py-4 bg-accent-600 text-white font-semibold rounded-lg hover:bg-accent-700 transition-colors shadow-md"
                    >
                        Explorar servicios de IA
                    </Link>
                </div>
            </section>
        </div>
    );
}
