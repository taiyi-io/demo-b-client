'use client';
import { useAppContext, getCurrentyFormatter } from '../../../../../../components/context';
import { RequestStatus, VerifyMode, VerifyRequest } from '../../../../../../components/verify_request';

const i18n = {
    en: {
        id: 'ID',
        customer: 'Customer',
        asset: 'Minimal Asset',
        mode: 'Verify Mode',
        result: 'Verify Result',
        status: 'Status',
        approved: 'Approved',
        rejected: 'Rejected',
        modeManual: 'Manual',
        modeContract: 'Smart Contract',
        statusIlde: 'Created',
        statusApproving: 'Wait Approving',
        statusComplete: 'Completed',
        createTime: 'Create Time',
        invokeTime: 'Invoke Time',
        completeTime: 'Complete Time',
        verifier: 'Verifier',
        invoker: 'Invoker',
        comment: 'Comment',
        propertyName: 'Property',
        propertyValue: 'Value',
    },
    cn: {
        id: '单据号',
        customer: '客户标识',
        asset: '资产要求',
        mode: '验证模式',
        result: '验证结果',
        status: '状态',
        approved: '通过',
        rejected: '拒绝',
        modeManual: '人工处理',
        modeContract: '智能合约',
        statusIlde: '新建',
        statusApproving: '等待审批',
        statusComplete: '已完成',
        createTime: '创建时间',
        invokeTime: '提交时间',
        completeTime: '完成时间',
        verifier: '审批者',
        invoker: '申请人',
        comment: '备注',
        propertyName: '属性名',
        propertyValue: '属性值',
    }
}

export default function RequestDetail({data}:{
    data: VerifyRequest
}) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    const formatter = getCurrentyFormatter();
    const { id, customer, verify_mode, result, invoker, verifier, comment,
        minimum_asset, status, create_time, invoke_time, verify_time } = data;
    let parameters = [
        {
            label: texts.id,
            value: id,
        },
        {
            label: texts.customer,
            value: customer,
        },
        {
            label: texts.asset,
            value: formatter.format(minimum_asset),
        },
        {
            label: texts.invoker,
            value: invoker,
        },
        {
            label: texts.createTime,
            value: new Date(create_time).toLocaleString(),
        },
        {
            label: texts.invokeTime,
            value: new Date(invoke_time as string).toLocaleString(),
        },
    ]
    let statusLabel: string, resultLabel: string;
    if (RequestStatus.Approving === status) {
        statusLabel = texts.statusApproving;
        parameters.push(
            {
                label: texts.status,
                value: statusLabel,
            }
        );
    } else {
        statusLabel = texts.statusComplete;
        resultLabel = result ? texts.approved : texts.rejected;
        parameters.push(
            {
                label: texts.status,
                value: statusLabel,
            },
            {
                label: texts.mode,
                value: VerifyMode.Manual === verify_mode ? texts.modeManual : texts.modeContract,
            },
            {
                label: texts.verifier,
                value: verifier,
            },
            {
                label: texts.result,
                value: resultLabel,
            },
            {
                label: texts.completeTime,
                value: new Date(verify_time as string).toLocaleString(),
            },
            {
                label: texts.comment,
                value: comment,
            },
        );
    }

    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr className='table-primary'>
                    <td>{texts.propertyName}</td>
                    <td>{texts.propertyValue}</td>
                </tr>
            </thead>
            <tbody>
                {
                    parameters.map(({ label, value }, index) => (
                        <tr key={index}>
                            <td>{label}</td>
                            <td>{value}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    )
}