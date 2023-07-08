export class MockData {
  // TODO any
  public static decadeStats(codes: string[]): Promise<any> {
    const data =
      codes[0] === ""
        ? []
        : codes
            .map((code) =>
              Array(10)
                .fill(null)
                .map((_, i) => ({
                  creator: {
                    profileImage: require(`_assets/mock/avatars/${i % 7}.jpg`),
                  },
                  stats: {
                    countryCode: code.toLowerCase(),
                    countryName: `${code.toUpperCase()}-${i}`,
                    decade: 1990 + i,
                    count: Math.floor(Math.random() * i),
                    average: Math.floor(Math.random() * i + 1 * 20) / 5,
                    max: Math.floor(Math.random() * i + 1 * 40) / 2,
                    min: Math.floor(Math.random() * i + 1 * 10) / 4,
                    median: Math.floor(Math.random() * i + 1 * 30) / 6,
                    range: Math.floor(Math.random() * 10) + i,
                    stDev: Math.floor(Math.random() * 5) + i,
                    variance: Math.floor(Math.random() * 10) / 10,
                  },
                }))
                .map(({ stats, creator }) => {
                  const reducedStats = Object.entries(stats).reduce(
                    (acc, [key, val]) => {
                      if (["countryCode", "countryName"].includes(key)) {
                        acc[key] = val;
                      } else {
                        acc[key] = Math.round(+val * 100) / 100;
                      }

                      return acc;
                    },
                    // TODO fix `any` type
                    {} as any
                  );
                  return {
                    creator,
                    stats: reducedStats,
                  };
                })
            )
            .reduce((p, c) => {
              p = [...p, ...c];
              return p;
            }, []);
    return Promise.resolve(data);
  }

  public static posts(offset: number, limit: number) {
    const posts = Array(limit)
      .fill(null)
      .map((_, j) => {
        const cursor = offset + j * limit;
        return {
          creator: {
            profileImage: require(`_assets/mock/avatars/${cursor % 7}.jpg`),
            username: `rest:FeedScreen.Posts.Placeholder.Username`,
          },
          interaction: {
            isLiked: cursor % 3 == 0,
          },
          content: {
            media: Array((cursor % 3) + 1)
              .fill(null)
              .map((_, m) => ({
                type: "image" as "image",
                content: require(`_assets/mock/post-content/${
                  (cursor * 2 + m) % 18
                }.jpg`),
                altText: `rest:FeedScreen.Posts.Placeholder.Content.AltText`,
              })),
            date: `global:Time.Hour.Short`,
            header: `rest:FeedScreen.Posts.Placeholder.Header`,
            body: `rest:FeedScreen.Posts.Placeholder.Body`,
          },
        };
      });
    return Promise.resolve(posts);
  }

  public static stories(offset: number, limit: number) {
    const stories = Array(limit)
      .fill(null)
      .map((_, i) => {
        return {
          creator: {
            profileImage: require(`_assets/mock/avatars/${i % 7}.jpg`),
            username: "rest:FeedScreen.HorizontalImage.Placeholder",
          },
          content: {
            media: {
              type: "image" as "image",
              content: require(`_assets/mock/post-content/${i}.jpg`),
              altText: "rest:FeedScreen.Stories.Placeholder.Content.AltText",
            },
          },
        };
      });
    return Promise.resolve(stories);
  }
}
