type FrontMatter = {
  summary: string;
  publishedAt: string;
  title: string;
};

function validateFrontMatter(frontMatter: any): frontMatter is FrontMatter {
  return (
    typeof frontMatter.summary === "string" &&
    typeof frontMatter.publishedAt === "string" &&
    typeof frontMatter.title === "string"
  );
}

export function parseFrontMatter(content: string): [FrontMatter, string] {
  const start = content.indexOf("---");
  const end = content.indexOf("---", start + 1);

  const frontMatter = content.slice(start, end);
  const lines = frontMatter.split("\n");

  const frontMatterObject = lines.reduce((acc, line) => {
    const [key, value] = line.split(": ");
    return { ...acc, [key]: value };
  }, {});

  if (!validateFrontMatter(frontMatterObject)) {
    throw new Error("Invalid front matter in " + content);
  }

  return [frontMatterObject, content.slice(end + 3)];
}
