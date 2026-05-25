import type { DrizzleError } from "drizzle-orm";
import slugify from "slug";
import db from "~~/lib/db";
import { findLocationByName } from "~~/lib/db/queries/location";
import { InsertLocationSchema, location } from "~~/lib/db/schema";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertLocationSchema.safeParse);
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }
  if (!result.success) {
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join("")}: ${issue.message}`)
      .join(";");

    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join("")] = issue.message;
        return errors;
      }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }
  const existingLocation = await findLocationByName(result.data, event.context.user.id);
  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with this name already exists in your account",
    }));
  }
  const slug = slugify(result.data.name);
  try {
    const [created] = await db.insert(location).values({
      ...result.data,
      slug,
      userId: event.context.user.id,
    }).returning();
    return created;
  }
  catch (e) {
    const error = e as DrizzleError;
    if (error.message.includes("Failed query: insert into")) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "A location with this name already exists",
      }));
    }
    throw error;
  }
});
