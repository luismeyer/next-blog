import { kv } from "@vercel/kv";

type ViewCounterProps = {
  slug: string;
  countView?: boolean;
};

export async function ViewCounter({ slug, countView }: ViewCounterProps) {
  let count = (await kv.get<number>(slug)) ?? 0;

  if (countView) {
    count = count ? count + 1 : 1;
    await kv.set(slug, count);
  }

  return <span>Views {count}</span>;
}
