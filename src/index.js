import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import StandardModal from './component/StandardModal';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<StandardModal/>, document.getElementById('toast-dialog'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
