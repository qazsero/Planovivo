import { Link } from "react-router";

export function Hero() {
    return (
        <section className="relative pt-32 pb-40 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 border border-accent-100 text-accent-700 text-sm font-medium mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                        </span>
                        Now available for early access
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight animate-fade-in [animation-delay:100ms]">
                        Turn 2D floor plans into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-indigo-600">
                            photorealistic 3D visuals
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms]">
                        Instantly visualize your architectural sketches with AI. Built for architects, interior designers, and real estate professionals.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:300ms]">
                        <Link
                            to="/app"
                            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                        >
                            Try the demo
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                        <Link
                            to="/consulting"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors hover:border-gray-300"
                        >
                            Talk about AI for your studio
                        </Link>
                    </div>

                    <p className="mt-8 text-sm text-gray-500 animate-fade-in [animation-delay:400ms]">
                        No credit card required. Free for initial testing.
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

