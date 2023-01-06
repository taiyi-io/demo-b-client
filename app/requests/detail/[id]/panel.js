'use client';
import { useAppContext } from '../../../../components/context';
import BackButton from '../../../../components/back_button';
import RequestDetail from './detail';
import Link from 'next/link';

const i18n = {
    en: {
        requests: 'Verification Requests',
        detail: 'Detail',
    },
    cn: {
        requests: '验资请求',
        detail: '详情',
    }
}

export default function DetailPanel({ data }) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    return (
        <div className='container'>
            <div className='row mx-1'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href='/requests/'>{texts.requests}</Link></li>
                        <li className="breadcrumb-item active">{texts.detail}</li>
                    </ol>
                </nav>
            </div>
            <div className='row p-3'>
                <div className='col-3'>
                </div>
                <div className='col-6'>
                    <RequestDetail data={data} />
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-2'>
                    <BackButton href='/requests' />
                </div>
            </div>
        </div>
    )
}