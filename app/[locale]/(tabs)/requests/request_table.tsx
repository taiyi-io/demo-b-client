import React from 'react';
import { usePathname } from 'next/navigation';
import { useAppContext, getCurrentyFormatter } from '../../../../components/context';
import { RequestStatus, VerifyMode, VerifyRequest } from '../../../../components/verify_request';
import { keepAlive } from '../../../../components/api_utils';


const i18n = {
    en: {
        id: 'ID',
        customer: 'Customer',
        asset: 'Minimal Asset',
        status: 'Status',
        operate: 'Operates',
        btnDetail: 'Detail',
        btnApprove: 'Approve',
        btnHistory: 'History',
        modified: 'Last Modified',
        statusManualApproving: 'Manual Approving',
        statusManualApproved: 'Manual Approved',
        statusManualRejected: 'Manual Rejected',
        statusAutoApproving: 'Auto Approving',
        statusAutoApproved: 'Auto Approved',
        statusAutoRejected: 'Auto Rejected',
        noRecord: 'No request availalble',
    },
    cn: {
        id: '单据号',
        customer: '客户标识',
        asset: '资产要求',
        status: '状态',
        operate: '操作',
        btnDetail: '详情',
        btnApprove: '审批',
        btnHistory: '变更历史',
        modified: '最后更新',        
        statusManualApproving: '人工审批中',
        statusManualApproved: '已人工批准',
        statusManualRejected: '已人工拒绝',
        statusAutoApproving: '自动审批中',
        statusAutoApproved: '已自动批准',
        statusAutoRejected: '已自动拒绝',
        noRecord: '尚无审批请求',
    }
}

export default function RequestTable({ records }: {
    records: VerifyRequest[]
}) {
    const currentPath = usePathname();
    const { lang } = useAppContext();
    const texts = i18n[lang];
    let formatter = getCurrentyFormatter();
    const aliveInterval = 1000 * 10;
    React.useEffect(() => {
        let intervalID = setInterval(async () => {
            await keepAlive();
        }, aliveInterval);
        return () => {
            clearInterval(intervalID);
        };
    }, []);
    let content: React.ReactNode;
    if (records && 0 !== records.length) {
        content = records.map(({ id, customer, verify_mode, result,
            minimum_asset, status, invoke_time, verify_time }) => {
            let operates = [{
                href: '/detail/' + id,
                icon: 'bi-search',
                label: texts.btnDetail,
            }];
            let statusLabel: string, timeLabel: string;
            let isManual = VerifyMode.Manual === verify_mode;
            if (RequestStatus.Approving === status) {
                if (isManual){
                    statusLabel = texts.statusManualApproving;
                }else{
                    statusLabel = texts.statusAutoApproving;
                }                
                timeLabel = new Date(invoke_time as string).toLocaleString();                
                operates.push({
                    href: '/approve/' + id,
                    icon: 'bi-person-fill',
                    label: texts.btnApprove,
                });
            } else {
                if (isManual){
                    if (result){
                        statusLabel = texts.statusManualApproved;
                    }else{
                        statusLabel = texts.statusManualRejected;
                    }                    
                }else{
                    if (result){
                        statusLabel = texts.statusAutoApproved;
                    }else{
                        statusLabel = texts.statusAutoRejected;
                    }
                }                

                timeLabel = new Date(verify_time as string).toLocaleString();
            }
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td className='text-center'>{customer}</td>
                    <td className='text-end'>{formatter.format(minimum_asset)}</td>
                    <td>{statusLabel}</td>
                    <td>{timeLabel}</td>
                    <td>
                        <div className='d-flex'>
                            {
                                operates.map(({ href, icon, label }, index) => (
                                    <a href={currentPath + href} key={index}>
                                        <button type="button" className="btn btn-outline-primary btn-sm m-1">
                                            <i className={'bi ' + icon}></i>
                                            {label}
                                        </button>
                                    </a>
                                ))
                            }
                        </div>
                    </td>
                </tr>
            );
        })
    }else{
        content = (
            <tr className='text-center'>
                <td colSpan={10}>
                    {texts.noRecord}
                </td>
            </tr>
        );
    }
    return (
        <table className="table table-hover">
            <thead>
                <tr className="table-primary text-center">
                    <th>{texts.id}</th>
                    <th>{texts.customer}</th>
                    <th>{texts.asset}</th>
                    <th>{texts.status}</th>
                    <th>{texts.modified}</th>
                    <th>{texts.operate}</th>
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </table>
    )
}