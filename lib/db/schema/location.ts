import { pgTable, real, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./auth";

export const location = pgTable("location", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  userId: text("user_id").notNull().references(() => user.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date()),
});

export const InsertLocationSchema = createInsertSchema(location, {
  name: () =>
    z
      .string({ error: "Name is required" })
      .min(1, { message: "Name cannot be empty" })
      .max(100, { message: "Max 100 characters" }),

  description: () =>
    z.string().max(1000, { message: "Max 1000 characters" }).optional(),

  lat: () =>
    z.coerce
      .number({ error: "Latitude is required" })
      .min(-90, { message: "Min -90" })
      .max(90, { message: "Max 90" }),

  lng: () =>
    z.coerce
      .number({ error: "Longitude is required" })
      .min(-180, { message: "Min -180" })
      .max(180, { message: "Max 180" }),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
