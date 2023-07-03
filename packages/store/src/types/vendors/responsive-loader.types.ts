interface ResponsiveLoaderImageImagesItem {
  path: string;
  width: number;
  height: number;
}

export interface ResponsiveLoaderImage {
  srcSet: string;
  images: ResponsiveLoaderImageImagesItem[];
  src: string;
  placeholder: string;
  width: number;
  height: number;
}
