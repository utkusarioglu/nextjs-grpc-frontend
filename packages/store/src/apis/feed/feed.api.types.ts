import type { ResponsiveLoaderImage } from "../../types/vendors/responsive-loader.types";

interface Creator {
  profileImage: ResponsiveLoaderImage;
  username: string;
}

interface Interaction {
  isLiked: boolean;
}

type PostMediaTypes = "image";

type PostMediaContentImage = ResponsiveLoaderImage;

/**
 * If posts were to support content types other than image,
 * THis is where that definition would go
 */
type PostMediaContent = PostMediaContentImage;

interface PostMedia {
  type: PostMediaTypes;
  content: PostMediaContent;
  altText: string;
}

/**
 * @dev
 * #1 this should actually be an epoch
 */
interface Content {
  media: PostMedia[];
  date: string; // #1
  header: string;
  body: string;
}

interface Post {
  creator: Creator;
  interaction: Interaction;
  content: Content;
}

interface PostsApiResponseSuccess {
  status: "success";
  payload: Post[];
}

interface PostsApiResponseFailure {
  status: "failure";
  message: string;
}

export type PostsApiResponse =
  | PostsApiResponseSuccess
  | PostsApiResponseFailure;

/**
 * This should maybe come from the api definition and
 * not be redeclared here
 */
export interface PostsApiParams {
  offset: number;
  limit: number;
}

interface Story {
  content: {
    media: PostMedia; // TODO
  };
  creator: {
    profileImage: ResponsiveLoaderImage; // TODO
    username: string;
  };
}

interface StoriesApiResponseSuccess {
  status: "success";
  payload: Story[];
}

interface StoriesApiResponseFailure {
  status: "failure";
  message: string;
}

export type StoriesApiResponse =
  | StoriesApiResponseSuccess
  | StoriesApiResponseFailure;

export interface StoriesApiParams {
  offset: number;
  limit: number;
}
