import React, { Component } from 'react';
import not_found from '../images/not-found.jpg';

class NotFound extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-md-8 col-md-offset-2">
                    <h1 className="text-center">Page Not Found</h1>
                    <img src={ not_found } alt="404 Not Found"/>
                </div>
            </div>
        );
    }
}

export default NotFound;
