export * as authService from "./services/auth/auth.service";

export {
  logoutApiV1,
  type ResponsesUnion as LogoutApiV1Responses,
} from "./v1/auth/logout";
export {
  loginUserPassApiV1,
  type ResponsesUnion as LoginUserPassApiV1Responses,
} from "./v1/auth/login/user-pass";
export {
  loginAuthIdApiV1,
  type ResponsesUnion as LoginAuthIdApiV1Responses,
} from "./v1/auth/login/auth-id";

export {
  postsApiV1,
  type ResponsesUnion as PostsApiV1Responses,
  type QueryParams as PostsApiV1QueryParams,
} from "./v1/feed/posts";
export {
  storiesApiV1,
  type ResponsesUnion as StoriesApiV1Responses,
  type QueryParams as StoriesApiV1QueryParams,
} from "./v1/feed/stories";

export {
  inflationApiV1,
  type ResponsesUnion as InflationApiV1Responses,
  type QueryParams as InflationApiV1ResponsesQueryParams,
} from "./v1/inflation";
