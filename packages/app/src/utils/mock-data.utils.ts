export class MockData {
  // TODO any
  public static decadeStats(codes: string[]): Promise<any> {
    const data =
      codes[0] === ""
        ? []
        : codes
            .map((code) =>
              Array(2)
                .fill(null)
                .map((_, i) => ({
                  countryCode: `${code.toUpperCase()}-${i}`,
                  countryName: code.toLowerCase(),
                  decade: i,
                  count: i,
                  average: i,
                  max: i,
                  min: i,
                  median: i,
                  range: i,
                  stdDev: i,
                  variance: i,
                }))
            )
            .reduce((p, c) => {
              p = [...p, ...c];
              return p;
            }, []);
    return Promise.resolve(data);
  }
}
