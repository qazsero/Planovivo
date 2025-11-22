import { Link } from "react-router";

export function Hero() {
    return (
        <section className="relative pt-32 pb-40 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight animate-fade-in [animation-delay:100ms]">
                        Convierte tus planos en <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-indigo-600">
                            renders 3D profesionales
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms]">
                        Transforma bocetos y planos 2D en visualizaciones 3D realistas al instante. Perfecta para estudios de arquitectura, interioristas y profesionales inmobiliarios.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:300ms]">
                        <Link
                            to="/app"
                            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                        >
                            Probar ahora gratis
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <a
                            href="#ejemplos"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors hover:border-gray-300"
                        >
                            Ver ejemplos
                        </a>
                    </div>

                    <p className="mt-8 text-sm text-gray-500 animate-fade-in [animation-delay:400ms]">
                        Resultados profesionales en segundos
                    </p>
                </div>
            </div>

            {/* Abstract background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-accent-100/50 to-purple-100/50 blur-3xl"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-blue-100/50 to-gray-100/50 blur-3xl"></div>
                <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] rounded-full bg-accent-50/80 blur-2xl"></div>
            </div>
        </section>
    );
}

