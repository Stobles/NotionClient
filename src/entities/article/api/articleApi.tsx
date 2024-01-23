export const articleKeys = {
  articles: {
    root: ["articles"],
  },
  article: {
    root: ["article"],
    slug: (slug: string) => [...articleKeys.article.root, slug],
  },
  mutation: {
    create: () => [...articleKeys.article.root, "create"],
  },
};


