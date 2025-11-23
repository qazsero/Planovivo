import { db } from "~/db/index.server";
import { magicLinks, users } from "~/db/schema";
import { eq, desc } from "drizzle-orm";
import crypto from "crypto";
import { sendMagicLink, addToMarketingList } from "./email.server";

// Generate a 6-digit code
function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create an auth code for an email
export async function createAuthCode(email: string) {
    const token = generateCode();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes

    // Store token in DB (reusing magicLinks table)
    await db.insert(magicLinks).values({
        email,
        token,
        expiresAt,
    });

    // Send email
    await sendMagicLink(email, token); // We'll update sendMagicLink to handle code

    return { success: true };
}

// Verify an auth code
export async function verifyAuthCode(email: string, code: string) {
    // 1. Find the latest active code for this email
    const [link] = await db
        .select()
        .from(magicLinks)
        .where(eq(magicLinks.email, email))
        .orderBy(desc(magicLinks.createdAt)) // Get the most recent one
        .limit(1);

    if (!link) {
        return { error: "Código no encontrado o expirado" };
    }

    if (new Date() > link.expiresAt) {
        return { error: "El código ha expirado" };
    }

    // 2. Check attempts
    if (link.attempts >= 3) {
        // Delete the code if max attempts reached
        await db.delete(magicLinks).where(eq(magicLinks.id, link.id));
        return { error: "Demasiados intentos fallidos. Por favor solicita un nuevo código." };
    }

    // 3. Verify code match
    if (link.token !== code) {
        // Increment attempts
        await db
            .update(magicLinks)
            .set({ attempts: link.attempts + 1 })
            .where(eq(magicLinks.id, link.id));

        return { error: "Código incorrecto" };
    }

    // 4. Success - Delete used token
    await db.delete(magicLinks).where(eq(magicLinks.id, link.id));

    // Find or create user
    let [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, link.email))
        .limit(1);

    if (!user) {
        [user] = await db
            .insert(users)
            .values({
                email: link.email,
                marketingConsent: true,
            })
            .returning();

        addToMarketingList(link.email).catch(console.error);
    }

    return { user };
}
