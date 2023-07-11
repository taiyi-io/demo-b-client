'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import strings from '@supercharge/strings/dist';
import { useAppContext, getCurrentyFormatter } from '../../../../../../components/context';
import BackButton from '../../../../../../components/back_button';
import { statusToLabel, isAccountOK } from '../../../../../../components/account_util';
import { VerifyRequest } from '../../../../../../components/verify_request';
import { CustomerAsset } from '../../../../../../components/customer_asset';
import { approveRequest } from '../../../../../../components/api_utils';

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
        register: 'Account registered',
        registerDays: '{0} day(s)',
        status: 'Account Status',
        comment: 'Comment',
        btnApprove: 'Approve',
        btnReject: 'Reject',
        btnApproving: 'Approving...',
        btnRejecting: 'Rejecting...',
        formatSuccess: 'Request {0} successful processed',
        countDown: 'Count down {0} seconds',
        linkList: 'Return to list',
        alert: 'Alert',
        alertNotEnoughAsset: 'Not enough asset',
        alertAccountAbnormal: 'Account abnormal',
        alertCashFlowTooFew: 'Too few cash flow',
        alertNewAccount: 'Regiser in three months',
        emptyComment: 'Comment required',
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
        register: '账号注册时间',
        registerDays: '{0} 天',
        status: '账号状态',
        comment: '备注',
        btnApprove: '批准',
        btnReject: '拒绝',
        btnApproving: '批准中...',
        btnRejecting: '拒绝中...',
        formatSuccess: '请求"{0}"已成功处理',
        countDown: '倒计时{0}秒',
        linkList: '返回列表',
        alert: '告警',
        alertNotEnoughAsset: '账户资产不足',
        alertAccountAbnormal: '账户状态异常',
        alertCashFlowTooFew: '现金流太低',
        alertNewAccount: '开户不足三个月',
        emptyComment: '必须填写审批意见',
    }
}

enum formStatus {
    idle = 0,
    approving,
    rejecting,
    success,
}

export default function ApproveRequest({ request, customer }: {
    request: VerifyRequest,
    customer: CustomerAsset,
}) {
    const currentPath = usePathname();
    const { lang, user } = useAppContext();
    const texts = i18n[lang];
    const currentFormatter = getCurrentyFormatter();
    const listURL = currentPath + "/../..";
    const DEFAULT_COUNT_DOWN = 5;
    const router = useRouter();
    const [comment, setComment] = React.useState('');
    const [status, setStatus] = React.useState(formStatus.idle);
    const [error, setError] = React.useState('');
    const [countDown, setCountDown] = React.useState(DEFAULT_COUNT_DOWN);

    const { id, minimum_asset, invoker, invoke_time } = request;
    const { asset, cash_flow, register_time } = customer;
    const accountStatus = customer.status;

    const showError = React.useCallback((msg: string) => {
        setError(msg);
        setStatus(formStatus.idle);
    }, []);

    const handleCommentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = e.target.value;
        setComment(value);
    };

    const handleApprove = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!comment) {
            showError(texts.emptyComment);
            return;
        }
        setStatus(formStatus.approving);
        try {
            await approveRequest(id as string, user, true, comment);
            setCountDown(DEFAULT_COUNT_DOWN);
            setStatus(formStatus.success);
        } catch (e) {
            showError(e.message);
            return
        }
    };

    const handleReject = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!comment) {
            showError(texts.emptyComment);
            return;
        }
        setStatus(formStatus.rejecting);
        try {
            await approveRequest(id as string, user, false, comment);
            setCountDown(DEFAULT_COUNT_DOWN);
            setStatus(formStatus.success);
        } catch (e) {
            showError(e.message);
            return
        }
    };

    React.useEffect(() => {
        if (formStatus.success === status) {
            if (countDown > 0) {
                let next = countDown - 1;
                if (next > 0) {
                    setTimeout(() => {
                        setCountDown(next);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        router.push(listURL);
                    }, 1000);
                }
            }
        }
    }, [status, countDown]);

    //begin rendering
    if (formStatus.success === status) {
        let title: string = strings(texts.formatSuccess).replace('{0}', id as string).get();
        let countDownLabel = strings(texts.countDown).replace('{0}', countDown.toString()).get();
        return (
            <div className='text-center p-3 m-5'>
                <h5>
                    {title}
                </h5>
                <div className='my-4'>
                    {countDownLabel}
                </div>
                <Link href={listURL}>
                    {texts.linkList}
                </Link>
            </div>
        )
    } else {
        const MinimumCashFlow = minimum_asset / 10;
        let available = false;
        let alertLabel: string = '';
        const msInDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round((new Date().getTime() - new Date(register_time).getTime()) / msInDay);
        const threeMonths = 30 * 3;
        if (asset < minimum_asset) {
            alertLabel = texts.alertNotEnoughAsset;
        } else if (!isAccountOK(accountStatus)) {
            alertLabel = texts.alertAccountAbnormal;
        } else if (cash_flow as number < MinimumCashFlow) {
            alertLabel = texts.alertCashFlowTooFew;
        } else if (diffDays < threeMonths) {
            alertLabel = texts.alertNewAccount;
        } else {
            available = true;
        }
        interface parameterType {
            label: string,
            value: string,
        }
        let parameters: parameterType[] = [
            {
                label: texts.id,
                value: id as string,
            },
            {
                label: texts.customer,
                value: customer.customer as string,
            },
            {
                label: texts.invoker,
                value: invoker as string,
            },
            {
                label: texts.invokeTime,
                value: new Date(invoke_time as string).toLocaleString(),
            },
            {
                label: texts.register,
                value: strings(texts.registerDays).replace('{0}', diffDays.toString()).get(),
            },
            {
                label: texts.cash,
                value: currentFormatter.format(cash_flow as number),
            },
        ]
        let buttons: JSX.Element[];
        if (formStatus.idle === status) {
            buttons = [
                <BackButton href={currentPath + "/../.."} />,
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={handleReject}
                >
                    <i className='bi bi-x-circle'></i>
                    {texts.btnReject}
                </button>,
            ];
            let approveClass: string;
            if (!available) {
                approveClass = 'btn btn-outline-secondary btn-sm disabled';
            } else {
                approveClass = 'btn btn-primary btn-sm';
            }
            buttons.push(
                <button
                    type="button"
                    className={approveClass}
                    onClick={handleApprove}
                >
                    <i className='bi bi-check-circle'></i>
                    {texts.btnApprove}
                </button>);
        } else if (formStatus.approving === status) {
            buttons = [
                <BackButton href={currentPath + "/../.."} disabled />,
                <button
                    type="button"
                    className="btn btn-danger btn-sm disabled"
                >
                    <i className='bi bi-x-circle'></i>
                    {texts.btnReject}
                </button>,
                <button
                    type="button"
                    className="btn btn-primary btn-sm disabled"
                >
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {texts.btnApproving}
                </button>
            ];
        } else {
            //rejecting
            buttons = [
                <BackButton href={currentPath + "/../.."} disabled />,
                <button
                    type="button"
                    className="btn btn-danger btn-sm disabled"
                >
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {texts.btnRejecting}
                </button>,
                <button
                    type="button"
                    className="btn btn-primary btn-sm disabled"
                >
                    <i className='bi bi-check-circle'></i>
                    {texts.btnApprove}
                </button>
            ];
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
                            <td className={isAccountOK(accountStatus) ? 'text-success' : 'text-danger'}>{statusToLabel(accountStatus)}</td>
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
                        <div className="alert alert-danger" role="alert">
                            {alertLabel}
                        </div>
                    )
                }
                <form>
                    <div className='row'>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">{texts.comment}</label>
                            <textarea
                                className="form-control"
                                id="comment"
                                value={comment}
                                onChange={handleCommentChanged}
                                rows={3}
                            ></textarea>
                        </div>
                    </div>
                    <div className='row'>
                        {
                            error ? (
                                <div className="alert alert-warning d-flex align-items-center" role="alert">
                                    <i className='bi bi-exclamation-triangle-fill text-danger'></i>
                                    <div>
                                        {error}
                                    </div>
                                </div>
                            ) : <div />
                        }
                    </div>
                </form>
                <div className='row justify-content-center'>
                    <div className='col-6'>
                        <div className='d-flex'>
                            {
                                buttons.map((button, index) => (
                                    <div className='m-1' key={index}>
                                        {button}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}