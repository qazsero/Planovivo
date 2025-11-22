import type { Route } from "./+types/privacy";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Política de Privacidad - Planovivo" }];
};

export default function Privacy() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>

            <div className="prose prose-lg text-gray-600">
                <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

                <h2>1. Introducción</h2>
                <p>
                    Enjinia Tech SLU, operando bajo la marca Planovivo ("nosotros", "nuestro" o "nos") respeta tu privacidad y se compromete a proteger tus datos personales.
                    Esta política de privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestro sitio web
                    y te informa sobre tus derechos de privacidad y cómo te protege la ley.
                </p>

                <h2>2. Datos que Recopilamos</h2>
                <p>
                    Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre ti, que hemos agrupado de la siguiente manera:
                </p>
                <ul>
                    <li><strong>Datos de Identidad</strong> incluye nombre, apellidos, nombre de usuario o identificador similar.</li>
                    <li><strong>Datos de Contacto</strong> incluye dirección de correo electrónico y número de teléfono.</li>
                    <li><strong>Datos Técnicos</strong> incluye dirección de protocolo de Internet (IP), tipo y versión del navegador, configuración de zona horaria y ubicación, tipos y versiones de complementos del navegador, sistema operativo y plataforma, y otra tecnología en los dispositivos que usas para acceder a este sitio web.</li>
                    <li><strong>Datos de Uso</strong> incluye información sobre cómo usas nuestro sitio web, productos y servicios.</li>
                </ul>

                <h2>3. Cómo Usamos tus Datos</h2>
                <p>
                    Solo usaremos tus datos personales cuando la ley nos lo permita. Comúnmente, usaremos tus datos personales en las siguientes circunstancias:
                </p>
                <ul>
                    <li>Cuando necesitemos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado contigo.</li>
                    <li>Cuando sea necesario para nuestros intereses legítimos (o los de un tercero) y tus intereses y derechos fundamentales no anulen esos intereses.</li>
                    <li>Cuando necesitemos cumplir con una obligación legal o reglamentaria.</li>
                </ul>

                <h2>4. Seguridad de Datos</h2>
                <p>
                    Hemos implementado medidas de seguridad apropiadas para evitar que tus datos personales se pierdan accidentalmente, se usen o accedan de manera no autorizada, se alteren o se divulguen.
                </p>

                <section className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contacto</h2>
                    <p className="text-gray-600">
                        Si tienes alguna pregunta sobre esta Política de Privacidad, contáctanos en:
                        <br />
                        <a href="mailto:hello@enjinia.es" className="text-accent-600 hover:text-accent-700">hello@enjinia.es</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
