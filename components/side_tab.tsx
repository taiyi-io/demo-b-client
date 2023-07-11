'use client';
import { useAppContext } from './context';
import { usePathname } from 'next/navigation';

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

export default function SideTab() {
    const currentPath = usePathname() as string;    
    const { lang } = useAppContext();
    const texts = i18n[lang];
    const tabRequest = 'requests';
    const tabAssets = 'assets';
    let segments = currentPath.split('/');
    if (!segments || segments.length <3){
        throw new Error("invalid tab path");
    }
    let locale = segments[1];
    let activated = segments[2];
    return (
        <nav className="nav flex-column nav-pills text-center my-3">
            <a className={tabRequest === activated? "nav-link active": "nav-link"} href={"/" + locale + "/requests/"}>{texts.requests}</a>
            <a className={tabAssets === activated? "nav-link active": "nav-link"} href={"/" + locale + "/assets/"}>{texts.assets}</a>
        </nav>
    )
}