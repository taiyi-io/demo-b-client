'use client';
import { useAppContext } from './context';

const i18n = {
    en: {
        requests: 'Verification Requests',
        assets: 'Customer Assets',
    },
    cn: {
        requests: '验资请求',
        assets: '客户资产',
    }
}

export default function SideTab({current}) {
    const { lang, user } = useAppContext();
    const texts = i18n[lang];
    const tabRequest = 'requests';
    const tabAssets = 'assets';
    return (
        <nav className="nav flex-column nav-pills text-center my-3">
            <a className={tabRequest === current? "nav-link active": "nav-link"} href="/requests/">{texts.requests}</a>
            <a className={tabAssets === current? "nav-link active": "nav-link"} href="/assets/">{texts.assets}</a>
        </nav>
    )
}