import { useEffect, useState } from "react";
import type { AvailableDrivers } from "../types/web3-channel.service.types";
import { useSelector, selectDriver } from "store";
import { web3Service } from "../services/web3/web3.service";

export function useWeb3Driver(key: AvailableDrivers) {
  const [balanceInWei, setBalanceInWei] = useState("-");
  const [address, setAddress] = useState("-");
  const driverState = useSelector(selectDriver(key));

  const shortAddress =
    address === "-" ? "-" : `${address.slice(0, 6)}…${address.slice(-4)}`;

  useEffect(() => {
    if (global.window && driverState.connection === "connected") {
      const driver = web3Service.getDriver(key);
      if (
        key === "metamask" &&
        driverState.type === "metamask" &&
        !!driverState.accounts.length
      ) {
        const provider = driver.getProvider();
        const address = driverState.accounts[0];
        setAddress(address);
        provider
          .getBalance(address)
          .then((b: any) => setBalanceInWei(b.toString()));
        return;
      }
      if (
        key === "walletConnect" &&
        driverState.type === "walletConnect" &&
        !!driverState.session
      ) {
        const accounts = driverState.session.namespaces.eip155.accounts;
        const address = accounts[0].split(":").pop();
        const provider = driver.getProvider();
        const signer = provider.getSigner();
        provider
          .getBalance(signer.getAddress())
          .then((b: any) => {
            console.log({ b });
            setBalanceInWei(b.toString());
          })
          .catch((e: any) => console.log("balance error2", e));
        if (!address) {
          throw new Error("NO_ADDRESS");
        }
        setAddress(address);
      }
    }
  }, [global.window, driverState, address]);

  return {
    ...driverState,
    balanceInWei,
    address,
    shortAddress,
  };
}
