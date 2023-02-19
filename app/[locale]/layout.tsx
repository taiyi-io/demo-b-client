import { ContextData, ContextProvider, langChinese, langEnglish } from "../../components/context";
import npmPackage from '../../package.json';

const version = npmPackage.version;

enum Locale {
    cn = 'zh-cn',
    en = 'en-us',
};

export const dynamic = 'force-dynamic',
    revalidate = 0,
    fetchCache = 'force-no-store';

export default function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        locale: string;
    }
}) {
    const locale = params.locale;
    const demoUser = 'wuming.bank_b';
    let contextData: ContextData = {
        version: version,
        user: demoUser,
        lang: ''
    };
    if (Locale.en === locale) {
        contextData.lang = langEnglish;
    } else {
        contextData.lang = langChinese;
    }
    return (
        <ContextProvider value={contextData}>
            {children}
        </ContextProvider>
    )
}