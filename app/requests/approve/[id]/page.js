
import ApprovePanel from "./panel";

const pseudoAsset = {
    customer: "wang_xiaoer",
    asset: 250000,
    cash: 60000,
    register: '2021-10-05 13:00:50',
    status: 0,
};

const pseudoRequest = {
    id: '1234',
    customer: "wang_xiaoer",
    amount: 500000,
    bank: 'bank_b',
    minimum_asset: 300000,
    invoker: 'atom',
    verify_mode: 'manual',
    status: 1,
    create_time: '2022-12-20 10:00:05',
    invoke_time: '2022-12-21 17:41:00'
};

async function getRequestData(requestID) {
    return pseudoRequest;
}

async function getCustomerAsset(customerID) {
    return pseudoAsset;
}


export default async function Page({ requestID }) {
    const request = await getRequestData(requestID);
    const asset = await getCustomerAsset(request.customer);
    return (
        <ApprovePanel userAsset={asset} request={request} />
    )

}
