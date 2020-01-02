import renderAuthority from 'common/utils/renderAuthority';
import {getAuthority} from 'common/utils/authrity';
import Authorized from './authorized';

let AuthorizedEle = Authorized;

const RenderAuthority = renderAuthority(Authorized);

// 挂载当前用户权限
AuthorizedEle = RenderAuthority(getAuthority());

const reloadAuthority = () => {
    AuthorizedEle = RenderAuthority(getAuthority());
};

export {reloadAuthority};

export default AuthorizedEle;
