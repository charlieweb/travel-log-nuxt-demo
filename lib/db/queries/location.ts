import type { InsertLocationSchema } from "../schema/location";
import { and, eq } from "drizzle-orm";
import db from "..";
import { location } from "../schema/location";

export async function findLocationByName(existing: InsertLocationSchema, userId: string) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),
    ),
  });
}
