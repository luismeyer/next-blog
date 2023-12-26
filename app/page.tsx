import Link from "next/link";

export default function Home() {
  return (
    <main className="grid gap-4">
      <Link className="text-4xl" href="/posts">
        Youre Posts
      </Link>
    </main>
  );
}
