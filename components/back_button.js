'use client';
import Link from 'next/link';
import {useAppContext} from './context';

const i18n = {
    en:{
        back: 'Back',
    },
    cn: {
        back: '返回',
    }
};

export default function BackButton({href}){
    const { lang } = useAppContext();
    const texts = i18n[lang];
    return (
    <Link href={href}>
        <button type="button" className="btn btn-outline-primary btn-sm">
            <i className='bi bi-chevron-left'></i>
            {texts.back}
        </button>
    </Link>
    )
}