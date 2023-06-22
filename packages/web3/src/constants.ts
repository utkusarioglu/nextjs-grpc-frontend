// import { Web3ConnectionUpdate } from "./types/connector.types";

export const WALLET_CONNECT_PROJECT_ID = "ba35596ef4c40d6cf7e3a80121e54090";

export const WALLET_CONNECT_WEB_METADATA = {
  name: "NextJS gRPC",
  description: "An exploratory project with no use case",
  url: "https://nextjs-grpc.utkusarioglu.com",
  // TODO provide valid icons
  icons: ["https://avatars.githubusercontent.com/u/32932503"],
};

export const WALLET_CONNECT_NAMESPACES = {
  eip155: {
    methods: [
      "eth_sendTransaction",
      // "personal_sign",
      "eth_getBalance",
    ],
    chains: ["eip155:1"],
    events: ["chainChanged", "accountsChanged", "connect", "disconnect"],
    // rpcMap: {
    //   chainId: `https://rpc.walletconnect.com?chainId=eip155:1&projectId=${WALLET_CONNECT_PROJECT_ID}`,
    // },
  },
};

export const WALLET_CONNECT_ANDROID_METADATA = {
  ...WALLET_CONNECT_WEB_METADATA,
  redirect: {
    native: "nextjs-grpc://",
    universal: "nextjs-grpc.utkusarioglu.com",
  },
};

// export const INITIAL_CONNECTION_PROPS: Web3ConnectionUpdate = {
//   state: "disconnected",
//   type: "none",
//   session: undefined,
//   accounts: [],
// };
