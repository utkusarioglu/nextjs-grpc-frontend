export type LoginWithUserPassArgs = [
  {
    username: string;
    password: string;
  }
];

export type LoginWithUserPassReturn = {
  authId: string;
  username: string;
};

export type LoginWithAuthIdArgs = [
  {
    authId: string;
  }
];

export type LoginWithAuthIdReturn = {
  authId: string;
  username: string;
};

export type LogoutWithAuthIdArgs = [
  {
    authId: string;
  }
];

export type LogoutWithAuthIdReturn = {
  authId: "";
  username: "";
};
