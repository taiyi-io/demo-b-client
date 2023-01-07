'use client';
import { useAppContext } from "./context";

const i18n = {
    en: {
        statusNormal: 'Normal',
        statusAlert: 'Alert',
        statusSuspend: 'Suspend',
        statusBlock: 'Blocked',
    },
    cn: {
        statusNormal: '正常',
        statusAlert: '告警',
        statusSuspend: '暂停',
        statusBlock: '关闭',
    }
}

const enumNormal = 0;
const enumAlert = 1;
const enumSuspend = 2;

export function statusToLabel(status){
    const { lang } = useAppContext();
    const texts = i18n[lang];
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
    return statusLabel;
}

export function isAccountOK(status){
    return (enumNormal === status);
}