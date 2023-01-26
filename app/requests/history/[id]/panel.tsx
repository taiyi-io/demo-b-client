'use client';
import { useAppContext } from '../../../../components/context';
import BackButton from '../../../../components/back_button';
import Link from 'next/link';
import HistoryList from './list';
import { LogRecords } from '../../../../components/chain_sdk';

const i18n = {
    en: {
        forms: 'Verification Requests',
        history: 'History'
    },
    cn: {
        forms: '校验申请',
        history: '变更历史'
    }
}

export default function HistoryPanel({history}:{
    history: LogRecords
}) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    return (
        <div className='container'>
            <div className='row mx-1'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href='/forms'>{texts.forms}</Link></li>
                        <li className="breadcrumb-item active">{texts.history}</li>
                    </ol>
                </nav>
            </div>
            <div className='row p-3'>
                <div className='col-3'>
                </div>
                <div className='col-6'>
                    <HistoryList history={history} />
                </div>
            </div>
            <div className='row pb-3 justify-content-center'>
                <div className='col-2'>
                    <BackButton href='/requests/' />
                </div>
            </div>
        </div>
    )
}