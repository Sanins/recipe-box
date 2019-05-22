import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import * as serviceWorker from './serviceWorker';

import App from './components/App/App';
import Firebase, { FirebaseContext } from './components/firebase/Defaults';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />,
    </FirebaseContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();