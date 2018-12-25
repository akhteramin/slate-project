import React from 'react';
import ReactDOM from 'react-dom';

import './styles/sass/stylesheets/styles.css';
import './styles/index.css';
import './styles/react-select.css';
import './styles/daterangepicker.css';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main/>, document.getElementById('root'));
registerServiceWorker();

/**
 * Hot Module Replacement (HMR)
 * */

module.hot && module.hot.accept();

