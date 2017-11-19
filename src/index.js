import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import gameApp from './reducers';
import * as act from './actions';
require('bootstrap/dist/css/bootstrap.css');

//import registerServiceWorker from './registerServiceWorker';
let store = createStore(gameApp, {}, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

const KEYCODE_A = 65;
const KEYCODE_L = 76;

//store.dispatch(act.startGame(store.getState().options));
//console.log(store.getState());

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case KEYCODE_A:
            store.dispatch(act.pressPosition());
            break;
        case KEYCODE_L:
            store.dispatch(act.pressAudio());
            break;
        default:
            break;
    }
});
//registerServiceWorker();
