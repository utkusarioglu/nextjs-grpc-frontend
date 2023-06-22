import type { updateDriver } from "store";

export type Dispatcher = (params: Parameters<typeof updateDriver>[0]) => void;
