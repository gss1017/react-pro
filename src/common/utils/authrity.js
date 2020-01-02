// @flow
import {reloadAuthority} from '../components/Authorized';

const REACT_PRO_AUTHORITY = 'REACT_PRO_AUTHORITY';

export function getAuthority() {
    const authorityResult = localStorage && localStorage.getItem(REACT_PRO_AUTHORITY);
    let authority = '';
    try {
        if (authorityResult) {
            authority = JSON.parse(authorityResult);
        }
    } catch (e) {
        authority = authorityResult;
    }

    if (authority !== '' && typeof authority === 'string') {
        return [authority];
    }

    if (!authority) {
        return ['admin'];
    }

    return authority;
}

export function setAuthority(authority: string | [string]) {
    const authorityResult = typeof authority === 'string'
        ? [authority] : authority;
    localStorage.setItem(REACT_PRO_AUTHORITY, JSON.stringify(authorityResult));

    reloadAuthority();
}
