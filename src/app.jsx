import React from 'react';
import {setAuthority} from 'common/utils/authrity';
import Router from './router';
// import style from './index.scss';

// 格式化默认css
// import 'antd/dist/antd.less';

function App() {
    setAuthority('user');
    return (
        <Router/>
    );
}

export default App;
