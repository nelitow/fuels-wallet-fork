import type {
  AssetData,
  FuelProviderConfig,
  NetworkData,
} from '@nelitow-fuel/types';
import type { AbiMap } from 'fuels';
import type { TransactionSummaryJson } from 'fuels';

export type MessageInputs = {
  signMessage: {
    message: string;
    address: string;
    origin: string;
    title?: string;
    favIconUrl?: string;
  };
  sendTransaction: {
    address: string;
    origin: string;
    title?: string;
    favIconUrl?: string;
    provider: FuelProviderConfig;
    transaction: string;
    skipCustomFee?: boolean;
    transactionState?: 'funded' | undefined;
    transactionSummary?: TransactionSummaryJson;
  };
  addAssets: {
    assets: AssetData[];
    origin: string;
    title?: string;
    favIconUrl?: string;
  };
  requestConnection: {
    origin: string;
    title?: string;
    favIconUrl?: string;
    totalAccounts: number;
  };
  addAbi: {
    abiMap: AbiMap;
  };
  getAbi: {
    contractId: string;
  };
  selectNetwork: {
    network: NetworkData;
  };
  addNetwork: {
    network: NetworkData;
  };
};

export type PopUpServiceInputs = {
  selectNetwork: {
    network: Partial<NetworkData>;
    currentNetwork?: NetworkData;
    popup: 'add' | 'select';
    origin: string;
    title: string;
    favIconUrl: string;
  };
  addNetwork: {
    network: Partial<NetworkData>;
    popup: 'add';
    origin: string;
    title: string;
    favIconUrl: string;
  };
};
