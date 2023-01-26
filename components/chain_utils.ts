import ChainProvider from "./chain_provider";
import { LogRecords, QueryBuilder } from "./chain_sdk";
import { AssetList, ASSET_SCHEMA_NAME, CustomerAsset } from "./customer_asset";
import { VerifyRequest, REQUEST_SCHEMA_NAME, RequestList, RequestStatus } from "./verify_request";

const currentBank = 'bank_b';

export async function getRequest(recordID: string): Promise<VerifyRequest> {
  let conn = await ChainProvider.connect();
  let content = await conn.getDocument(REQUEST_SCHEMA_NAME, recordID);
  let record: VerifyRequest = JSON.parse(content);
  record.id = recordID;
  return record;
}

export async function queryRequests(pageOffset: number, pageSize: number): Promise<RequestList> {
  let conn = await ChainProvider.connect();
  let condition = new QueryBuilder().
    MaxRecord(pageSize).
    SetOffset(pageOffset).
    PropertyEqual('bank', currentBank).
    PropertyNotEqual('status', RequestStatus.Idle.toString()).
    DescendBy('create_time').
    Build();
  let result = await conn.queryDocuments(REQUEST_SCHEMA_NAME, condition);
  let recordList: RequestList = {
    records: [],
    offset: result.offset,
    limit: result.limit,
    total: result.total,
  };
  if (result.documents && 0 !== result.documents.length) {
    for (let doc of result.documents) {
      let record: VerifyRequest = JSON.parse(doc.content);
      record.id = doc.id;
      recordList.records.push(record);
    }
  }
  return recordList;
}

export async function queryCustomers(pageOffset: number, pageSize: number): Promise<AssetList> {
  let conn = await ChainProvider.connect();
  let condition = new QueryBuilder().
    MaxRecord(pageSize).
    SetOffset(pageOffset).
    Build();
  let result = await conn.queryDocuments(ASSET_SCHEMA_NAME, condition);
  let recordList: AssetList = {
    records: [],
    offset: result.offset,
    limit: result.limit,
    total: result.total,
  };
  if (result.documents && 0 !== result.documents.length) {
    for (let doc of result.documents) {
      let record: CustomerAsset = JSON.parse(doc.content);
      record.customer = doc.id;
      recordList.records.push(record);
    }
  }
  return recordList;
}

export async function getAsset(customerID: string): Promise<CustomerAsset> {
  let conn = await ChainProvider.connect();
  let content = await conn.getDocument(ASSET_SCHEMA_NAME, customerID);
  let record: CustomerAsset = JSON.parse(content);
  record.customer = customerID;
  return record;
}

export async function loadAllRequests(): Promise<VerifyRequest[]> {
  const pageSize = 20;
  const schemaName = REQUEST_SCHEMA_NAME;
  let offset = 0;
  let result: VerifyRequest[] = [];
  let exitFlag = false;
  let conn = await ChainProvider.connect();
  do {
    let condition = new QueryBuilder().
      MaxRecord(pageSize).
      SetOffset(offset).
      PropertyEqual('bank', currentBank).
      PropertyNotEqual('status', RequestStatus.Idle.toString()).
      Build();
    let records = await conn.queryDocuments(schemaName, condition);
    if (records.documents && 0 !== records.documents.length) {
      for (let doc of records.documents) {
        let record: VerifyRequest = JSON.parse(doc.content);
        record.id = doc.id;
        offset++;
        result.push(record);
      }
    }
    if (offset >= records.total) {
      exitFlag = true;
    }
  } while (!exitFlag);
  return result;
}

export async function getRecordHistory(recordID: string): Promise<LogRecords>{  
  const schemaName = REQUEST_SCHEMA_NAME;
  let conn = await ChainProvider.connect();
  return conn.getDocumentLogs(schemaName, recordID);
}