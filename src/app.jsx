import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import BaseLayout from 'common/components/BaseLayout';
// import style from './index.scss';

// 格式化默认css
// import 'antd/dist/antd.less';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
    loader: () => import(/* webpackChunkName: 'Home' */'pages/home'),
    loading: Loading
});
const P404 = Loadable({
    loader: () => import(/* webpackChunkName: 'P404' */'./pages/404'),
    loading: Loading
});

function App() {
    return (
        <Router>
            <Switch>
                <Route
                    path="/"
                    exact={true}
                    component={(props) => {
                        return (
                            <BaseLayout>
                                <Home {...props}/>
                            </BaseLayout>
                        );
                    }}
                />
                {/* <Route path="/" exact={true} component={A}/> */}
                <Route
                    path="*"
                    component={(props) => {
                        return (
                            <BaseLayout>
                                <P404 {...props}/>
                            </BaseLayout>
                        );
                    }}
                />
            </Switch>
        </Router>
    );
}

export default App;
