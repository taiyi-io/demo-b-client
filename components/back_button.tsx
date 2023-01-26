'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAppContext } from './context';

const i18n = {
    en: {
        back: 'Back',
    },
    cn: {
        back: '返回',
    }
};

export default function BackButton({ href, disabled }: {
    href?: string,
    disabled?: boolean,
}) {
    const { lang } = useAppContext();
    const texts = i18n[lang];
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    if (disabled) {
        return (
            <button type="button" className="btn btn-sm btn-outline-secondary disabled">
                <i className="bi bi-chevron-left"></i>
                {texts.back}
            </button>
        )
    } else {
        return (
            <button 
                type="button" 
                className="btn btn-sm btn-outline-primary"
                onClick={goBack}
                >
                <i className="bi bi-chevron-left"></i>
                {texts.back}
            </button>
        )
    }
}