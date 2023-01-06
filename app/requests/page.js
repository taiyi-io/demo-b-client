import RequestPanel from "./panel";

const pseudoData = {
    offset: 0,
    size: 5,
    total: 26,
    records: [
        {
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
        },
        {
            id: '2234',
            customer: "zhangsan",
            amount: 45000,
            bank: 'bank_b',
            minimum_asset: 30000,
            invoker: 'atom',
            result: true,
            verify_mode: 'contract',
            verifier: 'verify_asset',
            status: 2,
            create_time: '2022-12-19 09:00:05',
            invoke_time: '2022-12-21 18:41:00',
            verify_time: '2022-12-21 21:55:07'
        },
        {
            id: '2235',
            customer: "lisi",
            amount: 1500000,
            bank: 'bank_b',
            minimum_asset: 1000000,
            invoker: 'atom',
            result: false,
            verify_mode: 'manual',
            verifier: 'sam',
            status: 2,
            create_time: '2022-12-18 11:00:05',
            invoke_time: '2022-12-21 19:41:00',
            verify_time: '2022-12-21 19:43:07'
        },
        {
            id: '2236',
            customer: "laoliu",
            amount: 320000,
            bank: 'bank_b',
            minimum_asset: 250000,
            invoker: 'atom',
            verify_mode: 'manual',
            verifier: 'bob',
            status: 1,
            create_time: '2022-12-19 11:20:05',
            invoke_time: '2022-12-21 21:30:00'
        }
    ]
}

async function getData() {
    //todo: parse pagination parameters from query
    return pseudoData;
}

export default async function Page() {
    const data = await getData();
    const { offset, size, total, records } = data;
    const recordPerPage = size;
    var currentPage = 0;
    if (offset >= recordPerPage) {
        currentPage = Math.floor(offset / recordPerPage);
    }
    let totalPages = 0;
    if (0 === total % recordPerPage) {
        totalPages = total / recordPerPage;
    } else {
        totalPages = Math.ceil(total / recordPerPage);
    }
    return (
        <RequestPanel currentPage={currentPage} totalPages={totalPages} records={records} />
    )
}