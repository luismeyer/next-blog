"use server";

import { ListBlobResult, ListBlobResultBlob } from "@vercel/blob";

interface ListBlobApiResponseBlob
  extends Omit<ListBlobResultBlob, "uploadedAt"> {
  uploadedAt: string;
}

interface ListBlobApiResponse extends Omit<ListBlobResult, "blobs"> {
  blobs: ListBlobApiResponseBlob[];
  folders?: string[];
}

// replacement of @vercel/blob list method to set the next cache tag
export async function list(prefix?: string): Promise<ListBlobResult> {
  const response = await fetch(
    `https://blob.vercel-storage.com${prefix ? `?prefix=${prefix}` : ""}`,
    {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      next: { tags: ["posts"] },
    }
  );

  const data = (await response.json()) as ListBlobApiResponse;

  return {
    ...data,
    blobs: data.blobs.map((blob) => ({
      ...blob,
      uploadedAt: new Date(blob.uploadedAt),
    })),
  };
}
