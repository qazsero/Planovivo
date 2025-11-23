import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    marketingConsent: boolean("marketing_consent").default(false).notNull(),
});

export const magicLinks = pgTable("magic_links", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(), // Hashed token
    expiresAt: timestamp("expires_at").notNull(),
    attempts: integer("attempts").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const generations = pgTable("generations", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id),
    imageUrl: text("image_url").notNull(),
    promptUsed: text("prompt_used"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
