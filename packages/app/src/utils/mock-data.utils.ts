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
                }))
                .map((row) => {
                  return Object.entries(row).reduce(
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
                })
            )
            .reduce((p, c) => {
              p = [...p, ...c];
              return p;
            }, []);
    return Promise.resolve(data);
  }
}
