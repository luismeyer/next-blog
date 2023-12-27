import { kv } from "@vercel/kv";
import { unstable_noStore } from "next/cache";

type ViewCounterProps = {
  slug: string;
  countView?: boolean;
};

export async function ViewCounter({ slug, countView }: ViewCounterProps) {
  unstable_noStore();

  let count = (await kv.get<number>(slug)) ?? 0;

  if (countView) {
    count = count ? count + 1 : 1;
    await kv.set(slug, count);
  }

  return <span>Views {count}</span>;
}
