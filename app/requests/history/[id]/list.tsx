'use client';
import { LogRecords } from "../../../../components/chain_sdk";
import { useAppContext } from "../../../../components/context";

const i18n = {
    en: {
        latest: 'Latest Version: ',
        version: 'Version ',
        timestamp: 'Generated at ',
        invoker: 'Invoker: ',
        operate: 'Operate: ',
        block: 'Block: ',
        transaction: 'Transaction: ',
        status: 'Status: ',
        statusConfirmed: 'Confirmed',
        statusNotConfirmed: 'Not Confirmed',
    },
    cn: {
        latest: '最新版本: ',
        version: '版本 ',
        timestamp: '生成于',
        invoker: '触发者标识：',
        operate: '触发操作：',
        block: '所属区块：',
        transaction: '交易ID：',
        status: '交易状态：',
        statusConfirmed: '已确认',
        statusNotConfirmed: '未确认',
    }
};

export default function HistoryList({ history }: {
    history: LogRecords
}) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    const { latest_version, logs } = history;
    const length = logs.length;
    let cards: JSX.Element[] = [];
    for (let offset = length - 1; offset >= 0; offset--) {
        let log = logs[offset];
        const { version, timestamp, invoker, operate, block, transaction,
            confirmed } = log;
        cards.push((
            <div className="card" key={offset}>
                <div className="card-header">
                    {texts.timestamp + new Date(timestamp).toLocaleString()}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{texts.version + version.toString()}</h5>
                    <div className="card-text">
                        <div>{texts.invoker + invoker}</div>
                        <div>{texts.operate + operate}</div>
                        <div>
                            {texts.status}
                            <span className={confirmed? "text-primary": "text-warning"}>
                                {confirmed ? texts.statusConfirmed : texts.statusNotConfirmed}
                            </span>
                        </div>
                        <div>{texts.transaction + transaction}</div>
                    </div>
                </div>
                {
                    confirmed ? (
                        <div className="card-footer text-muted">
                            {texts.block + block}
                        </div>
                    ) : <div />
                }

            </div>
        ))
    }
    return (
        <div>
            <div className="row my-3">
                <h5>{texts.latest + latest_version}</h5>
            </div>
            <div className="row">
                <div className="hstack gap-3">
                    <div className="vr mx-3"></div>
                    <div className="col-8 vstack gap-3">
                        {cards}
                    </div>
                </div>

            </div>

        </div>
    )
}