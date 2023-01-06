import { useAppContext, getCurrentyFormatter } from '../../components/context';

const i18n = {
    en: {
        customer: 'Customer',
        asset: 'Asset',
        cash: 'Cash flow in 6 month',
        register: 'Register Time',
        status: 'Account Status',
        statusNormal: 'Normal',
        statusAlert: 'Alert',
        statusSuspend: 'Suspend',
        statusBlock: 'Blocked',
    },
    cn: {
        customer: '客户',
        asset: '当前资产',
        cash: '半年内现金流',
        register: '注册时间',
        status: '账号状态',
        statusNormal: '正常',
        statusAlert: '告警',
        statusSuspend: '暂停',
        statusBlock: '关闭',
    }
}

const enumNormal = 0;
const enumAlert = 1;
const enumSuspend = 2;

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
                        status}) => {
                                                let statusLabel;
                        if (enumNormal === status) {
                            statusLabel = texts.statusNormal;
                        } else if (enumAlert === status){
                            statusLabel = texts.statusAlert;                            
                        }else if (enumSuspend === status){
                            statusLabel = texts.statusSuspend;                            
                        }else{
                            statusLabel = texts.statusBlock;                            
                        }
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