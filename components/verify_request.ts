
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

export class RequestRecord implements VerifyRequest {
    id: string = '';
    customer: string = '';
    minimum_asset: number;
    creator: string;
    create_time: string;
    status: RequestStatus;
    invoker: string = '';
    invoke_time: string = '';
    verify_mode: VerifyMode;
    result: boolean = false;
    verifier: string = '';
    verify_time: string = '';
    comment: string = '';
    constructor(input: VerifyRequest) {
        const { customer, minimum_asset, creator, create_time, status, invoker, invoke_time, verify_mode,
            result, verifier, verify_time, comment, id } = input;
        this.customer = customer;
        this.minimum_asset = minimum_asset;
        this.creator = creator;
        this.create_time = create_time;
        this.verify_mode = verify_mode;
        this.status = status;
        if (!result) {
            this.result = false;
        } else {
            this.result = true;
        }
        if (id) {
            this.id = id;
        }
        if (invoker) {
            this.invoker = invoker;
        }
        if (invoke_time) {
            this.invoke_time = invoke_time;
        }
        if (verifier) {
            this.verifier = verifier;
        }
        if (verify_time) {
            this.verify_time = verify_time;
        }
        if (comment) {
            this.comment = comment;
        }
    }
}