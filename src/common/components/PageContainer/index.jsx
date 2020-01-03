import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';

let oldTitle = '';

PageContainer.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
};
export default function PageContainer({title, children}) {
    // 当title因为重定向导致值为空时 沿用上一个title
    if (title) oldTitle = title;
    return (
        <>
            <Helmet>
                <title>{title || oldTitle}</title>
            </Helmet>
            {children}
        </>
    );
}
