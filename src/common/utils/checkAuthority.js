// @flow
import * as React from 'react';
import {currentAuthorityStatus} from './renderAuthority';

type authorityStatusT = string | [string];

/*
* @params authority [string]
* @params currentAuthority [string] | string
* @params children ele  页面组件
* @params expectation ele 没有权限需要加载的组件
* */
export function checkPermissions(
    authority: authorityStatusT,
    currentAuthority: authorityStatusT,
    children: React.Node,
    expectation: React.Node
) {
    if (!authority) {
        return expectation;
    }

    if (Array.isArray(authority)) {
        if (Array.isArray(currentAuthority)) {
            const isPermission = currentAuthority.some(str => authority.includes(str));
            if (isPermission) return children;
        } else if (typeof currentAuthority === 'string') {
            if (authority.includes(currentAuthority)) return children;
        }
        return expectation;
    }

    if (typeof authority === 'string') {
        if (Array.isArray(currentAuthority)) {
            if (currentAuthority.includes((authority))) return children;
        } else if (typeof currentAuthority === 'string') {
            if (authority === currentAuthority) return children;
        }
        return expectation;
    }

    throw new Error('unsupported parameters');
}

export default function check(authority: authorityStatusT, children: React.Node, expectation: React.Node) {
    return checkPermissions(authority, currentAuthorityStatus, children, expectation);
}
