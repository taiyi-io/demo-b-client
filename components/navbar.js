'use client';
import { useAppContext } from './context';

const i18n = {
    en: {
        title: 'Bank B',
        user: 'Current User: ',
    },
    cn: {
        title: 'B银行',
        user: '当前用户: ',
    }
}

export default function Navbar() {
    const { lang, user } = useAppContext();
    const texts = i18n[lang];
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{texts.title}</a>
                <div className='text-end text-light'>
                    {texts.user + user}
                </div>
            </div>
        </nav>

    )
}