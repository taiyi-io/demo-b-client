'use client';
import { useAppContext } from '../../components/context';
import Pagination from '../../components/pagination';
import { VerifyRequest } from '../../components/verify_request';
import RequestTable from './request_table';

const i18n = {
    en: {
        title: 'Verification Requests',
    },
    cn: {
        title: '验资请求',
    }
}

export default function RequestPanel({ currentPage, totalPages, records }:{
    currentPage: number, 
    totalPages: number, 
    records: VerifyRequest[],
}) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    return (
        <div className='container'>
            <div className='row mx-1'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">{texts.title}</li>
                    </ol>
                </nav>
            </div>
            <div className='row m-2 p-2'>
                <RequestTable records={records} />
            </div>
            <Pagination current={currentPage} total={totalPages} baseURL='/requests/' />
        </div>
    )
}

