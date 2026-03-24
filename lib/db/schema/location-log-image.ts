import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { locationLog } from "./location-log";

export const locationLogImage = pgTable("locationLogImage", {
  id: serial("id").primaryKey(),
  key: text("name").notNull(),
  locationLogId: integer("location_id").notNull().references(() => locationLog.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date()),
});
