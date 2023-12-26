import { head, list } from "@vercel/blob";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { Suspense } from "react";

import { ClientMd } from "../client-md";
import { parseFrontMatter } from "../front-matter";
import { ViewCounter } from "../view-counter";
import { postsBaseUrl } from "../url";

export default async function Slug({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const {
    blobs: [blob],
  } = await list({ prefix: slug });

  const content = await fetch(blob.url).then((res) => res.text());

  const [{ title, publishedAt, summary }, markdown] = parseFrontMatter(content);

  const markdownSource = await serialize(markdown);

  return (
    <main className="grid gap-4">
      <Link href={postsBaseUrl}>Back</Link>

      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{title}</h1>
          <span>{new Date(publishedAt).toDateString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <p>{summary}</p>

          <Suspense>
            <ViewCounter slug={slug} countView />
          </Suspense>
        </div>
      </div>

      <ClientMd source={markdownSource} />
    </main>
  );
}
