import { readdir, readFile } from "fs/promises";
import Link from "next/link";
import { extname, resolve } from "path";
import { cwd } from "process";
import { Suspense } from "react";

import { parseFrontMatter } from "./front-matter";
import { ViewCounter } from "./view-counter";
import { list } from "@vercel/blob";

export const postsBasePath = resolve(cwd(), "./posts");
export const postsBaseUrl = "/posts/";

async function Post() {
  const { blobs } = await list();

  const items = await Promise.all(
    blobs.map(async (post) => {
      const content = await fetch(post.url).then((res) => res.text());

      const [{ publishedAt, summary, title }] = parseFrontMatter(content);
      const pathWithoutExt = post.pathname.replace(extname(post.pathname), "");

      return {
        href: postsBaseUrl + pathWithoutExt,
        slug: pathWithoutExt,
        summary,
        title,
        publishedAt,
      };
    })
  );

  return (
    <div className="grid gap-2">
      {items.map(({ publishedAt, slug, title, summary, href }) => (
        <Link href={href} key={slug}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">{title}</h2>

            <Suspense>
              <ViewCounter slug={slug} />
            </Suspense>
          </div>

          <span>
            {new Date(publishedAt).toDateString()}
            {" • "}
            {summary}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="grid gap-4">
      <h1 className="text-4xl">My Blog</h1>

      <Suspense>
        <Post />
      </Suspense>
    </main>
  );
}
