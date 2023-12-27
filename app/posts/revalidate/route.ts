import { kv } from "@vercel/kv";
import { revalidateTag, unstable_noStore } from "next/cache";
import { list } from "../list";

const DataVersionKey = "dataversion";

export async function GET() {
  unstable_noStore();

  const { blobs } = await list();

  const freshDataversion = blobs.reduce(
    (acc, blob) => blob.uploadedAt.getTime() + acc,
    0
  );

  const storedDataversion = await kv.get<number>(DataVersionKey);

  if (storedDataversion === freshDataversion) {
    return Response.json({
      message: "Already fresh, " + freshDataversion,
    });
  }

  await kv.set(DataVersionKey, freshDataversion);

  revalidateTag("posts");

  return Response.json({
    message: "Revalidation triggered, " + freshDataversion,
  });
}
