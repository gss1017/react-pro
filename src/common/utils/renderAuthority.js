// @flow
import Authorized from 'common/components/Authorized/authorized';

type authorityT = Authorized;
type authorityStatus = string | [string] | () => string | [string];

let currentAuthorityStatus = '';

const renderAuthority = (authorityEle: authorityT) => (
    (authority: authorityStatus): authorityT => {
        if (typeof authority === 'function') {
            currentAuthorityStatus = authority();
        }

        if (
            typeof authority === 'string' || Array.isArray(authority)
        ) {
            currentAuthorityStatus = authority;
        }

        return authorityEle;
    }
);

export {currentAuthorityStatus};

export default renderAuthority;
