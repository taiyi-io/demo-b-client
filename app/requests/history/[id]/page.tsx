import HistoryPanel from './panel';
import { getRecordHistory } from '../../../../components/chain_utils';

// export async function generateStaticParams(){
//   const records = await loadAllRecords();
//   return records.map(record => ({
//     id: record.id,
//   }));
// }

export default async function Page({ params }){
  const recordID: string = params.id;
  let history = await getRecordHistory(recordID);
   return (
    <HistoryPanel history={history}/>
   )
}
