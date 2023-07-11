import { getRequest } from '../../../../../../components/chain_utils';
import DetailPanel from './panel';

export default async function Page({ params }){
  const requestID = params.id;
  const data = await getRequest(requestID);
   return (
    <DetailPanel data={data}/>
   )
}
