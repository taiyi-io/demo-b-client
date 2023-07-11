'use client';
import { useAppContext } from '../../../../components/context';
import { CustomerAsset } from '../../../../components/customer_asset';
import Pagination from '../../../../components/pagination';
import AssetTable from './asset_table';

const i18n = {
    en: {
        title: 'Customer Assets',
    },
    cn: {
        title: '客户资产',
    }
}

export default function AssetPanel({ currentPage, totalPages, records }:{
    currentPage: number, 
    totalPages: number, 
    records: CustomerAsset[],
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
                <AssetTable records={records} />
            </div>
            <Pagination current={currentPage} total={totalPages} baseURL='/assets/' />
        </div>
    )
}

