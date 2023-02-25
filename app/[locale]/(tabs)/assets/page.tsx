import { queryCustomers } from "../../../../components/chain_utils";
import AssetPanel from "./panel";

export default async function Page({ searchParams }: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    let page: number = 0;
    if (searchParams && searchParams.page){
      let pageString = searchParams.page as string;
      let index = Number.parseInt(pageString);
      if (!Number.isNaN(index)){
        page = index;
      }
    }
    const recordPerPage = 5;
    const pageOffset = recordPerPage * page;
    let { offset, total, records } = await queryCustomers(pageOffset, recordPerPage);
    let currentPage = 0;
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