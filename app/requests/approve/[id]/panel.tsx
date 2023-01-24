'use client';
import { useAppContext } from '../../../../components/context';
import Link from 'next/link';
import ApproveRequest from './approve';
import { VerifyRequest } from '../../../../components/verify_request';
import { CustomerAsset } from '../../../../components/customer_asset';

const i18n = {
    en: {
        requests: 'Verification Requests',
        approve: 'Approve',
    },
    cn: {
        requests: '验资请求',
        approve: '审批',
    }
}

export default function ApprovePanel({ request, customer }:{
    request: VerifyRequest, 
    customer: CustomerAsset,
}) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    return (
        <div className='container'>
            <div className='row mx-1'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href='/requests/'>{texts.requests}</Link></li>
                        <li className="breadcrumb-item active">{texts.approve}</li>
                    </ol>
                </nav>
            </div>
            <div className='row p-3'>
                <div className='col-3'>
                </div>
                <div className='col-6'>
                    <ApproveRequest request={request} customer={customer}/>
                </div>
            </div>
        </div>
    )
}