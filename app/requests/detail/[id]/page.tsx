import { getRequest, loadAllRequests } from '../../../../components/chain_utils';
import DetailPanel from './panel';

export async function generateStaticParams() {
  const requests = await loadAllRequests();
  return requests.map(request => ({
      id: request.id,
  }));
}

export default async function Page({ params }){
  const requestID = params.id;
  const data = await getRequest(requestID);
   return (
    <DetailPanel data={data}/>
   )
}
