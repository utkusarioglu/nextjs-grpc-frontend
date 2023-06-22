import { ProviderName, EvmServiceProvider } from "./evm.service.types";

class EvmService {
  private providers: Record<ProviderName, EvmServiceProvider> = {};

  public setProvider(name: ProviderName, provider: EvmServiceProvider) {
    this.providers[name] = provider;
  }

  public getProvider(name: ProviderName): EvmServiceProvider {
    if (!this.providers[name]) {
      throw new Error("PROVIDER_NOT_DEFINED");
    }
    return this.providers[name];
  }
}

export const evmService = new EvmService();
