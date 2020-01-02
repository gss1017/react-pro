import React from 'react';
import s from './index.scss';

export default class BaseLayout extends React.Component {

    render() {
        return (
            <div className={s.layoutContainer}>
                {this.props.children}
            </div>
        );
    }

}
