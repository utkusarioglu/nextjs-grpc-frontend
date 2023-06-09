import { type FC } from "react";
import { YStack, H1, Paragraph, Button, Spacer, SizableText, H4 } from "ui";
import { useRouter } from "solito/router";
import { type Web3ConnectionOptionsProps, web3Service } from "web3";
import { useSelector, selectDrivers } from "store";
import BalanceLayout from "../layouts/Balance.layout";
import { ErrorBoundary } from "react-error-boundary";
import { ScreenFallback } from "../fallbacks/Screen.fallback";
import { useTranslation } from "i18n";

interface EvmScreenProps {
  // EvmConnectionOptionsComponent: FC<Web3ConnectionOptionsProps>;
}

const NAMES = {
  metamask: "MetaMask",
  walletConnect: "WalletConnect",
};

const EvmScreen: FC<EvmScreenProps> = () => {
  const { t } = useTranslation(["guest"]);
  const { back, push } = useRouter();
  const driverStates = useSelector(selectDrivers);

  return (
    <ErrorBoundary FallbackComponent={ScreenFallback}>
      <YStack fullscreen>
        <YStack
          flexGrow={1}
          padding="$4"
          alignItems="center"
          justifyContent="center"
        >
          <H1>Evm</H1>
          <Paragraph>Login with evm identity</Paragraph>
          <Spacer />
          <EvmConnectionOptions driverStates={driverStates} />
          <Spacer />
        </YStack>

        <YStack paddingLeft="$4" paddingRight="$4">
          <Button onPress={() => push({ pathname: "/login" })}>
            {t`guest:WelcomeScreen.Login.WithUserPass`}
          </Button>
        </YStack>
        <Spacer />
        <BalanceLayout />
        <YStack padding="$4">
          <Button onPress={() => back()}>Go back</Button>
        </YStack>
      </YStack>
    </ErrorBoundary>
  );
};

const EvmConnectionOptions: FC<Web3ConnectionOptionsProps> = ({
  driverStates,
}) => {
  const options = web3Service.getDriverKeys().map((key) => ({
    driver: web3Service.getDriver(key),
    state: driverStates[key],
    name: NAMES[key],
  }));

  const available = options.filter(({ state }) => state.available);

  if (!available.length) {
    return (
      <YStack
        space="$2"
        padding="$4"
        backgroundColor="$color4"
        borderRadius="$4"
      >
        <Paragraph>No method for web3 connectivity available</Paragraph>
      </YStack>
    );
  }

  return (
    <YStack space="$2">
      {available.map(({ driver, state, name }) => (
        <Button key={name} onPress={async () => driver.connect()} size="$7">
          <YStack>
            <H4>{name}</H4>
            <SizableText theme="alt2">
              {[
                state.locked ? "locked" : "unlocked",
                state.initialization,
                state.connection,
              ].join(", ")}
            </SizableText>
          </YStack>
        </Button>
      ))}
    </YStack>
  );
};

export default EvmScreen;
