// app/server/leads.ts
import fs from "fs/promises";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "leads.json");

interface Lead {
    id: string;
    email: string;
    name?: string;
    company?: string;
    role?: string;
    message?: string;
    source?: string;
    interestedInAi?: boolean;
    createdAt: string;
}

export async function saveLead(leadData: Omit<Lead, "id" | "createdAt">) {
    try {
        let leads: Lead[] = [];

        try {
            const data = await fs.readFile(LEADS_FILE, "utf-8");
            leads = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is invalid, start fresh
        }

        const newLead: Lead = {
            ...leadData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };

        leads.push(newLead);

        await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));

        return { success: true, lead: newLead };
    } catch (error) {
        console.error("Failed to save lead:", error);
        return { success: false, error: "Failed to save lead" };
    }
}
