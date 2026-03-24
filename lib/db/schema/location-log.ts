import { integer, pgTable, real, serial, text, timestamp } from "drizzle-orm/pg-core";
import { location } from "./location";

export const locationLog = pgTable("locationLog", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  startedAt: integer("started_at").notNull(),
  endedAt: integer("ended_at").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  locationId: integer("location_id").notNull().references(() => location.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date()),
});
