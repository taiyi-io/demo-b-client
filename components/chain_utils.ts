import ChainProvider from "./chain_provider";
import { QueryBuilder } from "./chain_sdk";
import { AssetList, ASSET_SCHEMA_NAME, CustomerAsset } from "./customer_asset";
import { VerifyRequest, REQUEST_SCHEMA_NAME } from "./verify_request";

export async function getRecord(recordID: string): Promise<VerifyRequest> {
  let conn = await ChainProvider.connect();
  let content = await conn.getDocument(REQUEST_SCHEMA_NAME, recordID);
  let record: VerifyRequest = JSON.parse(content);
  record.id = recordID;
  return record;
}

export async function queryCustomers(pageOffset: number, pageSize: number):  Promise<AssetList> {
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
  if (result.documents && 0 !== result.documents.length){
    for (let doc of result.documents){
      let record: CustomerAsset = JSON.parse(doc.content);
      record.customer = doc.id;
      recordList.records.push(record);
    }
  }
  return recordList;
}

export async function loadAllRecords(): Promise<VerifyRequest[]>{  
  const pageSize = 20;
  const schemaName = REQUEST_SCHEMA_NAME;
  let offset = 0;
  let result: VerifyRequest[] = [];
  let exitFlag = false;
  let conn = await ChainProvider.connect();
  do {
    let condition = new QueryBuilder().MaxRecord(pageSize).SetOffset(offset).Build();
    let records = await conn.queryDocuments(schemaName, condition);
    if (records.documents && 0 !== records.documents.length){
      for (let doc of records.documents){
        let record: VerifyRequest = JSON.parse(doc.content);
        record.id = doc.id;
        offset++;
        result.push(record);
      }      
    }
    if(offset >= records.total){
      exitFlag = true;
    }
  }while(!exitFlag);
  return result;
}