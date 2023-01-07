import { useAppContext, getCurrentyFormatter } from '../../components/context';
import { statusToLabel } from '../../components/account_util';

const i18n = {
    en: {
        customer: 'Customer',
        asset: 'Asset',
        cash: 'Cash flow in 6 month',
        register: 'Register Time',
        status: 'Account Status',
    },
    cn: {
        customer: '客户',
        asset: '当前资产',
        cash: '半年内现金流',
        register: '注册时间',
        status: '账号状态',
    }
}

export default function AssetList({ records }) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    var formatter = getCurrentyFormatter();
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
                {
                    records.map(({ customer, asset, cash, register,
                        status }) => {
                        const statusLabel = statusToLabel(status);
                        return (
                            <tr key={customer} className='text-center'>
                                <td>{customer}</td>
                                <td className='text-end'>{formatter.format(asset)}</td>
                                <td className='text-end'>{formatter.format(cash)}</td>
                                <td>{statusLabel}</td>
                                <td>{register}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    )
}