
export enum VerifyMode {
    Unknown = '',
    Manual = 'manual',
    Contract = 'contract',
}

export enum RequestStatus {
    Idle = 0,
    Approving,
    Complete,
}

export interface VerifyRequest {
    id?: string,
    customer: string,
    minimum_asset: number,
    creator: string,
    create_time: string,
    status: RequestStatus,
    invoker?: string,
    invoke_time?: string,
    verify_mode: VerifyMode,
    result?: boolean,
    verifier?: string,
    verify_time?: string,
    comment?: string,
};

export interface RequestList {
    offset: number,
    limit: number,
    total: number,
    records: VerifyRequest[],
}

export const REQUEST_SCHEMA_NAME = 'verify_request';