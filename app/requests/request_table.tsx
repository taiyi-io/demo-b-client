import { useAppContext, getCurrentyFormatter } from '../../components/context';
import Link from 'next/link';
import { RequestStatus, VerifyMode, VerifyRequest } from '../../components/verify_request';
import { keepAlive } from '../../components/api_utils';
import React from 'react';

const i18n = {
    en: {
        id: 'ID',
        customer: 'Customer',
        asset: 'Minimal Asset',
        mode: 'Verify Mode',
        result: 'Verify Result',
        status: 'Status',
        operate: 'Operates',
        btnDetail: 'Detail',
        btnApprove: 'Approve',
        modified: 'Last Modified',
        approved: 'Approved',
        rejected: 'Rejected',
        modeManual: 'Manual',
        modeContract: 'Smart Contract',
        statusApproving: 'Wait Approve',
        statusComplete: 'Completed',
        noRecord: 'No request availalble',
    },
    cn: {
        id: '单据号',
        customer: '客户标识',
        asset: '资产要求',
        mode: '验证模式',
        result: '验证结果',
        status: '状态',
        operate: '操作',
        btnDetail: '详情',
        btnApprove: '审批',
        modified: '最后更新',
        approved: '通过',
        rejected: '拒绝',
        modeManual: '人工处理',
        modeContract: '智能合约',
        statusApproving: '等待审批',
        statusComplete: '已完成',
        noRecord: '尚无审批请求',
    }
}

export default function RequestTable({ records }: {
    records: VerifyRequest[]
}) {
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
                href: '/requests/detail/' + id,
                icon: 'bi-search',
                label: texts.btnDetail,
            }];
            let statusLabel: string, timeLabel: string, resultLabel: string;
            let modeLabel = VerifyMode.Manual === verify_mode ? texts.modeManual : texts.modeContract;
            if (RequestStatus.Approving === status) {
                statusLabel = texts.statusApproving;
                timeLabel = new Date(invoke_time).toLocaleString();                
                operates.push({
                    href: '/requests/approve/' + id,
                    icon: 'bi-person-fill',
                    label: texts.btnApprove,
                });
            } else {
                statusLabel = texts.statusComplete;
                timeLabel = new Date(verify_time).toLocaleString();
                resultLabel = result ? texts.approved : texts.rejected;
            }
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td className='text-center'>{customer}</td>
                    <td className='text-end'>{formatter.format(minimum_asset)}</td>
                    <td>{statusLabel}</td>
                    <td>{modeLabel}</td>
                    <td>{resultLabel}</td>
                    <td>{timeLabel}</td>
                    <td>
                        <div className='d-flex'>
                            {
                                operates.map(({ href, icon, label }, index) => (
                                    <Link href={href} key={index}>
                                        <button type="button" className="btn btn-outline-primary btn-sm m-1">
                                            <i className={'bi ' + icon}></i>
                                            {label}
                                        </button>
                                    </Link>
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
                    <th>{texts.mode}</th>
                    <th>{texts.result}</th>
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