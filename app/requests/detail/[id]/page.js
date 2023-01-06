import DetailPanel from './panel';

const pseudoData = {
  customer: "lisi",
  minimum_asset: 1000000,
  invoker: 'atom',
  result: false,
  verify_mode: 'manual',
  verifier: 'bob',
  comment: '客户资产不足',
  status: 2,
  create_time: '2022-12-18 11:00:05',
  invoke_time: '2022-12-21 19:41:00',
  verify_time: '2022-12-21 19:43:07'
};

// const pseudoData = {
//     customer: "laoliu",
//     amount: 320000,
//     bank: 'bank_b',
//     minimum_asset: 250000,
//     invoker: 'atom',
//     verify_mode: 'manual',
//     verifier: 'bob',
//     status: 1,
//     create_time: '2022-12-19 11:20:05',
//     invoke_time: '2022-12-21 21:30:00'
// };


async function getData(id) {
  //todo: parse pagination parameters from query
  return {
    id: id,
    ...pseudoData,
  };
}


export default async function Page({ params }){
  const requestID = params.id;
  const data = await getData(requestID);
   return (
    <DetailPanel data={data}/>
   )
}
