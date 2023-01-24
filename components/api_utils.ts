import { ResponsePayload } from "../pages/api/response";

export async function keepAlive() {
  const url = '/api/alive/';
  const options = {
    method: 'PUT',
  };
  await fetch(url, options);
}

export async function approveRequest(requestID: string, verifier: string, approve: boolean, comment: string) {
  const payload = {
    comment: comment,
    verifier: verifier,
    approve: approve,
  };
  const url = '/api/requests/' + requestID;
  const options: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(payload),
  };
  let resp = await fetch(url, options);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  let result: ResponsePayload = await resp.json();
  if (0 !== result.error_code) {
    throw new Error(result.message);
  }
}