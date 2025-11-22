import posthog from "posthog-js";

export const initPostHog = () => {
    if (typeof window !== "undefined" && import.meta.env.VITE_POSTHOG_KEY) {
        posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
            api_host: import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com",
            person_profiles: "identified_only", // Don't create profiles for anonymous users to save costs
            capture_pageview: false, // We'll handle this manually in Remix
        });
    }
};
