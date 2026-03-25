import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { locationLog } from "./location-log";

export const locationLogImage = pgTable("locationLogImage", {
  id: text("id").primaryKey(),
  key: text("name").notNull(),
  locationLogId: text("location_id").notNull().references(() => locationLog.id),
  userId: text("user_id").notNull().references(() => user.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date()),
});
