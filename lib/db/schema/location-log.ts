import { integer, pgTable, real, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { location } from "./location";

export const locationLog = pgTable("locationLog", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  startedAt: integer("started_at").notNull(),
  endedAt: integer("ended_at").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  locationId: text("location_id").notNull().references(() => location.id),
  userId: text("user_id").notNull().references(() => user.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date()),
});
