import { db } from "~/db/index.server";
import { magicLinks, users } from "~/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { sendMagicLink, addToMarketingList } from "./email.server";

// Generate a random token
function generateToken() {
    return crypto.randomBytes(32).toString("hex");
}

// Create a magic link for an email
export async function createMagicLink(email: string, domainUrl: string) {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

    // Store token in DB
    await db.insert(magicLinks).values({
        email,
        token, // In a real app, you might want to hash this
        expiresAt,
    });

    const magicLinkUrl = `${domainUrl}/auth/verify?token=${token}`;

    // Send email
    await sendMagicLink(email, magicLinkUrl);

    return { success: true };
}

// Verify a magic link token
export async function verifyMagicLink(token: string) {
    const [link] = await db
        .select()
        .from(magicLinks)
        .where(eq(magicLinks.token, token))
        .limit(1);

    if (!link) {
        return { error: "Invalid token" };
    }

    if (new Date() > link.expiresAt) {
        return { error: "Token expired" };
    }

    // Delete used token
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
                marketingConsent: true, // Implicit consent by using the service? Or default to true for now as per user request
            })
            .returning();

        // Add to Brevo Marketing List (ID 4)
        // We do this in the background, don't await to not block login
        addToMarketingList(link.email).catch(console.error);
    }

    return { user };
}
