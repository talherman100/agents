import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dataStore from './store/dataStore';
import App from './App';


ReactDOM.render(
    <Provider store={dataStore}>
        <App />
    </Provider>,
    document.getElementById('root'));
