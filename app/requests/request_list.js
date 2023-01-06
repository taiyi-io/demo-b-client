import { useAppContext } from '../../components/context';
import Link from 'next/link';

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
    }
}

const enumApproving = 1;

export default function RequestList({ records }) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    return (
        <table className="table table-hover">
            <thead>
                <tr className="table-primary">
                    <th>{texts.id}</th>
                    <th>{texts.customer}</th>
                    <th>{texts.asset}</th>
                    <th>{texts.bank}</th>
                    <th>{texts.status}</th>
                    <th>{texts.mode}</th>
                    <th>{texts.result}</th>
                    <th>{texts.modified}</th>
                    <th>{texts.operate}</th>
                </tr>
            </thead>
            <tbody>
                {
                    records.map(({ id, customer, bank, verify_mode, result,
                        minimum_asset, status, invoke_time, verify_time }) => {
                        var operates = [{
                            href: '/requests/detail/' + id,
                            icon: 'bi-search',
                            label: texts.btnDetail,
                        }];
                        let statusLabel, timeLabel, resultLabel, modeLabel;
                        if (enumApproving === status) {
                            statusLabel = texts.statusApproving;
                            timeLabel = invoke_time;
                            modeLabel = 'manual' === verify_mode ? texts.modeManual : texts.modeContract;
                            operates.push({
                                href: '/requests/approve/' + id,
                                icon: 'bi-person-fill',
                                label: texts.btnApprove,
                              });
                        } else {
                            statusLabel = texts.statusComplete;
                            timeLabel = verify_time;
                            resultLabel = result ? texts.approved : texts.rejected;
                            modeLabel = 'manual' === verify_mode ? texts.modeManual : texts.modeContract;
                        }
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{customer}</td>
                                <td>{minimum_asset}</td>
                                <td>{bank}</td>
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
                }
            </tbody>
        </table>
    )
}