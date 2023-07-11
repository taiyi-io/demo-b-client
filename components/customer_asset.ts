import { DocumentProperty, PropertyType } from "@taiyi-io/chain-connector";

export enum AccountStatus {
    Normal = 0,
    Alert,
    Suspend,
};

enum assetProperty {
    Asset = 'asset',
    CashFlow = 'cash_flow',
    Status = 'status',
    RegisterTime = 'register_time',
}

export const ASSET_SCHEMA_NAME = 'customer_asset';

export const AssetProperties: DocumentProperty[] = [
    {
        name: assetProperty.Asset,
        type: PropertyType.Currency,
        indexed: true,
    },
    {
        name: assetProperty.CashFlow,
        type: PropertyType.Currency,
        indexed: true,
        omissible: true,
    },
    {
        name: assetProperty.Status,
        type: PropertyType.Integer,
        indexed: true,
    },
    {
        name: assetProperty.RegisterTime,
        type: PropertyType.String,
    }
];

export interface CustomerAsset {
    customer?: string,
    asset: number,
    cash_flow?: number,
    status: number,
    register_time: string,
}

export interface AssetList {
    offset: number,
    limit: number,
    total: number,
    records: CustomerAsset[],
  }

export class AssetRecord implements CustomerAsset{
    customer: string = '';
    asset: number = 0;
    cash_flow: number = 0;
    status: number = AccountStatus.Normal;
    register_time: string = '';
}