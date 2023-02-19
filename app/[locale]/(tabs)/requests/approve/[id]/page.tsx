
import { getAsset, getRequest } from "../../../../../../components/chain_utils";
import ApprovePanel from "./panel";

export default async function Page({ params }) {
    const request = await getRequest(params.id);
    const asset = await getAsset(request.customer);
    return (
        <ApprovePanel customer={asset} request={request} />
    )

}
