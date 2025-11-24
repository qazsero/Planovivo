# Planovivo 🏠✨

**Transform architectural floorplans into stunning 3D isometric renders using AI.**

Planovivo is a modern web application that leverages advanced AI models to interpret 2D architectural floorplans and generate beautiful, high-fidelity 3D miniature maquettes in seconds.

![Planovivo Demo](https://via.placeholder.com/800x400?text=Planovivo+Demo+Image)

## 🚀 Features

- **🤖 Dual-AI Pipeline:**
  - **Validation:** Uses **Grok-2-vision** (xAI) to intelligently verify if an uploaded image is a valid architectural floorplan.
  - **Rendering:** Uses **Google Gemini 2.0 Flash** (Vertex AI) to interpret the layout and generate the final 3D render with accurate doors, windows, and furniture.
- **🔐 Secure Authentication:**
  - Passwordless login via **6-digit OTP** (Magic Code).
  - Rate limiting (max 3 attempts) and automatic expiration (10 min TTL) for enhanced security.
  - Persistent sessions (30 days) via secure HTTP-only cookies.
- **📊 Analytics & Growth:**
  - Full user journey tracking with **PostHog**.
  - Automated lead capture and marketing list integration with **Brevo**.
- **⚡ Modern Tech Stack:**
  - Built with **React Router v7** for blazing fast SSR and seamless routing.
  - Fully typed with **TypeScript**.
  - Styled with **TailwindCSS**.
  - Data managed with **PostgreSQL** and **Drizzle ORM**.

## 🛠️ Tech Stack

- **Frontend:** React Router v7, React 19, TailwindCSS
- **Backend:** Node.js, React Router Server Actions
- **Database:** PostgreSQL, Drizzle ORM
- **AI Services:**
  - xAI API (Grok-2-vision-1212)
  - Google Vertex AI (Gemini 2.0 Flash)
- **Infrastructure:** Docker, Brevo (Email), PostHog (Analytics)

## 🏁 Getting Started

### Prerequisites

- Node.js (v20+)
- PostgreSQL database
- API Keys for:
  - xAI (Grok)
  - Google Cloud (Vertex AI)
  - Brevo
  - PostHog

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/qazsero/planovivo.git
   cd planovivo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example file and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   *Make sure to set `DATABASE_URL`, `XAI_API_KEY`, `GOOGLE_VERTEX_PROJECT`, etc.*

4. **Setup Database:**
   Push the schema to your PostgreSQL instance:
   ```bash
   npx drizzle-kit push
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Enjinia Tech](https://enjinia.com)
