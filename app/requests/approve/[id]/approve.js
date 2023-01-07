'use client';
import { useAppContext, getCurrentyFormatter } from '../../../../components/context';
import BackButton from '../../../../components/back_button';
import { statusToLabel, isAccountOK } from '../../../../components/account_util';

const i18n = {
    en: {
        parameter: 'Parameter',
        value: 'Current Value',
        id: 'ID',
        customer: 'Customer',
        asset: 'Required / Current Asset',
        invoker: 'Invoker',
        invokeTime: 'Invoke Time',
        cash: 'Cash flow in 6 month',
        register: 'Customer Register Time',
        status: 'Account Status',
        comment: 'Comment',
        btnApprove: 'Approve',
        btnReject: 'Reject',
        alert: 'Alert',
        alertNotEnoughAsset: 'Not enough asset',
        alertAccountAbnormal: 'Account abnormal',
        alertCashFlowTooFew: 'Too few cash flow',
        alertNewAccount: 'Regiser in three months',
    },
    cn: {
        parameter: '参数',
        value: '当前值',
        id: '单据号',
        customer: '客户标识',
        asset: '最低要求 / 当前资产',
        invoker: '申请人',
        invokeTime: '申请时间',
        cash: '最近半年现金流',
        register: '客户注册时间',
        status: '账号状态',
        comment: '备注',
        btnApprove: '批准',
        btnReject: '拒绝',
        alert: '告警',
        alertNotEnoughAsset: '账户资产不足',
        alertAccountAbnormal: '账户状态异常',
        alertCashFlowTooFew: '现金流太低',
        alertNewAccount: '开户不足三个月',
    }
}

export default function ApproveRequest({ request, userAsset }) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    const currentFormatter = getCurrentyFormatter();
    const { id, customer, minimum_asset, invoker, invoke_time } = request;
    const { asset, cash, register, status } = userAsset;
    const MinimumCashFlow = minimum_asset / 10;
    let available = false;
    let alertLabel;
    const day = 1000 * 3600 * 24;
    const diffDays = parseInt((new Date() - new Date(register)) / day);
    const threeMonths = 30 * 3;
    if (asset < minimum_asset) {
        alertLabel = texts.alertNotEnoughAsset;
    } else if (!isAccountOK(status)) {
        alertLabel = texts.alertAccountAbnormal;
    } else if (cash < MinimumCashFlow) {
        alertLabel = texts.alertCashFlowTooFew;
    } else if (diffDays < threeMonths) {
        alertLabel = texts.alertNewAccount;
    } else {
        available = true;
    }
    var parameters = [
        {
            label: texts.id,
            value: id,
        },
        {
            label: texts.customer,
            value: customer,
        },
        {
            label: texts.invoker,
            value: invoker,
        },
        {
            label: texts.invokeTime,
            value: invoke_time,
        },
        {
            label: texts.register,
            value: register,
        },
        {
            label: texts.cash,
            value: currentFormatter.format(cash),
        },
    ]
    let approveClass;
    if (!available){
        approveClass = 'btn btn-outline-secondary btn-sm disabled';
    }else{
        approveClass = 'btn btn-primary btn-sm';
    }
    return (
        <div>
            <table className="table table-hover table-striped">
                <thead>
                    <tr className='table-primary'>
                        <td>{texts.parameter}</td>
                        <td>{texts.value}</td>
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
                    <tr>
                        <td>{texts.status}</td>
                        <td className={isAccountOK(status) ? 'text-success' : 'text-danger'}>{statusToLabel(status)}</td>
                    </tr>
                    <tr>
                        <td>{texts.asset}</td>
                        <td>
                            <span className={asset < minimum_asset ? 'text-danger' : 'text-success'}>{currentFormatter.format(minimum_asset)}</span>
                            <span className='text-primary'>{' / ' + currentFormatter.format(asset)}</span>
                        </td>
                    </tr>

                </tbody>
            </table>
            {
                available ? <></> : (
                    <div class="alert alert-danger" role="alert">
                        {alertLabel}
                    </div>
                )
            }
            <div className='row justify-content-center'>
                <div className='col-6'>
                    <div className='d-flex'>
                        <div className='m-1'>
                            <BackButton href='/requests/' />
                        </div>
                        <div className='m-1'>
                            <button type="button" className="btn btn-danger btn-sm">
                                <i className='bi bi-x-circle'></i>
                                {texts.btnReject}
                            </button>
                        </div>
                        <div className='m-1'>
                            <button type="button" className={approveClass}>
                                <i className='bi bi-check-circle'></i>
                                {texts.btnApprove}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}