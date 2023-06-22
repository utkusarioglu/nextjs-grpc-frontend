// import type {
//   AvailableDrivers,
//   // UpdateWeb3Provider,
// } from "../../types/web3-channel.service.types";
import type {
  Web3DriversMap,
  Web3DriversList,
  Web3Driver,
} from "../../types/web3-driver.types";
import type { Dispatcher } from "../../types/vendors/store.types";
import { AvailableDrivers } from "../../exports";

export class Web3Service {
  private dispatcher!: Dispatcher;
  private drivers: Web3DriversMap = new Map();

  public setDispatcher(dispatcher: Dispatcher) {
    this.dispatcher = dispatcher;
    return this;
  }

  public setDrivers(channels: Web3DriversList) {
    channels.forEach((driver) => {
      const newDriver = driver.setDispatcher(this.dispatcher);
      this.drivers.set(newDriver.key, newDriver);
    });
    return this;
  }

  public async initializeAll() {
    if (!this.dispatcher) {
      throw new Error("DISPATCHER_NOT_SET");
    }
    if (!this.drivers.size) {
      console.log("no_channels_defined");
      return;
    }
    return new Promise<void>(async (resolve) => {
      for (const [key, driver] of this.drivers) {
        console.log(`Initializing driver: ${key}`);
        await driver.initialize();
      }
      resolve();
    });
  }

  public getDriver(channelName: string): Web3Driver {
    const driver = this.drivers.get(channelName);
    if (!driver) {
      throw new Error("NO_SUCH_DRIVER");
    }
    return driver;
  }

  public getDriverKeys(): AvailableDrivers[] {
    const keys = [];
    for (const [key, _] of this.drivers) {
      keys.push(key);
    }
    return keys as AvailableDrivers[];
  }
}

export const web3Service = new Web3Service();
