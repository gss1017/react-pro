import React from 'react';
import PropTypes from 'prop-types';
import {Result, Button} from 'antd';
import {Link} from 'react-router-dom';
import check from 'common/utils/checkAuthority';

const result = (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={(
            <Button
                type="primary"
            >
                <Link to="/">Back Home</Link>
            </Button>
        )}
    />
);

Authorized.propTypes = {
    authority: PropTypes.array,
    noMath: PropTypes.element,
    children: PropTypes.element
};

Authorized.defaultProps = {
    authority: ['user', 'admin'],
    noMath: result,
    children: PropTypes.element
};

function Authorized(props) {
    // 鉴权逻辑
    const {authority, children, noMath} = props;
    const ele = check(authority, children, noMath);
    return (
        <>
            {ele}
        </>
    );
}

export default Authorized;
