import React from 'react';
import PageContainer from '../PageContainer';
import {getAuthorityFromRouter} from '../../utils/utils';
import s from './index.scss';

export default class NormalLayout extends React.Component {

    render() {
        const {route, location} = this.props;
        const routeItem = getAuthorityFromRouter(route.routes, location.pathname || '/');
        return (
            <PageContainer title={routeItem.title}>
                <div className={s.layoutContainer}>
                    {this.props.children}
                </div>
            </PageContainer>
        );
    }

}
