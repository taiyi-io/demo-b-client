import AssetPanel from "./panel";

const pseudoData = {
    offset: 5,
    size: 5,
    total: 14,
    records: [
        {
            customer: "wang_xiaoer",
            asset: 250000,
            cash: 60000,
            register: '2021-10-05 13:00:50',
            status: 0,
        },
        {
            customer: "zhangsan",
            asset: 1350000,
            cash: 6530000,
            register: '2016-07-25 16:01:20',
            status: 0,
        },
        {
            customer: "lisi",
            asset: 5000,
            cash: 120000,
            register: '2021-01-15 19:00:50',
            status: 2,
        },
        {
            customer: "laoliu",
            asset: 410000,
            cash: 930000,
            register: '2020-10-07 13:00:50',
            status: 3,
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
        <AssetPanel currentPage={currentPage} totalPages={totalPages} records={records} />
    )
}