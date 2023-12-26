"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";

type ClientMdProps = {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};

const components = {
  Link,
  Image,
  h2: (props: object) => <h2 className="text-lg pt-4" {...props} />,
  p: (props: object) => <p className="py-4" {...props} />,
};

export function ClientMd({ source }: ClientMdProps) {
  return (
    <div className="wrapper">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
