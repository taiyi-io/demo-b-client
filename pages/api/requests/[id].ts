import type { NextApiRequest, NextApiResponse } from 'next';
import ChainProvider from '../../../components/chain_provider';
import { RequestStatus, REQUEST_SCHEMA_NAME, VerifyRequest } from '../../../components/verify_request';
import { ResponsePayload } from '../response';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //put only
    if ('PUT' === req.method) {
        await handleProccessRequest(req, res);
    } else {
        throw new Error('unsupport method: ' + req.method);
    }
}

async function handleProccessRequest(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    interface requestPayload {
        comment: string,
        verifier: string,
        approve: boolean,
    }
    let payload: requestPayload = JSON.parse(req.body);
    const { comment, verifier } = payload;
    let result: ResponsePayload = {
        error_code: 0,
    }
    try {
        if (!comment) {
            throw new Error('comment required')
        }
        if (!verifier) {
            throw new Error('verifier ID required')
        }
        await proccessRequest(id as string, verifier, payload.approve, comment);
    } catch (error) {
        result.error_code = 500;
        result.message = error.message;
    } finally {
        res.status(200).json(result);
    }
}

async function proccessRequest(requestID: string, verifier: string, approve: boolean, comment: string) {
    let conn = await ChainProvider.connect();
    let currentContent = await conn.getDocument(REQUEST_SCHEMA_NAME, requestID);
    let currentRecord: VerifyRequest = JSON.parse(currentContent);
    if (RequestStatus.Approving !== currentRecord.status) {
        throw new Error(`request '${requestID}' already processed`);
    }
    currentRecord.status = RequestStatus.Complete;
    currentRecord.verifier = verifier
    currentRecord.result = approve;
    currentRecord.comment = comment;
    currentRecord.verify_time = new Date().toISOString();
    await conn.updateDocument(REQUEST_SCHEMA_NAME, requestID, JSON.stringify(currentRecord));
    //updated
    if (approve) {
        console.log(`<API> request '${requestID}' approved`);
    } else {
        console.log(`<API> request '${requestID}' rejected`);
    }

}