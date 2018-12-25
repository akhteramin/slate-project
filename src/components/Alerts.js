import React from 'react';

const Alerts = props => {
    return (
        <div className={ `alert alert-dismissible alert-${props.type}` } role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            { /*<strong>{ props.type.toUpperCase() }</strong>*/ }
            { props.value }
        </div>
    );
};

export default Alerts;