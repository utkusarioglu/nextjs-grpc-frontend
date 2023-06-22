import { type FC } from "react";
import { type AvailableDrivers, useWeb3Driver } from "web3";
import { YStack, SizableText, XStack, H5 } from "ui";

interface BalanceItemProps {
  driverKey: AvailableDrivers;
}

const NAMES = {
  walletConnect: "WalletConnect",
  metamask: "MetaMask",
};

const BalanceItem: FC<BalanceItemProps> = ({ driverKey }) => {
  const { balanceInWei, shortAddress } = useWeb3Driver(driverKey);
  return (
    <YStack padding="$3" borderRadius="$4" backgroundColor="$color3">
      <XStack justifyContent="space-between" alignItems="center">
        <SizableText theme="alt2">Ethereum Mainnet</SizableText>
        <SizableText theme="alt2">{NAMES[driverKey]}</SizableText>
      </XStack>
      <XStack justifyContent="space-between" alignItems="center">
        <H5>{balanceInWei}</H5>
        <SizableText theme="alt2">{shortAddress}</SizableText>
      </XStack>
    </YStack>
  );
};

const BalanceLayout = () => {
  return (
    <YStack space="$2">
      <BalanceItem driverKey="metamask" />
      <BalanceItem driverKey="walletConnect" />
    </YStack>
  );
};

export default BalanceLayout;
