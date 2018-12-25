import React from 'react';

const Modal = props => {
    return (
        <div className={ props.show ? 'modal fade in' : 'modal fade' }
             id={ props.id } tabIndex="-1"
             role="dialog"
             aria-labelledby="ModalLabel" style={ {display: props.show ? 'block' : 'none'} }>
            <div className="modal-dialog"
                 role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"
                                onClick={ () => props.action.close() }
                                aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="ModalLabel">{ props.title }</h4>
                    </div>
                    <div className="modal-body">
                        { props.children }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success"
                                disabled={ true /* TODO: Temporary Disable */ }
                                onClick={ () => props.action.confirm() }>Confirm
                        </button>
                        <button type="button" className="btn btn-link"
                                data-dismiss="modal"
                                onClick={ () => props.action.close() } style={ {color: '#333'} }>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;