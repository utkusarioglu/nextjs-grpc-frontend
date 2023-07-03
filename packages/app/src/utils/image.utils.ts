// TODO any - this function was taken from utkusarioglu-com
function produceSizes(images: any, maxResponsiveWidth: any): string {
  return (
    images
      // @ts-ignore
      .filter(({ width }) => width <= maxResponsiveWidth)
      // @ts-ignore
      .map(({ width }, i: number, a: any) => {
        let maxWidth =
          a.length > i + 1 ? `(max-width: ${a[i + 1].width - 1}px)` : "";
        return `${maxWidth} ${width}px`.trimLeft();
      })
      .join(", ")
  );
}

export function selectImageUrl(
  images: any[],
  minWidth: number,
  minHeight: number,
  includeHost: boolean = false
) {
  const imageRelPath = images.filter(
    // @ts-ignore
    ({ width: imgWidth, height: imgHeight }) =>
      imgWidth >= minWidth && imgHeight >= minHeight
  )[0].path;

  if (!includeHost) {
    return imageRelPath;
  }

  const prefix = process.env.NEXT_PUBLIC_WEB_APP_URL!;
  return [prefix, imageRelPath].join("");
}
