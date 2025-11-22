import { useState } from "react";

export function LeadForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xgvqykva", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-600">
                    Gracias por contactarnos. Revisaremos tu consulta y te responderemos pronto.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-accent-600 hover:text-accent-700 font-medium"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa
                    </label>
                    <input
                        type="text"
                        name="company"
                        id="company"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
                />
            </div>

            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Rol
                </label>
                <select
                    name="role"
                    id="role"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none bg-white"
                >
                    <option value="">Selecciona un rol...</option>
                    <option value="architect">Arquitecto/a</option>
                    <option value="interior_designer">Diseñador/a de Interiores</option>
                    <option value="real_estate">Agente/Promotor Inmobiliario</option>
                    <option value="other">Otro</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    ¿Qué te gustaría automatizar o mejorar con IA?
                </label>
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none resize-none"
                ></textarea>
            </div>

            {status === "error" && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                    Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
                </div>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md disabled:opacity-70"
            >
                {status === "submitting" ? "Enviando..." : "Enviar Mensaje"}
            </button>
        </form>
    );
}
