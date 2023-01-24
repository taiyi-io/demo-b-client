'use client';
import { useAppContext, getCurrentyFormatter } from '../../components/context';
import { statusToLabel } from '../../components/account_util';
import { CustomerAsset } from '../../components/customer_asset';
import React from 'react';
import { keepAlive } from '../../components/api_utils';

const i18n = {
    en: {
        customer: 'Customer',
        asset: 'Asset',
        cash: 'Cash flow in 6 month',
        register: 'Register Time',
        status: 'Account Status',
        noRecord: 'No customer availalble',
    },
    cn: {
        customer: '客户',
        asset: '当前资产',
        cash: '半年内现金流',
        register: '注册时间',
        status: '账号状态',
        noRecord: '尚无客户信息',
    }
}

export default function AssetTable({ records }: {
    records: CustomerAsset[]
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
        content = records.map(({ customer, asset, cash_flow, register_time,
            status }) => {
            const statusLabel = statusToLabel(status);
            return (
                <tr key={customer} className='text-center'>
                    <td>{customer}</td>
                    <td className='text-end'>{formatter.format(asset)}</td>
                    <td className='text-end'>{formatter.format(cash_flow)}</td>
                    <td>{statusLabel}</td>
                    <td>{new Date(register_time).toLocaleString()}</td>
                </tr>
            );
        })
    } else {
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
                    <th>{texts.customer}</th>
                    <th>{texts.asset}</th>
                    <th>{texts.cash}</th>
                    <th>{texts.status}</th>
                    <th>{texts.register}</th>
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </table>
    )
}