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
        <div className='row mt-5 px-4'>
            <div className='col-9'>
                <h5>{texts.title}</h5>
            </div>
            <div className='col text-end'>
                {texts.user + user}
            </div>
            <hr/>
        </div>
    )
}