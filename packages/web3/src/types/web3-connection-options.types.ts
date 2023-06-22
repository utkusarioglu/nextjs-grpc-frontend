import type { selectDrivers } from "store";

export type Web3ConnectionOptionsProps = {
  driverStates: ReturnType<typeof selectDrivers>;
};
