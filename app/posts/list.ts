"use server";

import { ListBlobResult } from "@vercel/blob";

// replacement of @vercel/blob list method to set the next cache tag
export async function list(prefix?: string) {
  const response = await fetch(
    `https://blob.vercel-storage.com${prefix ? `?prefix=${prefix}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
      next: {
        tags: ["posts"],
      },
    }
  );

  const data = (await response.json()) as ListBlobResult;

  return data;
}
