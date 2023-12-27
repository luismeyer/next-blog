import { revalidateTag, unstable_noStore } from "next/cache";

export async function GET() {
  unstable_noStore();

  revalidateTag("posts");

  return Response.json({
    message: "Revalidation triggered",
  });
}
