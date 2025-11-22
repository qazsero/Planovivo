import { LeadForm } from "~/components/LeadForm";
import type { Route } from "./+types/consulting";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Servicios de IA - Planovivo" }];
};

export default function Consulting() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center mb-16">
                <p className="text-sm text-accent-600 font-medium mb-3">
                    Somos <a href="https://enjinia.es" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent-700">Enjinia Tech</a>
                </p>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Soluciones de IA Personalizadas
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    ¿Necesitas automatización o generación de contenido con IA? Desarrollamos herramientas personalizadas para tu negocio.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Generación de Imágenes con IA</h3>
                        <p className="text-gray-600">
                            Modelos personalizados para renders arquitectónicos, visualizaciones de producto, o contenido marketing adaptado a tu marca.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Automatización de Procesos</h3>
                        <p className="text-gray-600">
                            Automatiza tareas repetitivas: procesamiento de documentos, extracción de datos, o flujos de trabajo internos.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Procesamiento por Lotes</h3>
                        <p className="text-gray-600">
                            Convierte cientos de planos o imágenes automáticamente con estilos personalizados según tu proyecto.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cuéntanos tu proyecto</h3>
                    <LeadForm />
                </div>
            </div>
        </div>
    );
}
