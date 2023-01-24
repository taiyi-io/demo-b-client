
import { getAsset, getRequest, loadAllRequests } from "../../../../components/chain_utils";
import ApprovePanel from "./panel";

export async function generateStaticParams() {
    const requests = await loadAllRequests();
    return requests.map(request => ({
        id: request.id,
    }));
}

export default async function Page({ params }) {
    const request = await getRequest(params.id);
    const asset = await getAsset(request.customer);
    return (
        <ApprovePanel customer={asset} request={request} />
    )

}
